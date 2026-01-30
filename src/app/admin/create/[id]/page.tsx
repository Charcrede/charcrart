"use client";
import { useEffect, useState, useRef, RefObject } from "react";
import { checkAdminLogin } from "@/services/logchecker";
import { useParams, useRouter } from 'next/navigation';
import { getTermById } from "@/services/getTerm";
import { Terme } from "@/types/terme";
import * as htmlToImage from "html-to-image";
import JSZip from "jszip";
import { createTraitement } from "@/services/createTreatment";
import { TextCard } from "@/components/card";
import { CardConfig } from "@/types/cardConfig";

export default function CreateCard() {
  const [terme, setTerme] = useState<Terme | null>(null);
  const [accroche, setAccroche] = useState("");
  const [accSize, setAccSize] = useState(42);
  const [defSize, setDefSize] = useState(42);
  const [exSize, setExSize] = useState(42);
  const [retSize, setRetSize] = useState(42);
  const [def, setDef] = useState("");
  const [exemple, setExemple] = useState("");
  const [aRetenir, setARetenir] = useState("");
  const [activePage, setActivePage] = useState<1 | 2 | 3 | 4>(1);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);
  const page4Ref = useRef<HTMLDivElement>(null);
  const pages = [
    { ref: page1Ref, name: "page-1.png" },
    { ref: page2Ref, name: "page-2.png" },
    { ref: page3Ref, name: "page-3.png" },
    { ref: page4Ref, name: "page-4.png" },
  ];

  const config = {
    background: "image",
    backgroundValue: "/bg.png",
    titleColor: "#ffffff",
    bodyColor: "#ffffff",
    showDay: false,
    titleSize: 45,
    bodySize: 30,
    align: "center"
  } as CardConfig;

  const router = useRouter();
  const params = useParams();
  const termId = params.id as string; // Récupérer l'ID du terme depuis les paramètres de l'URL ou une autre source

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

    fetchTerm();
  }, []);




  const fetchTerm = () => {
    getTermById(termId)
      .then(setTerme)
      .catch(console.error);
  };

  const downloadImage = async (
    ref: RefObject<HTMLDivElement | null>,
    filename = "design.png"
  ) => {
    if (!ref.current) return;

    const dataUrl = await htmlToImage.toPng(ref.current, {
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  };




  const handleDownloadZip = async () => {
    const zip = new JSZip();

    for (let i = 0; i < pages.length; i++) {
      const element = pages[i].ref.current;

      if (!element) continue; // si null → on skip

      const dataUrl = await htmlToImage.toPng(element);
      const base64 = dataUrl.split(",")[1];

      zip.file(`page-${i + 1}.png`, base64, { base64: true });
    }

    const blob = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "design " + terme?.term + ".zip";
    link.click();

    const result = await createTraitement({
      term: terme?.id || "",
      accroche,
      definition: def,
      exemple,
      aRetenir,
    });

    if (result.success) {
      alert(`Traitement créé avec ID: ${result.id}`);
      // reset si besoin
    } else {
      alert("Erreur création traitement");
    }
  };




  return (
    <div className="bg-[#141414]">
      <div className="font-poppins min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <form
          action=""
          className="sm:w-full lg:w-1/2 flex flex-col gap-6 bg-[#1f1f1f]/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-[#693382]/30 text-white"
        >
          <legend className="text-2xl sm:text-3xl font-blanka text-center text-[#e0c7ff] tracking-wide">
            Terme : {terme?.term}
          </legend>

          {/** Champ Texte */}
          <div className="flex flex-col gap-1 w-full relative group">
            <label
              htmlFor="accroche"
              className="text-[#a278d1] text-lg sm:text-xl font-semibold transition-all duration-300 group-focus-within:text-[#e0c7ff]"
            >
              Phrase d'accroche
            </label>
            <textarea
              id="accroche"
              value={accroche}
              onChange={(e) => setAccroche(e.target.value)}
              placeholder="Entrez votre phrase d'accroche..."
              className="border-2 border-[#555] focus:border-[#693382] focus:ring-1 focus:ring-[#693382] outline-none w-full p-3 rounded-xl bg-[#252525] text-white shadow-sm transition-all duration-300 resize-none min-h-17.5"
            />
          </div>

          <div className="flex flex-col gap-1 w-full relative group">
            <label
              htmlFor="def"
              className="text-[#a278d1] text-lg sm:text-xl font-semibold transition-all duration-300 group-focus-within:text-[#e0c7ff]"
            >
              Définition
            </label>
            <textarea
              id="def"
              value={def}
              onChange={(e) => setDef(e.target.value)}
              placeholder="Définition simple du terme..."
              className="border-2 border-[#555] focus:border-[#693382] focus:ring-1 focus:ring-[#693382] outline-none w-full p-3 rounded-xl bg-[#252525] text-white shadow-sm transition-all duration-300 resize-none min-h-20"
            />
          </div>

          <div className="flex flex-col gap-1 w-full relative group">
            <label
              htmlFor="exemple"
              className="text-[#a278d1] text-lg sm:text-xl font-semibold transition-all duration-300 group-focus-within:text-[#e0c7ff]"
            >
              Exemple concret
            </label>
            <textarea
              id="exemple"
              value={exemple}
              onChange={(e) => setExemple(e.target.value)}
              placeholder="Exemple concret d'utilisation..."
              className="border-2 border-[#555] focus:border-[#693382] focus:ring-1 focus:ring-[#693382] outline-none w-full p-3 rounded-xl bg-[#252525] text-white shadow-sm transition-all duration-300 resize-none min-h-20"
            />
          </div>

          <div className="flex flex-col gap-1 w-full relative group">
            <label
              htmlFor="aRetenir"
              className="text-[#a278d1] text-lg sm:text-xl font-semibold transition-all duration-300 group-focus-within:text-[#e0c7ff]"
            >
              À retenir
            </label>
            <textarea
              id="aRetenir"
              value={aRetenir}
              onChange={(e) => setARetenir(e.target.value)}
              placeholder="Points essentiels à retenir..."
              className="border-2 border-[#555] focus:border-[#693382] focus:ring-1 focus:ring-[#693382] outline-none w-full p-3 rounded-xl bg-[#252525] text-white shadow-sm transition-all duration-300 resize-none min-h-20"
            />
          </div>

          {/** Bouton */}
          <button
            type="submit"
            className="mt-4 bg-linear-to-r from-[#693382] to-[#5a2c95] text-white font-semibold p-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Voir un aperçu
          </button>
        </form>

      </div>


      <div className="flex flex-nowrap gap-8 mx-2 lg:mx-64">
        <div className={`${activePage === 1 ? "opacity-100 order-1" : "opacity-0 order-2"} min-w-full lg:min-w-5xl w-4/5 flex flex-col`}>
          <TextCard
            pageRef={page1Ref}
            bgSrc="/bg.png"
            jour={terme?.jour}
            titre={"Terme : " + (terme?.term || "")}
            texte={accroche}
            texteSize={retSize}
            setTexteSize={setRetSize}
            footer="#1JOUR1TERME"
            config={config}
          />

        </div>

        <div className={`${activePage === 2 ? "opacity-100 order-1" : "opacity-0 order-3"} min-w-full lg:min-w-5xl w-4/5 flex flex-col`}>
          <TextCard
            pageRef={page2Ref}
            bgSrc="/bg.png"
            jour={terme?.jour}
            titre="Définition simple :"
            texte={def}
            texteSize={defSize}
            setTexteSize={setDefSize}
            footer="#1JOUR1TERME"
            config={config}
          />
        </div>

        <div className={`${activePage === 3 ? "opacity-100 order-1" : "opacity-0 order-4"} min-w-full lg:min-w-5xl w-4/5 flex flex-col`}>
          <TextCard
            pageRef={page3Ref}
            bgSrc="/bg.png"
            jour={terme?.jour}
            titre="Exemple concret :"
            texte={exemple}
            texteSize={exSize}
            setTexteSize={setExSize}
            footer="#1JOUR1TERME"
            config={config}
          />
        </div>

        <div className={`${activePage === 4 ? "opacity-100 order-1" : "opacity-0 order-4"} min-w-full lg:min-w-5xl w-4/5 flex flex-col`}>
          <TextCard
            pageRef={page4Ref}
            bgSrc="/bg.png"
            jour={terme?.jour}
            titre="À retenir :"
            texte={aRetenir}
            texteSize={retSize}
            setTexteSize={setRetSize}
            footer="#1JOUR1TERME"
            config={config}
          />


        </div>
      </div>
      <div className="flex gap-2 justify-center mt-6">
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page as 1 | 2 | 3 | 4)}
            className={`px-4 py-2 rounded-lg border transition
        ${activePage === page
                ? "bg-black text-white"
                : "bg-white text-black"
              }`}
          >
            Page {page}
          </button>
        ))}
      </div>
      <div className="lg:h-16 h-12 my-4 relative rounded-lg bg-[#693382] mx-auto w-7/8 lg:w-1/2  overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-all duration-300">
        {/* Overlay animé */}
        <div className="absolute top-0 left-0 w-0 h-full bg-black group-hover:w-full transition-all duration-500 ease-in-out"></div>

        {/* Bouton clickable */}
        <button
          onClick={() => handleDownloadZip()}
          className="relative z-10 w-full h-full flex items-center justify-center gap-2  text-black group-hover:text-white font-semibold text-xl transition-colors duration-500"
        >
          Importer
        </button>
      </div>

    </div >
  );
}
