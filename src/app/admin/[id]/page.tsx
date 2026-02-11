"use client";
import { useEffect, useState } from "react";
import { checkAdminLogin } from "@/services/logchecker";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [accroche, setAccroche] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const adminId = localStorage.getItem("id");
      const password = localStorage.getItem("password");

      if (adminId && password) {
        const result = await checkAdminLogin(adminId, password);
        if (result.status === "not_connected") {
          router.push('/login');
        }
      }else{
        router.push('/login');
      }
    };

    checkLogin();
  }, []);





  return (
    <div className="font-poppins min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8  bg-linear-to-r from-[#07233b] to-[#050d17]">
        <form action="" className="sm:w-full lg:w-1/2 flex flex-col gap-6">
        <legend>Terme : </legend>
            <div className="flex flex-col gap-4 w-full">
                <label htmlFor="accroche" className="text-gray-400">Phrase d'accroche</label>
                <input className=" w-full p-2 rounded focus-visible:border-2 focus:border-2" type="text" id="accroche" value={accroche} onChange={(e) => setAccroche(e.target.value)} />
            </div>
            <div className="flex flex-col gap-4 w-full">
                <label htmlFor="accroche" className="text-gray-400">Définition</label>
                <input className=" w-full p-2 rounded focus-visible:border-2 focus:border-2" type="text" id="accroche" value={accroche} onChange={(e) => setAccroche(e.target.value)} />
            </div>
            <div className="flex flex-col gap-4 w-full">
                <label htmlFor="accroche" className="text-gray-400">Exemple concret</label>
                <input className=" w-full p-2 rounded focus-visible:border-2 focus:border-2" type="text" id="accroche" value={accroche} onChange={(e) => setAccroche(e.target.value)} />
            </div>
            <div className="flex flex-col gap-4 w-full">
                <label htmlFor="accroche" className="text-gray-400">A retenir</label>
                <input className=" w-full p-2 rounded focus-visible:border-2 focus:border-2" type="text" id="accroche" value={accroche} onChange={(e) => setAccroche(e.target.value)} />
            </div>

            <button type="submit" className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700 cursor-pointer">Voir un aperçu</button>
        </form>
    </div>
  );
}
