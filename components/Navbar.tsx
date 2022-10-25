import { ReactNode } from "react";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import Link from "next/link";
const Navbar = () => {
  return (
    <div className="w-full flex bg-[#313132] px-4 md:px-12 sticky top-0 xl:px-64 items-center justify-between h-16">
      <div className="text-[#d6d6d6]">
        <Link href="/">
          <a>Nextbin</a>
        </Link>
      </div>
      <div className="flex text-[#d6d6d6]">
        {Socials.map((item, idx) => (
          <a href={item.href} key={idx}>
            <div className="p-2 transition text-lg ease-in-out rounded hover:bg-gray-600">
              <item.icon />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
export default Navbar;

const Socials: { icon: ReactNode; href: string }[] = [
  {
    icon: AiOutlineTwitter,
    href: "#",
  },
  {
    icon: AiOutlineGithub,
    href: "#",
  },
];
