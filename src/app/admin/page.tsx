"use client";
import { ArrowRight, Lock, ClosedCaption, X } from "lucide-react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import axios from "axios";
import { db } from "../../lib/firebase";
import { useEffect, useState } from "react";
import { loginAdmin } from "@/services/login";
import { checkAdminLogin } from "@/services/logchecker";
import { useRouter } from 'next/navigation';
import { getTerms } from "@/services/getTerms";
import { Terme } from "@/types/terme";
import Link from "next/link";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [term, setTerm] = useState("");
  const [treated, setTreated] = useState(false);
  const [terms, setTerms] = useState<Terme[]>([]);
  const [showTermForm, setShowTermForm] = useState(false);
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
      } else {
        router.push('/login');
      }
    };

    checkLogin();
    fetchTerms();
  }, []);

  const fetchTerms = () => {
    getTerms()
      .then(setTerms)
      .catch(console.error);
  };
  const closeForm = () => {
    setShowTermForm(false);
    fetchTerms();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "terms"), {
        term,
        posted: treated,
        jour: terms.length + 1,
        createdAt: Timestamp.now()
      });
      console.log("Document written with ID: ", docRef.id);
      setTerm("");
      setTreated(false);
      fetchTerms();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="font-poppins min-h-screen  px-4 sm:px-6 lg:px-8 ">
      <div className="relative sm:w-full lg:w-full flex flex-col gap-6">
        <div className="w-full flex justify-between items-center my-4">
          <h1 className="text-[#f0f0f0] text-2xl font-bold font-blanka">Termes  </h1>
          <button onClick={() => { setShowTermForm(true) }} className="p-2 bg-[#0788ff] border-2 border-[#0788ff] text-white rounded hover:bg-white hover:text-[#0788ff] duration-500">Ajouter un terme</button>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 w-full">
          {terms.map(term => (
            <div
              key={term.id}
              className="bg-white/10 p-4 rounded-xl mb-4 relative shadow-lg border border-[#0788ff]/20 hover:shadow-2xl transition-all duration-300"
            >
              {/* Badge Traité / Non traité */}
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full ${term.posted ? "bg-green-500" : "bg-red-500"
                  } text-white`}
              >
                {term.posted ? "Traité" : "Non traité"}
              </span>

              {/* Term */}
              <p className="text-white mt-6 text-xl uppercase font-bold">{term.term}</p>
              <p className="text-gray-400 mt-1 text-sm">Jour : {term.jour}</p>

              {/* Boutons */}
              <div className="flex justify-between mt-4 gap-3">
                {/* Bouton Traiter / Modifier */}
                <div className="flex-1 h-12  bg-[#050d17] border border-[#0788ff] rounded-lg overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 w-0 h-full bg-[#0788ff] group-hover:w-full transition-all duration-500 ease-in-out"></div>
                  <Link
                    href={`/admin/create/${term.id}`}
                    className="relative z-10 w-full h-full flex items-center justify-center gap-2 text-white group-hover:text-black font-semibold transition-colors duration-500"
                  >
                    {term.posted ? "Modifier" : "Traiter"}
                  </Link>
                </div>

                {/* Bouton Voir plus */}
                <div className="flex-1 h-12  bg-[#050d17] border border-[#0788ff] rounded-lg overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="absolute top-0 left-0 w-0 h-full bg-[#0788ff] group-hover:w-full transition-all duration-500 ease-in-out"></div>
                  <Link
                    href={`/admin/${term.id}`}
                    className="relative z-10 w-full h-full flex items-center justify-center gap-2 text-white group-hover:text-black font-semibold transition-colors duration-500"
                  >
                    Voir plus <ArrowRight />
                  </Link>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
      {showTermForm && (
        <div className="fixed top-0 bottom-0 right-0 left-0 backdrop-blur-2xl flex items-center justify-center z-20">
          <form onSubmit={handleSubmit} className="relative rounded-xl shadow lg:w-1/3 h-1/2.5 sm:w-full flex flex-col gap-6 bg-white p-6 ">
            <button type="button" onClick={closeForm} className="absolute -top-5 shadow -right-5 group p-3 rounded-full bg-white"><X className="h-10 w-10 group-hover:text-[#0788ff] text-black" /></button>
            <legend className="text-xl text-center font-semibold text-[#0788ff] font-blanka">Ajouter un nouveau terme</legend>
            <div className="flex flex-col gap-4 w-full">
              <label htmlFor="term" className="text-gray-400">Terme</label>
              <input className="text-black w-full p-2 rounded focus-visible:border-2 focus:border-2" type="text" id="term" value={term} onChange={(e) => setTerm(e.target.value)} />
            </div>
            <div className="flex w-full">
              <input className=" w-10 rounded focus-visible:border-2 focus:border-2" type="checkbox" id="treated" checked={treated} onChange={(e) => setTreated(e.target.checked)} />
              <label htmlFor="treated" className="text-gray-400">Ce terme a déjà été traité</label>
            </div>
            <button type="submit" className="bg-[#0788ff] text-white duration-500 hover:text-[#0788ff] p-2 rounded hover:bg-white border-2 border-[#0788ff] cursor-pointer">Ajouter le terme</button>
          </form>
        </div>
      )}
    </div>
  );
}
