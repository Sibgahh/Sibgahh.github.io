import { RollingTextList } from "@/components/ui/rolling-list"

export default function DemoOne() {
  return (
    <RollingTextList
      heading="Process"
      items={[
        {
          id: "1",
          title: "Discover",
          category: "Research",
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop&q=60",
          alt: "Team discovering insights",
          color: "blue",
        },
        {
          id: "2",
          title: "Design",
          category: "Experience",
          src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=60",
          alt: "Design collaboration",
          color: "blue",
        },
        {
          id: "3",
          title: "Develop",
          category: "Engineering",
          src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60",
          alt: "Developers coding",
          color: "blue",
        },
        {
          id: "4",
          title: "Deploy",
          category: "Launch",
          src: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&auto=format&fit=crop&q=60",
          alt: "Product launch",
          color: "blue",
        },
      ]}
    />
  )
}
