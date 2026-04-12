"use client";

import AddArticle from "@/components/AddArticle";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRequireAuth } from "@/lib/useRequireAuth";

export default function AdminDashboardAdd() {
  const { user, loading } = useRequireAuth();
  if (loading) return null;
  if (!user) return null;
  return (
    <>
      <Header></Header>
      <AddArticle></AddArticle>
      <Footer></Footer>
    </>
  );
}
