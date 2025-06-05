import { Link, useLocation } from "react-router-dom";
import { navigations } from "../constants/navigations";
import clsx from "clsx";

const Header = () => {
  const location = useLocation();
  return (
    <header className="w-full fixed top-0 left-0 z-50 border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto flex justify-center items-center h-16 gap-8">
        {navigations.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={clsx(
              "text-lg font-semibold px-4 py-2 rounded transition-colors duration-200",
              location.pathname === item.to ? "text-green-500" : "text-gray-500",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
