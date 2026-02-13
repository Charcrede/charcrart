import { CardConfig } from "@/types/cardConfig";
import React, { useState } from "react";

interface TextCardProps {
    pageRef: React.RefObject<HTMLDivElement | null>;
    bgSrc: string;
    jour?: number | string;
    titre: string;
    texte: string;
    footer: string;
    texteSize: number;
    config: CardConfig
    setTexteSize: (size: number) => void;
}

export const TextCardForAll: React.FC<TextCardProps> = ({
    pageRef,
    bgSrc,
    jour,
    titre,
    texte,
    footer,
    texteSize,
    config,
    setTexteSize,
}) => {
    function useResponsiveFont(baseSize: number, pageRef: React.RefObject<HTMLDivElement | null>) {
        const [fontSize, setFontSize] = useState(baseSize);

        React.useEffect(() => {
            function updateFont() {
                if (!pageRef.current) return;
                const width = pageRef.current.clientWidth;
                setFontSize(baseSize * (width / 800));
            }
            updateFont();
            window.addEventListener("resize", updateFont);
            return () => window.removeEventListener("resize", updateFont);
        }, [baseSize, pageRef]);

        return fontSize;
    }

    return (
        <div>


            <div ref={pageRef} className="relative mx-auto rounded-xl overflow-hidden" style={{backgroundColor : config.background === "color" ? config.backgroundValue : undefined}}>
                {config.background === "image" && (
                    <img src={config.backgroundValue} className="rounded-xl w-full" alt="background1" onClick={()=>{console.log(config.backgroundValue)}}/>
                )}
                <div className="w-full h-full absolute top-0 bottom-0 left-0 right-0 bg-black opacity-70"></div>
                <div className="w-full h-full absolute top-0 bottom-0 left-0 right-0 p-10 text-white flex flex-col gap-6 justify-center">
                    {config.showDay && (
                        <p style={{ fontSize: `${useResponsiveFont(36, pageRef)}px` }} className=" font-blanka absolute top-[8%] left-[8%]">
                            Jour {jour}
                        </p>
                    )}
                    <h2 style={{ fontSize: `${useResponsiveFont(config.titleSize ? config.titleSize : 45, pageRef)}px` }} className="mb-4 font-blanka text-center left-[5%] right-[5%] absolute top-[10%]">{titre}</h2>
                    <p
                        style={{ fontSize: `${useResponsiveFont(texteSize, pageRef)}px` }}
                        className="font-edusa font-normal text-center left-[5%] right-[5%] absolute top-[30%] whitespace-pre-line"
                    >
                        {texte}
                    </p>
                    <p
                        style={{ fontSize: `${useResponsiveFont(21, pageRef)}px` }}
                        className="font-poppins font-normal text-center left-[5%] text-gray-100 right-[5%] absolute bottom-[4.5%]"
                    >
                        {footer}
                    </p>
                </div>

            </div>
            <div className="flex flex-col gap-3 mt-4 justify-center bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-md">
                <label
                    htmlFor="texteSize"
                    className="text-sm font-semibold tracking-wide text-[#0788ff]"
                >
                    Taille du texte
                </label>

                <input
                    type="range"
                    min={0}
                    max={100}
                    value={texteSize}
                    onChange={(e) => setTexteSize(parseInt(e.target.value))}
                    className="range-slider"
                    id="texteSize"
                />

                <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">0px</span>
                    <span className="px-3 py-1 rounded-full bg-[#0788ff] text-white font-semibold">
                        {texteSize}px
                    </span>
                    <span className="text-gray-400">100px</span>
                </div>
            </div>
        </div>
    );
};
