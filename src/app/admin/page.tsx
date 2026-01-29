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
      const token = localStorage.getItem("token");

      if (adminId && token) {
        const result = await checkAdminLogin(adminId, token);
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
          <button onClick={()=>{setShowTermForm(true)}} className="p-2 bg-[#693382] border-2 border-[#693382] text-white rounded hover:bg-white hover:text-[#693382] duration-500">Ajouter un terme</button>
        </div>
        <div className=" grid grid-cols-4 gap-4 w-full">
          {terms.map(term => (
            <div key={term.id} className="bg-[#f0f0f0] p-4 rounded-lg mb-4 relative">
              <span className={`${term.posted ? "bg-green-500" : "bg-red-500"} text-white px-1 font-semibold text-xs rounded absolute top-2 left-2`}>{term.posted ? "Traité" : "Non traité"}</span>
              <p className="text-[#717171] mt-3 text-xl uppercase font-semibold">{term.term}</p>
              <p className="text-gray-400 mt-2">Jour : {term.jour}</p>
              <div className="flex justify-between relative">
                <div className="w-20 h-10 mt-4 bg-white border border-[#693382] overflow-hidden rounded-lg relative group duration-500">
                  <div className="w-full absolute top-0 right-0 bottom-0 left-0 group-hover:w-0 duration-500 bg-[#693382]"></div>
                  <Link href={`/admin/create/${term.id}`} className="duration-500 absolute top-0 right-0 bottom-0 left-0 p-2 group-hover:text-[#693382] text-white rounded flex items-center gap-2">{term.posted ? "Modifer" : "Traiter"}</Link>
                </div>
                <div className="w-32 h-10 mt-4 bg-white border border-[#693382] overflow-hidden rounded-lg relative group duration-500">
                  <div className="w-0 absolute top-0 right-0 bottom-0 left-0 group-hover:w-full duration-500 bg-[#693382]"></div>
                  <Link href={`/admin/${term.id}`} className="duration-500 absolute top-0 right-0 bottom-0 left-0 p-2 group-hover:text-white text-[#693382] rounded flex items-center gap-2">Voir plus <ArrowRight /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showTermForm && (
      <div className="absolute top-0 bottom-0 right-0 left-0 backdrop-blur-2xl flex items-center justify-center">
        <form onSubmit={handleSubmit} className="relative rounded-xl shadow lg:w-1/3 h-1/2.5 sm:w-full flex flex-col gap-6 bg-white p-6">
        <button type="button" onClick={closeForm} className="absolute -top-5 shadow -right-5 group p-3 rounded-full bg-white"><X className="h-10 w-10 group-hover:text-[#693382] text-black" /></button>
        <legend className="text-xl text-center font-semibold text-[#693382] font-blanka">Ajouter un nouveau terme</legend>
          <div className="flex flex-col gap-4 w-full">
            <label htmlFor="term" className="text-gray-400">Terme</label>
            <input className="text-black w-full p-2 rounded focus-visible:border-2 focus:border-2" type="text" id="term" value={term} onChange={(e) => setTerm(e.target.value)} />
          </div>
          <div className="flex w-full">
            <input className=" w-10 rounded focus-visible:border-2 focus:border-2" type="checkbox" id="treated" checked={treated} onChange={(e) => setTreated(e.target.checked)} />
            <label htmlFor="treated" className="text-gray-400">Ce terme a déjà été traité</label>
          </div>
          <button type="submit" className="bg-[#693382] text-white duration-500 hover:text-[#693382] p-2 rounded hover:bg-white border-2 border-[#693382] cursor-pointer">Ajouter le terme</button>
        </form>
      </div>
      )}
    </div>
  );
}
