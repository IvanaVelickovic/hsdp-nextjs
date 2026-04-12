"use client";

import { use } from "react";
import AddArticle from "@/components/AddArticle";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRequireAuth } from "@/lib/useRequireAuth";

export default function AdminDashboardEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user, loading } = useRequireAuth();
  if (loading) return null;
  if (!user) return null;

  const { id } = use(params);
  return (
    <>
      <Header></Header>
      <AddArticle articleId={Number(id)}></AddArticle>
      <Footer></Footer>
    </>
  );
}
