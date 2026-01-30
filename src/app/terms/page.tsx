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

export default function Terms() {
  const [term, setTerm] = useState("");
  const [treated, setTreated] = useState(false);
  const [terms, setTerms] = useState<Terme[]>([]);
  const [showTermForm, setShowTermForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
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
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4 w-full">
          {terms.map(term => (
            <div
              key={term.id}
              className="bg-[#1f1f1f] p-4 rounded-xl mb-4 relative shadow-lg border border-[#693382]/20 hover:shadow-2xl transition-all duration-300"
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

              {term.posted && (

                <div className="flex justify-end mt-4 gap-3">
                  {/* Bouton Voir plus */}
                  <div className="flex-1 h-12 bg-[#141414] border border-[#693382] rounded-lg overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="absolute top-0 left-0 w-0 h-full bg-[#693382] group-hover:w-full transition-all duration-500 ease-in-out"></div>
                    <Link
                      href={`/admin/${term.id}`}
                      className="relative z-10 w-full h-full flex items-center justify-center gap-2 text-white group-hover:text-black font-semibold transition-colors duration-500"
                    >
                      Voir plus <ArrowRight />
                    </Link>
                  </div>
                </div>
              )}
            </div>

          ))}
        </div>
      </div>
    </div>
  );
}
