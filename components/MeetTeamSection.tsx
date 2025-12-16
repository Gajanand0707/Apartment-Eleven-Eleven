"use client";
import TeamCard, { TeamCardProps } from "./TeamCard";
import { useEffect, useState } from "react";

type StrapiImage = {
  url?: string;
  formats?: Record<string, { url: string }> | null;
};

type TeamApiItem = {
  id: number;
  name: string;
  image?: StrapiImage | null;
};

export default function MeetTeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchTeam() {
      try {
        const res = await fetch(
          "https://proper-friendship-29e4bdb47f.strapiapp.com/api/team-cards?populate=*"
        );
        if (!res.ok) throw new Error("Failed to fetch team data");
        const json = await res.json();
        const data: TeamApiItem[] = json.data || [];

        const members = data.map((it) => {
          const img = it.image as any;
          const url = img?.formats?.small?.url ?? img?.url ?? "";
          return {
            image: url || "/placeholder.svg",
            name: it.name || "",
          } as TeamCardProps;
        });

        if (mounted) setTeamMembers(members);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchTeam();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative w-full bg-[linear-gradient(0deg,_#D5C7B3_97%,_#B49768_100%)]
 text-black flex flex-col items-center py-16 px-6 md:px-8 border-x border-black overflow-hidden">
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-['OPTIGoudy Agency'] font-bold text-center mb-12">
        Meet Our Team
      </h2>

      {loading && <p className="mb-8">Loading team...</p>}
      {error && <p className="mb-8 text-red-600">{error}</p>}

      {/* Cards row */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-[1400px] w-full">
        {teamMembers.map((member, idx) => (
          <TeamCard key={idx} image={member.image} name={member.name} />
        ))}
      </div>
    </section>
  );
}
