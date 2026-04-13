"use client";

import AdminLogin from "@/components/AdminLogin";
import { useRequireAuth } from "@/lib/useRequireAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Admin() {
  const router = useRouter();
  const { user, loading } = useRequireAuth();

  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard");
    }
  }, [user]);

  if (loading) return null;
  if (user) return null;

  return (
    <div className="h-full">
      <AdminLogin></AdminLogin>
    </div>
  );
}
