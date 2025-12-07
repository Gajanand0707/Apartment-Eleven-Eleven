"use client"
import { useEffect, useState } from "react"
// import { fetchFromAPI } from "@/app/utils/fetchFromAPI"
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
   
    const [playbooks, setPlaybooks] = useState<any[]>([]);
    const [technologyData, setTechnologyData] = useState<any[]>([]);
    const [growthData, setGrowthData] = useState<any[]>([]);
    const [hiringData, setHiringData] = useState<any[]>([]);

    useEffect(() =>{
        const fetchPlaybooks = async () =>{
            try {
                const res = await fetch("https://proper-friendship-29e4bdb47f.strapiapp.com/api/playbooks?populate=*");
                if(!res.ok) throw new Error("Failed to fetch playbooks");
                const json = await res.json();
                const data = json.data || [];
                
                setPlaybooks(data);
                
                // Filter by type - data is already the array of playbooks
                setTechnologyData(data.filter((item: any) => item.type === 'technology'));
                setGrowthData(data.filter((item: any) => item.type === 'growth'));
                setHiringData(data.filter((item: any) => item.type === 'hiring'));
            } catch (error) {
                console.error("Playbooks (client) - fetch error:", error);
            }
        }
        fetchPlaybooks();
    }, []);
    
    return (
        <div className="bg-[#D5C7B3] max-w-screen overflow-x-hidden">
            <div className="relative w-full h-[500px] md:h-[500px]">
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

            <div className="space-y-0">
                <TechnologyCard data={technologyData} />
                <HiringCard data={hiringData} />
                <GrowthCard data={growthData} />
            </div>
        </div>

    )
}
