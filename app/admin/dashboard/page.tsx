"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Header from "@/components/Header";
import AdminPanel from "@/components/AdminPanel";
import Footer from "@/components/Footer";
import { Article } from "@/lib/types";

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin");
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

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
      <Header></Header>
      <AdminPanel articles={articles}></AdminPanel>
      <Footer></Footer>
    </>
  );
}
