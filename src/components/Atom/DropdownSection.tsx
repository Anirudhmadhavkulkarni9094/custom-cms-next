import { Brackets, ChevronDown, ChevronUp, Ellipsis } from "lucide-react";
import Link from "next/link";

export default function DropdownSection({ name, label, links, openDropdown, handleDropdown }: {
  name: string;
  label: string;
  links: { href: string; text: string }[];
  openDropdown: string | null;
  handleDropdown: (name: string) => void;
}) {
  const isOpen = openDropdown === name;
  return (
    <li>
      <button
        className="w-full flex justify-between items-center font-bold text-xl text-white focus:outline-none"
        onClick={() => handleDropdown(name)}
      >
        {label}
        <span className="ml-2">
            <Ellipsis />
        </span>
      </button>
      {isOpen && (
        <div className='flex flex-col space-y-2 mt-2 ml-5'>
          {links.map(link => (
            <div className="flex items-center space-x-2 hover:text-purple-500" key={link.href} >
            <Brackets />
            <Link key={link.href} href={link.href}>{link.text}</Link>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}