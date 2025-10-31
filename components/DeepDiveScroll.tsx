import AutoScrollCarousel from "./AutoScrollCarousel";
import blogcard from "../public/blogcard.png";

const items = [
  { id: 1, title: "Building in Public", description: "A Framework...", image: blogcard.src },
  { id: 2, title: "Scaling Through Systems", description: "How to scale...", image: blogcard.src },
  { id: 3, title: "Brand Perception 101", description: "Design psychology...", image: blogcard.src },
  { id: 4, title: "Ops Playbooks", description: "Make processes visible.", image: blogcard.src },
];

export default function Section() {
  return (
    <AutoScrollCarousel
      items={items}
      speed={90}        // px/sec
      cardWidth={600}   // tweak to match your design
      gap={36}

    />
  );
}
