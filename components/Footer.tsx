import { TwitterLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
const Footer = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-[#0D1117] text-sm text-white">
        <div className="flex p-4 items-center justify-center border-[#21262d] border-t-2 w-5/6">
          <a href="#">
            <div className="px-4 py-2 hover:bg-gray-500  mx-2 rounded">
              <TwitterLogoIcon />
            </div>
          </a>
          <a href="#">
            <div className="px-4 py-2 hover:bg-gray-500  mx-2 rounded">
              <GitHubLogoIcon />
            </div>
          </a>
        </div>
        <div className="pb-8 text-[#8b949e]">© 2022 Nextbin</div>
      </div>
    </>
  );
};
export default Footer;
