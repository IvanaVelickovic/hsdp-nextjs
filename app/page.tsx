import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainPage from "@/components/MainPage";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60;

export default async function Home() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*, images(*), paragraphs(*)")
    .eq("is_deleted", false)
    .order("date", { ascending: false });

  return (
    <>
      <Header></Header>
      <MainPage articles={articles ?? []}></MainPage>
      <Footer></Footer>
    </>
  );
}
