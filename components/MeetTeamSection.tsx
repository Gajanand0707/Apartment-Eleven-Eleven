import TeamCard, { TeamCardProps } from "./TeamCard";
import sahiba from "../public/sahiba.png";
import Image from "next/image";

import saahibaImg from "../public/saahiba.png";
import saurabhImg from "../public/saurabh.png";

export default function MeetTeamSection() {
  const teamMembers: TeamCardProps[] = [
    {
      image: sahiba,
      name: "Saahiba Bhatia",
    },
    {
      image: sahiba,
      name: "Saurabh",
    },
  ];

  return (
    <section className="relative w-full bg-[#D6CBBB] text-black flex flex-col items-center py-16 px-6 md:px-8 border-x border-black">
      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-center mb-12">
        Meet Our Team
      </h2>

      {/* Cards row */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-[1400px] w-full">
        {teamMembers.map((member, idx) => (
          <TeamCard key={idx} image={member.image} name={member.name} />
        ))}
      </div>
    </section>
  );
}
