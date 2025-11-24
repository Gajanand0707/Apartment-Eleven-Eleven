import Image from "next/image";
import form from "../../public/form.jpg"
export default function AfterSubmitPage() {
    return (
        <div className="relative w-full min-h-screen">
            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <Image src={form} alt="form submitted" fill className="object-cover" />
            </div>

            {/* Optional dim overlay for contrast */}
            <div className="absolute inset-0 z-10 bg-black/35" />

            {/* Centered text over image */}
            <div className="relative z-20 flex items-center justify-center min-h-screen px-6">
                <p className="text-center text-4xl md:text-7xl font-['Goudy_Old_Style'] backdrop-blur-sm text-white max-w-3xl">
                    Thank you for reaching out to us. We’ll get back to you within 72 hours.
                </p>
            </div>
        </div>
    );
}