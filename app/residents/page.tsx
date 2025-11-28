import Image from "next/image";
import residentHero from "../../public/residentHero.png";
import spacex from "../../public/spacex.png";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import HallwaysSection from "@/components/HallwaysSection";
import GlassSpotlight from "@/components/GlassSpotLight";
import Technology from "@/components/TechnologyCard";



export default function ResidentPage() {
    return (
        <div>
            <section className="relative w-full min-h-[800px] flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Background */}
                <Image
                    src={residentHero}
                    alt="Residents background"
                    fill
                    priority
                    className="object-cover object-center brightness-95"
                />

                {/* Overlay (optional subtle blur / dim) */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

                {/* Content */}
                <div className="relative z-10 max-w-[1000px] mx-auto px-4 pt-24 md:pt-32">
                    <h2 className="font-[OPTIGoudy_Agency] text-4xl md:text-7xl font-bold text-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]">
                        Meet Our Residents
                    </h2>

                    <p className="font-[Goudy_Old_Style] text-2xl md:text-4xl leading-snug text-black mt-6">
                        A diverse community of innovators, entrepreneurs, and industry leaders
                        driving change across various sectors.
                    </p>

                    {/* Cards */}
                    <div className="mt-24 flex justify-center items-center gap-8">


                        <GlassSpotlight />


                    </div>
                </div>
            </section>


            <CaseStudiesSection limit={4} />

            <HallwaysSection />

        </div>

    );
}
