import { Link, useLocation } from "@remix-run/react";
import { Button, Navbar } from "flowbite-react";
import { HiMoon, HiSun, HiArrowLeft } from "react-icons/hi";
import { Theme } from "~/context/Theme";
import useTheme from "~/hooks/useTheme";
import logo from "~/assets/logo.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useTheme();
  const { pathname } = useLocation();
  const handleThemeChange = () => {
    setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };
  const isNotHome = pathname !== "/";
  return (
    <>
      <Navbar fluid={true} rounded={true} className="container mx-auto !pl-8">
        <Link to="/">
          <img
            src={logo}
            alt="chromatch"
            className={`h-4 ${theme === Theme.DARK ? "invert filter" : ""}`}
          />
        </Link>
        {isNotHome ? (
          <Link
            to="/"
            className="ml-auto mr-2 flex items-center gap-1 text-gray-900 dark:text-gray-100"
          >
            <HiArrowLeft className="h-5 w-5" /> Home
          </Link>
        ) : null}
        <Button
          color="transparent"
          className="px-0"
          onClick={handleThemeChange}
        >
          {theme === Theme.DARK ? (
            <HiSun className="h-5 w-5" color="white" />
          ) : (
            <HiMoon className="h-5 w-5" color="gray" />
          )}
        </Button>
      </Navbar>
      <div className="container mx-auto my-4 flex flex-1 flex-wrap justify-around sm:my-8 md:my-12 lg:my-16">
        {children}
      </div>
    </>
  );
}
