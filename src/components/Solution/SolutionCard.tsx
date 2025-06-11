import Link from "next/link";

type SectionCardProps = {
  title: string;
  description: string;
  image: string;
  link:string;
};

export default function SectionCard({
  title,
  description,
  image,
  link,
}: SectionCardProps) {
  return (
    <div
      className="flex flex-col items-start max-w-sm mx-auto  rounded-lg overflow-hidden 
                 transform transition duration-300 hover:scale-105 hover:shadow-lg group"
    >
      <div className="overflow-hidden w-full h-[320px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-t-md transform transition duration-500 group-hover:scale-110 group-hover:brightness-95"
        />
      </div>

      <div className="p-4">
        <h3 className="h3">{title}</h3>
        <p className="p2 !mb-5">{description}</p>
        <Link href={link}>
        <button className="b2">
          <span className="Arrow">→</span>
          Find out more
        </button>
        </Link>
      </div>
    </div>
  );
}
