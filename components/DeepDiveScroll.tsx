import AutoScrollCarousel from "./AutoScrollCarousel";

type CarouselItem = {
  id: number | string;
  title: string;
  description: string;
  image: string;
};

type DeepDiveScrollProps = {
  direction?: "left" | "right";
  items?: CarouselItem[];
};

export default function Section({ direction = "left", items = [] }: DeepDiveScrollProps) {
  return (
    <AutoScrollCarousel
      items={items}
      speed={120}        // px/sec
      cardWidth={600}   // tweak to match your design
      gap={36}
      direction={direction}
    />
  );
}
