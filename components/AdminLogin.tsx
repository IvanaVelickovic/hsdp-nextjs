"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminLogin = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert("Pogrešan email ili lozinka");
      return;
    }

    setLoading(false);
    router.push("/admin/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-background">
      <div className="flex flex-col items-center px-11 bg-white py-12 rounded-2xl shadow-lg">
        <h1 className="text-header text-3xl font-semibold pb-6">
          HSDP - Admin login
        </h1>
        <form method="POST" onSubmit={handleLogin} className="w-70 text-header">
          <div className="flex flex-col gap-1.5 pb-4">
            <label htmlFor="email" className="text-lg text-paragraph">
              Email adresa
            </label>
            <input
              type="email"
              name="email"
              className="border rounded-sm text-[1rem] py-1 px-1.5"
            ></input>
          </div>
          <div className="flex flex-col gap-1.5 pb-4">
            <label htmlFor="password" className="text-lg text-paragraph">
              Lozinka
            </label>
            <input
              type="password"
              name="password"
              className="border rounded-sm text-[1rem] py-1 px-1.5"
            ></input>
          </div>
          <button
            className="bg-dark-green w-full text-white text-lg py-1.5 rounded-xl mt-3 cursor-pointer"
            type="submit"
          >
            {loading ? "Učitavanje" : "Prijavi se"}
          </button>
          {loading && (
            <p className="mt-3 gap-y-0 text-red-800">
              Učitavanje može potrajati i nekoliko minuta. Molimo vas
              pričekajte.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
