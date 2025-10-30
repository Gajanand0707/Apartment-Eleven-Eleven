import BlogCard from "@/components/BlogCard";
import ourblogs from "../../public/ourblogs.png";
import blogcard from "../../public/blogcard.png";

const blogData = [
  {
    id: 1,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src,
    link: "/blog1",
    large: true,
  },
  {
    id: 2,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src,
    link: "/blog2",
    large: false,
  },
  {
    id: 3,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src,
    link: "/blog3",
    large: false,
  },
  {
    id: 4,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src,
    link: "/blog4",
    large: true,
  },
  {
    id: 5,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src,
    link: "/blog5",
    large: true,
  },
];

export default function OurBlogs() {
  return (
    <div className="bg-[#D5C7B3]">
      {/* Hero */}
      <div className="relative w-full h-[320px] md:h-[420px]">
        <img
          src={ourblogs.src}
          alt="Our Blogs"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-8xl font-['Playfair_Display'] font-bold">
            Our Blogs
          </h1>
        </div>
      </div>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-6 md:px-8 py-10 md:py-14 space-y-8">
        <div>
          <BlogCard {...blogData[0]} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-8">
            <BlogCard {...blogData[1]} />
            <BlogCard {...blogData[2]} />
          </div>
          <div className="lg:col-span-2">
            <BlogCard {...blogData[3]} />
          </div>
        </div>

        <div>
          <BlogCard {...blogData[4]} />
        </div>
      </section>
    </div>
  );
}
