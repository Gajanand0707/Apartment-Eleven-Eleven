import Image from "next/image";
import texture from "../public/texture.png"; // <-- your pill texture image

type TextureButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function TextureButton({ children, className = "" }: TextureButtonProps) {
  return (
    <div
      className={`
        relative inline-flex items-center justify-center
        px-6 py-4
        rounded-4xl
        text-white
        font-['Playfair_Display']
        font-semibold
        text-xl
        leading-none
        shadow-[0_4px_8px_rgba(0,0,0,0.4)]
        ${className}
      `}
    >
      {/* background texture */}
      <Image
        src={texture}
        alt=""
        fill
        priority
        className="object-cover object-center rounded-4xl"
      />

      {/* overlay to ensure readable contrast if texture is noisy */}
      <div className="absolute inset-0 rounded-full bg-black/10" />

      {/* button text */}
      <span className="relative z-[1] whitespace-nowrap px-2">
        {children}
      </span>
    </div>
  );
}
