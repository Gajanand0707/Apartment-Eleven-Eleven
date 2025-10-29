import Image from "next/image";
import resident_bg from "../../public/resident_bg.png";
import spacex from "../../public/spacex.png";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import HallwaysSection from "@/components/HallwaysSection";



export default function ResidentPage() {
    return (
        <div>
            <section className="relative w-full min-h-[800px] flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Background */}
                <Image
                    src={resident_bg}
                    alt="Residents background"
                    fill
                    priority
                    className="object-cover object-center brightness-95"
                />

                {/* Overlay (optional subtle blur / dim) */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

                {/* Content */}
                <div className="relative z-10 max-w-[1000px] mx-auto px-4">
                    <h2 className="font-['Playfair_Display'] text-[72px] font-bold text-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                        Meet Our Residents
                    </h2>

                    <p className="font-['Playfair_Display'] text-[28px] leading-snug text-black mt-6">
                        A diverse community of innovators, entrepreneurs, and industry leaders
                        driving change across various sectors.
                    </p>

                    {/* Cards */}
                    <div className="mt-24 flex justify-center items-center gap-8">

                        <div className="relative  rounded-[36px] w-[894px] h-[360px] flex flex-col items-center justify-center text-center  scale-110">

                            <Image
                                src={spacex}
                                alt="SpaceX"
                                className="object-contain w-full h-full"
                            />

                        </div>



                    </div>
                </div>
            </section>

          
            <CaseStudiesSection />
            {/* <section className="flex justify-center items-center  bg-[#D8CCBA]">
                <Image
                    src={hallwaysbg}
                    alt="Section background texture"
                    fill
                    priority
                    className="object-cover object-center opacity-80"
                />
                <h1 className="text-8xl text-black font-['Playfair_Display'] font-bold">Conversations in the Hallways</h1>

                <h2 className="text-4xl text-black font-['Playfair_Display'] font-semibold"> Where serendipitous encounters spark innovation and change. The most important innovations often happen in the spaces between meetings.</h2>
            </section> */}
            <HallwaysSection />
        </div>

    );
}
