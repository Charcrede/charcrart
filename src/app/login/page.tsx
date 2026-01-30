"use client";
import { Lock } from "lucide-react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import axios from "axios";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { loginAdmin } from "@/services/login";
import { checkAdminLogin } from "@/services/logchecker";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const adminId = localStorage.getItem("id");
      const password = localStorage.getItem("password");

      if (adminId && password) {
        const result = await checkAdminLogin(adminId, password);
        if (result.status === "connected") {
          router.push('/admin');
        }
      }
    };

    checkLogin();
  }, []);





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await loginAdmin(number, password);
      localStorage.setItem("id", response.adminId);
      localStorage.setItem("password", response.password);
      localStorage.setItem("expiresAt", response.expiresAt.toString());
      // Rediriger ou effectuer d'autres actions après une connexion réussie
      router.push('/admin');
    } catch (err: any) {
      console.error("Erreur de connexion :", err.response?.data || err.message);
      setError(err.response?.data?.message || "Erreur de connexion");
    }
  };
  return (
    <div className="font-poppins min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#141414]">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Lock className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-serif font-light font-blanka">Admin</h1>
          <p className="text-muted-foreground font-light font-poppins">
            Espace protégé pour gérer les cartes de publication.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Numéro de téléphone
            </label>
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className=" w-full px-4 py-2 rounded border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Entrez le numéro de téléphone"
            />
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Entrez le mot de passe"
            />
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className=" font-medium text-xl w-full px-4 py-2 z-10 text-black bg-white hover:text-white border-2 border-white hover:bg-[#141414] cursor-pointer rounded group-hover:text-white transition-colors duration-500"
          >
            Se connecter
          </button>

        </form>

        <p className="text-xs text-muted-foreground text-center">
          Si vous ne connaissez pas le mot de passe, c'est que cet espace ne vous ai pas dédié
        </p>
      </div>
    </div>
  );
}
