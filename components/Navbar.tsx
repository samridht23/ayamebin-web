import React from "react";
import { styled, keyframes } from "@stitches/react";
import { ArchiveIcon, FilePlusIcon, CopyIcon } from "@radix-ui/react-icons";
import { gray } from "@radix-ui/colors";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledContent = styled(TooltipPrimitive.Content, {
  border: "1px solid #60646A",
  borderRadius: 4,
  padding: "10px 15px",
  marginTop: "5px",
  fontSize: 12,
  lineHeight: 1,
  color: gray.gray5,
  backgroundColor: "#161B22",
  userSelect: "none",
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
});

interface ContentProps {
  children: ReactNode;
}
function Content({ children, ...props }: ContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <StyledContent {...props}>{children}</StyledContent>
    </TooltipPrimitive.Portal>
  );
}

export const Provider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipContent = Content;

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "10%",
  height: 35,
  width: 35,
  color: gray.gray5,
  margin: "0px 10px 0px 10px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { backgroundColor: gray.gray11 },
});

const Navbar = () => {
  return (
    <div className="bg-[#161B22] sticky top-0 ">
      <div className="flex items-center w-full h-16 justify-between px-8 lg:px-24">
        <div className="text-white">Nextbin</div>
        <div>
          {NavItem.map((item, idx) => (
            <Provider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconButton key={idx}>
                    <item.icon />
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent key={idx}>{item.tooltip}</TooltipContent>
              </Tooltip>
            </Provider>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const NavItem = [
  {
    icon: ArchiveIcon,
    href: "home",
    tooltip: "Save",
  },
  {
    icon: FilePlusIcon,
    href: "home",
    tooltip: "New File",
  },
  {
    icon: CopyIcon,
    href: "home",
    tooltip: "Duplicate",
  },
];
