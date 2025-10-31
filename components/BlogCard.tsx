type BlogCardProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  large?: boolean;
};

const BlogCard = ({ title, description, image, link, large }: BlogCardProps) => {
  return (
    <article
      className={[
        "rounded-3xl bg-white shadow-lg border border-[#E1E1E1]", // subtle border
        "transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-0.5",
        "overflow-hidden",
        large ? "h-[380px]" : "h-[280px]", // large card height
        "flex flex-col"
      ].join(" ")}
    >
      {/* Image section */}
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-[60%] object-cover rounded-t-lg"
        />
      </div>

      {/* Text section */}
      <div className="flex flex-col justify-between p-5 flex-1">
        <h3 className="font-['Playfair_Display'] font-bold text-xl text-[#333] leading-tight">
          {title}
        </h3>
        <p className="text-sm text-[#555] mt-2 flex-1">{description}</p>
        <a
          href={link}
          className="text-[#1E64FF] hover:underline text-base font-medium mt-4"
        >
          Read more...
        </a>
      </div>
    </article>
  );
};

export default BlogCard;
