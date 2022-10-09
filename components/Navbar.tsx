import * as Tooltip from "@radix-ui/react-tooltip";
import cx from "classnames";
import {
  FilePlusIcon,
  ArchiveIcon,
  CopyIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

import { ReactNode } from "react";

export interface NavItemsProp {
  url?: string;
  external?: boolean;
  // check this interface afterward can be icon from react
  icon: ReactNode;
  tooltip: string;
  onClick?(): any;
}
const NavItems = [
  {
    url: "/",
    tooltip: "Save",
    icon: ArchiveIcon,
  },
  {
    url: "/",
    tooltip: "New",
    icon: FilePlusIcon,
  },
  {
    url: "/",
    tooltip: "Clone",
    icon: CopyIcon,
  },
  {
    url: "/",
    tooltip: "Raw",
    icon: FileTextIcon,
  },
];
export interface NavbarProps {
  // we are making items as array interface because we are using spread operator for items and the component will get array for items so we have to make items type interface as array
  items: NavItemsProp[];
  displayLanguage?: boolean;
  documentLanguage?: string;
  setDocumentLanguage?(language: string): any;
}
const Navbar = ({
  items,
  displayLanguage,
  documentLanguage,
  setDocumentLanguage,
}: NavbarProps) => {
  return (
    <>
      <div className="bg-[#161B22] text-white sticky w-full flex items-center py-4 justify-between px-2 lg:px-[220px]">
        <div className="px-2 text-lg">Nextbin</div>
        <div className="flex">
          {NavItems.map((item, idx) => (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger className="flex p-2 mx-2 items-center hover:bg-gray-700 rounded text-[#959ca4] hover:text-white transition ease-in-out">
                  <Link key={idx} href={item.url}>
                    <a>
                      <item.icon />
                    </a>
                  </Link>
                </Tooltip.Trigger>
                <Tooltip.Content
                  sideOffset={4}
                  className={cx(
                    "radix-side-top:animate-slide-down-fade",
                    "radix-side-right:animate-slide-left-fade",
                    "radix-side-bottom:animate-slide-up-fade",
                    "radix-side-left:animate-slide-right-fade",
                    "inline-flex items-center rounded-md px-4 py-1",
                    "bg-[#161b22] text-sm border border-[#30363d] shadow-lg"
                  )}
                >
                  {item.tooltip}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          ))}
        </div>
      </div>
    </>
  );
};
export default Navbar;
