import AddArticle from "@/components/AddArticle";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function AdminDashboardEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Header></Header>
      <AddArticle articleId={Number(id)}></AddArticle>
      <Footer></Footer>
    </>
  );
}
