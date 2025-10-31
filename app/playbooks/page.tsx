"use client"
import Technology from "@/components/TechnologyCard"
import playbook from "../../public/playbook.png"
import TechnologyCard from "@/components/TechnologyCard"
import GrowthCard from "@/components/GrowthCard"
import HiringCard from "@/components/HiringCard"
import Image from "next/image"
import { TabNavigation } from "@/components/Tab"

interface Tab {
    id: string;
    label: string;
    href: string;
}
const TABS: Tab[] = [
    { id: "latest", label: "Latest", href: "/library" },
    { id: "blogs", label: "Our Blogs", href: "/blogs" },
    { id: "playbooks", label: "Playbooks", href: "/playbooks" },
    { id: "deepdives", label: "Deep Dives", href: "/deepdives" },
]

export default function Playbooks() {

    return (
        <div className="bg-[#D5C7B3]">
            <div className="relative w-full h-[320px] md:h-[420px]">
                <img
                    src={playbook.src}
                    alt="Playbooks"
                    className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-5xl md:text-8xl font-['Playfair_Display'] font-bold">
                        Playbooks
                    </h1>
                </div>

                <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-28
                        bg-gradient-to-b from-transparent to-[#D5C7B3]" />

            </div>

            <TabNavigation tabs={TABS} />


            <TechnologyCard />
            <HiringCard />
            <GrowthCard />
        </div>

    )
}