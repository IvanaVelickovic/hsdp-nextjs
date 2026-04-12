import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";


export const useRequireAuth = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const {data: {user}} = await supabase.auth.getUser();
            if(!user){
                router.push("/admin");
            } else {
                setUser(user);
            }
            setLoading(false);
        }
        checkAuth();
    }, []);

    return { user, loading };
}