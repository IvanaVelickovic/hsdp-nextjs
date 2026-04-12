"use client";

import { Article } from "@/lib/types";
import formatDate from "@/lib/formatDate";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface AdminPanelProps {
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}

const AdminPanel = ({ articles, setArticles }: AdminPanelProps) => {
  const router = useRouter();

  const handleEdit = (articleId: number) => {
    router.push(`/admin/dashboard/edit/${articleId}`);
  };

  const handleDelete = async (articleId: number) => {
    const confirmed = confirm("Jeste li sigurni da želite obrisati članak?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("articles")
      .update({ is_deleted: true })
      .eq("article_id", articleId);

    if (error) {
      throw new Error(error.message);
    } else {
      setArticles((prev) => prev.filter((a) => a.article_id !== articleId));
      window.alert("Uspješno obrisano!");
    }
  };

  return (
    <div className="flex flex-col gap-y-3 px-7 pb-8 bg-background">
      <div className="flex justify-between items-center pt-6 pb-3">
        <h1 className="text-header text-[1.9rem] font-semibold ml-2">
          Admin panel
        </h1>
        <button
          className="bg-dark-green text-white text-lg py-2 px-6 rounded-lg cursor-pointer"
          onClick={() => router.push("/admin/dashboard/add")}
        >
          + Novi članak
        </button>
      </div>
      <h3 className="text-header text-lg px-3">Postojeći članci</h3>
      {articles.map((article) => (
        <div
          className="flex justify-between items-center bg-white py-4 px-5 shadow-md rounded-xl"
          key={article?.article_id}
        >
          <div className="w-[90%]">
            <h4 className="text-header text-[1.1rem] font-semibold pb-1">
              {article?.title}
            </h4>
            <p className="text-paragraph text-[0.9rem] pb-2 text-justify">
              {article?.description_paragraph}
            </p>
            <p className="text-header text-[0.95rem]">
              {article?.author} · {formatDate(article?.date)}
            </p>
          </div>
          <div className="flex w-[10%] justify-end py-3 gap-x-1.5">
            <button onClick={() => handleEdit(article?.article_id)}>
              <img
                src="/icons/icon_edit.png"
                className="h-11 cursor-pointer"
              ></img>
            </button>
            <button onClick={() => handleDelete(article?.article_id)}>
              <img
                src="/icons/icon_delete.png"
                className="h-9 cursor-pointer"
              ></img>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
