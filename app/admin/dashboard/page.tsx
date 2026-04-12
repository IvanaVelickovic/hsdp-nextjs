"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Header from "@/components/Header";
import AdminPanel from "@/components/AdminPanel";
import Footer from "@/components/Footer";
import { Article } from "@/lib/types";
import { useRequireAuth } from "@/lib/useRequireAuth";

export default function AdminDashboard() {
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);

  const { user, loading } = useRequireAuth();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("articles")
        .select("*, images(*), paragraphs(*)")
        .eq("is_deleted", false)
        .order("date", { ascending: false });

      setArticles(data ?? []);
    };
    fetchData();
  }, [user]);

  if (loading) return null;
  if (!user) return null;

  return (
    <>
      <Header admin></Header>
      <AdminPanel articles={articles} setArticles={setArticles}></AdminPanel>
      <Footer></Footer>
    </>
  );
}
