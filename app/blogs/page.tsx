import BlogCard from "@/components/BlogCard"; // Import the BlogCard component
import ourblogs from "../../public/ourblogs.png";
import blogcard from "../../public/blogcard.png";

// Sample data for the blog posts
const blogData = [
  {
    id: 1,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src, // Replace with actual image paths
    link: "/blog1",
    large: true, // First single large card
  },
  {
    id: 2,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src, // Replace with actual image paths
    link: "/blog2",
    large: false, // Regular size for left column
  },
  {
    id: 3,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src, // Replace with actual image paths
    link: "/blog3",
    large: false, // Regular size for left column
  },
  {
    id: 4,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src, // Replace with actual image paths
    link: "/blog4",
    large: true, // Large card for the right side of second row
  },
  {
    id: 5,
    title: "Building in Public for Indian Startups",
    description:
      "A Framework for Leveraging Twitter and LinkedIn to Build Early Momentum.",
    image: blogcard.src, // Replace with actual image paths
    link: "/blog5",
    large: false, // Regular size for the third row
  },
];

export default function OurBlogs() {
  return (
    <div>
      {/* Background Image for the 'Our Blogs' Section */}
      <div className="relative w-full h-[400px]">
        <img
          src={ourblogs.src} // Background image
          alt="Our Blogs"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Overlay Text on the Background */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <h1 className="text-5xl md:text-8xl font-['Playfair_Display'] font-bold">
            Our Blogs
          </h1>
        </div>
      </div>

      {/* Blog Cards Section */}
      <div className="px-6 py-12 bg-[#D5C7B3]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* First Row: Single Large Card */}
          <div className="col-span-1 lg:col-span-3">
            <BlogCard
              key={blogData[0].id}
              title={blogData[0].title}
              description={blogData[0].description}
              image={blogData[0].image}
              link={blogData[0].link}
              large={blogData[0].large}
            />
          </div>

          {/* Second Row */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Left Side: Two Cards Stacked */}
            <div className="space-y-8">
              <BlogCard
                key={blogData[1].id}
                title={blogData[1].title}
                description={blogData[1].description}
                image={blogData[1].image}
                link={blogData[1].link}
                large={blogData[1].large}
              />
              <BlogCard
                key={blogData[2].id}
                title={blogData[2].title}
                description={blogData[2].description}
                image={blogData[2].image}
                link={blogData[2].link}
                large={blogData[2].large}
              />
            </div>

            {/* Right Side: One Large Card */}
            <div>
              <BlogCard
                key={blogData[3].id}
                title={blogData[3].title}
                description={blogData[3].description}
                image={blogData[3].image}
                link={blogData[3].link}
                large={blogData[3].large}
              />
            </div>
          </div>

          {/* Third Row: Large Card */}
          <div className="col-span-1 lg:col-span-3">
            <BlogCard
              key={blogData[4].id}
              title={blogData[4].title}
              description={blogData[4].description}
              image={blogData[4].image}
              link={blogData[4].link}
              large={blogData[4].large}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
