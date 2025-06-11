// components/SolutionsSection.tsx
'use client'; // Add 'use client' if SectionCard itself doesn't already have it or if you're using client-side hooks within this component.

import SectionCard from "./SolutionCard";
import ScrollFadeIn from '../../hooks/ScrollFadeIn'; // Import your ScrollFadeIn component

const data = [
  {
    title: "MiCorrelate",
    description: "Quantitative research through surveys, statistical analysis, and data modeling.",
    image: "/solution/solution1.svg",
    link:"/micorrelate"
  },
  {
    title: "MiConnect",
    description: "Qualitative research using IDIs, FGDs, immersive and neuroscience techniques.",
    image: "/solution/solution2.svg",
    link:"/miconnect"
  },
  {
    title: "MiCompliance",
    description: "Mystery shopping, retail audits, and compliance benchmarking solutions.",
    image: "/solution/solution3.svg",
    link:"/micompliance"
  },
  {
    title: "MiClick",
    description: "Social media listening to optimize content and analyze customer sentiment.",
    image: "/solution/solution4.svg",
    link:"/miclick"
  },
  {
    title: "MiCompilation",
    description: "Desk research combining AI and human review to extract verified insights.",
    image: "/solution/solution5.svg",
    link:"/micompilation"
  },
  {
    title: "MiConcept",
    description: "Testing ideas or concepts with consumer feedback using quant/qual techniques.",
    image: "/solution/solution6.svg",
    link:"/miconcept"
  },
  {
    title: "MiClinic",
    description: "Product clinics providing real-time reactions through digital or offline trials.",
    image: "/solution/solution7.svg",
    link:"/miclinic"
  },
  {
    title: "MiCollection",
    description: "Robust fieldwork support with multilingual teams and fraud-checked data collection.",
    image: "/solution/solution8.svg",
    link:"/micollection"
  },

];

export default function SolutionsSection() {
  return (
    <section className="py-10 ">
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {data.map((item, index) => (
          <ScrollFadeIn key={index} delay={0.2 + index * 0.1}> {/* Apply staggered fade-in to each card */}
            <SectionCard {...item} />
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  );
}