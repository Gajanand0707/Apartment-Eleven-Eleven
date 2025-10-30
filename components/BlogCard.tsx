type BlogCardProps = {
  title: string;
  description: string;
  image: string;
  link: string;
  large?: boolean; // Added a prop to conditionally make cards larger
};

const BlogCard = ({ title, description, image, link, large }: BlogCardProps) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-xl hover:scale-105 ${
        large ? "lg:col-span-2" : "" // Apply larger size when `large` is true
      }`} // Apply larger size when `large` is true
    >
      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className={`w-full ${large ? "h-80" : "h-56"} object-cover rounded-t-lg`}
      />

      <div className="p-6">
        {/* Blog Title */}
        <h3 className="font-['Playfair_Display'] font-bold text-2xl text-gray-800">
          {title}
        </h3>

        {/* Blog Description */}
        <p className="text-lg text-gray-600 mt-4">{description}</p>

        {/* Read More Link */}
        <a href={link} className="mt-4 inline-block text-[#21F2B5] font-medium">
          Read More...
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
