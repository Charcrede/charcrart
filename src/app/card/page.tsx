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
import { TextCardForAll } from "@/components/cardForAll";

export default function CreateCardForAll() {
    const [accroche, setAccroche] = useState("");
    ;
    const [retSize, setRetSize] = useState(42);
    const [def, setDef] = useState("");
    const [exemple, setExemple] = useState("");
    const [aRetenir, setARetenir] = useState("");
    const [activePage, setActivePage] = useState<1 | 2 | 3 | 4>(1);
    const [form, setForm] = useState<{ titre: string, contenu: string, footer: string, bgImage: string | null, bgColor: string, bgType: "image" | "color" }>({ titre: "", contenu: "", footer: "", bgImage: null, bgColor: "#000000", bgType: "image" });
    const page1Ref = useRef<HTMLDivElement>(null);



    const config = {
        background: form.bgType,
        backgroundValue: form.bgImage || form.bgColor,
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
    }, []);



    const downloadImage = async (
        ref: RefObject<HTMLDivElement | null>,
        filename = form.titre ? form.titre : "design" + ".png"
    ) => {
        if (!ref.current) return;

        const dataUrl = await htmlToImage.toPng(ref.current, {
            pixelRatio: 2,
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = filename;
        link.click();
    };

    const handleForm = (name: string, value: string) => {
        setForm(prev => ({ ...prev, [name]: value }));
    }




    return (
        <div className=" bg-linear-to-r from-[#07233b] to-[#050d17] py-16">
            <div className="font-poppins min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <form
                    action=""
                    className="sm:w-full lg:w-1/2 flex flex-col gap-6 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-[#0788ff]/30 text-white"
                >
                    <legend className="text-2xl sm:text-3xl font-blanka text-center text-[#0788ff] tracking-wide">
                        Carte
                    </legend>

                    {/** Champ Texte */}
                    <div className="flex flex-col gap-1 w-full relative group">
                        <label
                            htmlFor="accroche"
                            className="text-[#07233b] text-lg sm:text-xl font-semibold transition-all duration-300 group-focus-within:text-[#0788ff]"
                        >
                            Titre
                        </label>
                        <input
                            id="accroche"
                            value={form?.titre || ""}
                            onChange={(e) => handleForm("titre", e.target.value)}
                            placeholder="Titre de la carte..."
                            className="border-2 border-[#555] focus:border-[#0788ff] focus:ring-1 focus:ring-[#0788ff] outline-none w-full p-3 rounded-xl bg-white/10 text-white shadow-sm transition-all duration-300 resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full relative group">
                        <label
                            htmlFor="exemple"
                            className="text-[#07233b] text-lg sm:text-xl font-semibold transition-all duration-300 group-focus-within:text-[#0788ff]"
                        >
                            Pied de page
                        </label>
                        <input
                            id="exemple"
                            value={form?.footer || ""}
                            onChange={(e) => handleForm("footer", e.target.value)}
                            placeholder="Pied de page de la carte..."
                            className="border-2 border-[#555] focus:border-[#0788ff] focus:ring-1 focus:ring-[#0788ff] outline-none w-full p-3 rounded-xl bg-white/10 text-white shadow-sm transition-all duration-300 resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full relative group">
                        <label
                            htmlFor="def"
                            className="text-[#07233b] text-lg sm:text-xl font-semibold transition-all duration-300 group-focus-within:text-[#0788ff]"
                        >
                            Contenue
                        </label>
                        <textarea
                            id="def"
                            value={form?.contenu || ""}
                            onChange={(e) => handleForm("contenu", e.target.value)}
                            placeholder="Contenue de la carte..."
                            className="border-2 border-[#555] focus:border-[#0788ff] focus:ring-1 focus:ring-[#0788ff] outline-none w-full p-3 rounded-xl bg-white/10 text-white shadow-sm transition-all duration-300 resize-none min-h-20"
                        />
                    </div>



                    <div className="flex flex-col gap-1 w-full relative group">
                        <p
                            className="text-[#07233b] text-lg sm:text-xl font-semibold transition-all duration-300 group-focus-within:text-[#0788ff]"
                        >
                            Arrière plan
                        </p>
                        <div className="flex flex-col gap-4">
                            {/* Choix du type de fond */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setForm({ ...form, bgType: "image" })}
                                    className={`px-4 py-2 rounded-xl border transition-all ${form.bgType === "image"
                                        ? "bg-[#0788ff] text-white border-[#0788ff]"
                                        : "bg-white/10 text-gray-400  hover:border-[#0788ff]"
                                        }`}
                                >
                                    Image
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setForm({ ...form, bgType: "color" })}
                                    className={`px-4 py-2 rounded-xl border transition-all ${form.bgType === "color"
                                        ? "bg-[#0788ff] text-white border-[#0788ff]"
                                        : "bg-white/10 text-gray-400  hover:border-[#0788ff]"
                                        }`}
                                >
                                    Couleur
                                </button>
                            </div>

                            {/* Input dynamique */}
                            {form.bgType === "image" ? (
                                <label className="flex flex-col gap-2">
                                    <span className="text-sm text-gray-400">Image de fond</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (!file) return
                                            setForm({ ...form, bgImage: URL.createObjectURL(file) })
                                            }}
                                        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#0788ff] file:text-white hover:file:bg-[#07233b] cursor-pointer"
                                    />
                                </label>
                            ) : (
                                <label className="flex items-center gap-4">
                                    <span className="text-sm text-gray-400">Couleur de fond</span>
                                    <input
                                        type="color"
                                        value={form.bgColor}
                                        onChange={(e) =>
                                            setForm({ ...form, bgColor: e.target.value })
                                        }
                                        className="w-14 h-10 rounded-lg cursor-pointer bg-transparent border border-[#444]"
                                    />
                                </label>
                            )}
                        </div>

                    </div>

                </form>

            </div>


            <div className="flex justify-center gap-8 mx-2 lg:mx-auto mt-0 lg:mt-16 transition-all duration-500">
                <div className={`lg:min-w-[64rem] w-full md:w-1/4 flex flex-col`}>
                    <TextCardForAll
                        pageRef={page1Ref}
                        bgSrc="/bg.png"
                        jour={10}   
                        titre={form.titre}
                        texte={form.contenu}
                        texteSize={retSize}
                        setTexteSize={setRetSize}
                        footer={form.footer}
                        config={config}
                    />

                </div>

            </div>
            <div className="lg:h-16 h-12 my-4 relative rounded-lg bg-[#0788ff] mx-auto w-7/8 lg:w-1/2  overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-all duration-300">
                {/* Overlay animé */}
                <div className="absolute top-0 left-0 w-0 h-full bg-black group-hover:w-full transition-all duration-500 ease-in-out"></div>

                {/* Bouton clickable */}
                <button
                    onClick={() => downloadImage(page1Ref, form.titre ? form.titre + ".png" : "design.png")}
                    className="relative z-10 w-full h-full flex items-center justify-center gap-2  text-black group-hover:text-white font-semibold text-xl transition-colors duration-500"
                >
                    Télécharger la carte
                </button>
            </div>

        </div >
    );
}
