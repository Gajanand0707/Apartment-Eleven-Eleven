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
            <div className="relative w-full md:h-screen overflow-hidden h-[95vh]">
                <img
                    src={playbook.src}
                    alt="Playbooks"
                    className="w-full h-full object-cover "
                />
                <div className="absolute inset-0 flex items-center justify-center px-4 pb-20">
                    <h1 className="text-white text-4xl md:text-7xl font-['OPTIGoudy Agency'] font-bold text-center">
                        Playbooks
                    </h1>
                </div>

                
            <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-24 md:h-32
                        bg-gradient-to-b from-transparent to-[#D5C7B3]" />

                {/* Tab Navigation positioned at bottom */}
                <div className="absolute bottom-12 left-0 right-0 ">
                    <TabNavigation tabs={TABS} />
                </div>
                
            </div>


            <div className="space-y-6">
                <TechnologyCard data={technologyData} />
                <HiringCard data={hiringData} />
                <GrowthCard data={growthData} />
            </div>
        </div>

    )
}
