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
        "rounded-3xl bg-white shadow-sm border border-black", // subtle thin border
        "transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-0.5",
        "overflow-hidden"
      ].join(" ")}
    >
      {/* Inner layout: image left, content right */}
      <div className="flex flex-col md:flex-row">
        {/* Image block */}
        <div className="md:basis-[40%] md:max-w-[40%] relative bg-black/90 md:rounded-l-2xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className={[
              "w-full h-full object-cover",
              large ? "md:h-[260px]" : "md:h-[200px]",
              "h-56"
            ].join(" ")}
          />
        </div>

        {/* Content block */}
        <div className="flex-1 p-5 md:p-7 bg-white">
          <h3 className="font-['Playfair_Display'] font-bold text-2xl md:text-3xl text-[#111] leading-snug">
            {title}
          </h3>

          <p className="mt-3 text-base md:text-lg text-[#444]">
            {description}
          </p>

          <div className="mt-4 md:mt-6 flex justify-end">
            <a
              href={link}
              className="text-[#1E64FF] hover:underline font-medium"
            >
              Read more...
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
