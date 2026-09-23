import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainPage from "@/components/MainPage";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 60;

const PAGE_SIZE = 6;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: articles, count } = await supabase
    .from("articles")
    .select("*, images(*), paragraphs(*)", { count: "exact" })
    .eq("is_deleted", false)
    .eq("is_published", true)
    .order("date", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <>
      <Header></Header>
      <MainPage
        articles={articles ?? []}
        currentPage={currentPage}
        totalPages={totalPages}
      ></MainPage>
      <Footer></Footer>
    </>
  );
}
