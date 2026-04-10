import { supabase } from "@/lib/supabaseClient";
import { Article } from "@/lib/types";
import ArticlePage from "@/components/ArticlePage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: article } = await supabase
    .from("articles")
    .select("*, images(*), paragraphs(*)")
    .order("order", { referencedTable: "images", ascending: true })
    .order("order", { referencedTable: "paragraphs", ascending: true })
    .eq("article_id", id)
    .single();

  return (
    <>
      <Header></Header>
      <ArticlePage article={article} />
      <Footer></Footer>
    </>
  );
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  const { data } = await supabase.from("articles").select("article_id");
  return data?.map((a) => ({ id: String(a.article_id) })) ?? [];
}
