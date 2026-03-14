import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainPage from "@/components/MainPage";
import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  const { data: articles } = await supabase
    .from("articles")
    .select("*, images(*), paragraphs(*)")
    .order("date", { ascending: false });

  return (
    <>
      <Header></Header>
      <MainPage articles={articles ?? []}></MainPage>
      <Footer></Footer>
    </>
  );
}
