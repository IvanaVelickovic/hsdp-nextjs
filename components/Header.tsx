"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  admin?: boolean;
}

const Header = ({ admin = false }: HeaderProps) => {
  const navStyle = "hover:cursor-pointer hover:text-white";
  const selectedStyle = " border-b-1 border-gray-200";

  const pathname = usePathname();

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setAdminLoggedIn(!!data.user);
    };
    checkAuth();
  });

  const handleLogOut = () => {
    localStorage.clear();
    router.refresh();
    router.push("/");
  };

  return (
    <>
      {/* Desktop header */}
      <header className="hidden lg:flex items-center justify-between bg-dark-green py-4.5">
        <div className="flex items-center gap-3 ml-20">
          <div className="flex gap-2">
            <img src="/icons/croatia_flag.png" className="h-7"></img>
            <img src="/icons/slovenian_flag.png" className="h-7"></img>
          </div>
          <Link href="/">
            <h1 className="font-regular text-[1.2rem] text-gray-200 hover:cursor-pointer">
              Hrvatsko-slovensko društvo prijateljstva
            </h1>
          </Link>
        </div>
        <ul className="flex items-center gap-9 text-[1rem] text-gray-200 mr-30">
          <Link href="/">
            <li className={navStyle + (pathname == "/" ? selectedStyle : "")}>
              Početna
            </li>
          </Link>
          <Link href="/about">
            <li
              className={navStyle + (pathname == "/about" ? selectedStyle : "")}
            >
              O nama
            </li>
          </Link>
          {admin && adminLoggedIn && (
            <button onClick={handleLogOut}>
              <li className="bg-white text-dark-green px-5 py-1 rounded-md font-semibold cursor-pointer">
                Odjavi se
              </li>
            </button>
          )}
        </ul>
      </header>

      {/* Mobile header */}
      <header className="flex lg:hidden items-center justify-between bg-dark-green py-4.5">
        <div className="flex items-center gap-3 ml-4">
          <div className="flex gap-2">
            <img src="/icons/croatia_flag.png" className="h-7"></img>
            <img src="/icons/slovenian_flag.png" className="h-7"></img>
          </div>
        </div>
        <ul className="flex items-center gap-9 text-[1rem] text-gray-200 mr-3">
          <Link href="/">
            <li className={navStyle + (pathname == "/" ? selectedStyle : "")}>
              Početna
            </li>
          </Link>
          <Link href="/about">
            <li
              className={navStyle + (pathname == "/about" ? selectedStyle : "")}
            >
              O nama
            </li>
          </Link>
        </ul>
      </header>
    </>
  );
};

export default Header;
