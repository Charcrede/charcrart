import Image from "next/image";

export default function Card() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-50">
            <div className="relative rounded-xl overflow-hidden">
                <img src="bg.png" alt="background1" />
                {/* <div className="w-full h-full absolute top-0 bottom-0 left-0 right-0 bg-[#4b4b4b] opacity-70 backdrop-blur-xl"></div> */}
                {/* <div className="w-full h-full absolute top-0 bottom-0 left-0 right-0 text-[100px] text-center flex items-center justify-center">la vie en rose édith piaf</div> */}
            </div>

        </div>
    );
}
