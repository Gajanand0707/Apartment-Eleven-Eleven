import MeetTeamSection from "@/components/MeetTeamSection"
import insdie from "../../public/inside.png"
export default function InsidePage() {
    return(
        <div>
            <div className="h-full w-full">
                <img src={insdie.src} alt="inside image" />
            </div>

            <MeetTeamSection/>
        </div>
    )
}