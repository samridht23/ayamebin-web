import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen bg-[#0D1117]">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
