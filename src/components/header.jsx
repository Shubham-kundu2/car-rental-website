import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = ({ authUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinkClass = ({ isActive }) =>
    `block rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/img/logo.png"
            alt="GoRide Rentals Logo"
            className="h-11 w-11 rounded-full object-cover shadow-sm"
          />
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-900">
              GoRide Rentals
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-sky-600">
              Premium fleet
            </div>
          </div>
        </Link>
        <button
          onClick={toggleMenu}
          className="rounded-xl border px-3 py-2 text-slate-700 lg:hidden"
          type="button"
        >
          Menu
        </button>
        <div
          className={`absolute left-0 top-full w-full border-b border-slate-200 bg-white px-4 pb-4 lg:static lg:w-auto lg:border-0 lg:bg-transparent lg:p-0 ${
            isOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="mt-4 flex flex-col gap-2 lg:mt-0 lg:flex-row lg:items-center">
            <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink
              to="/cars"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Cars
            </NavLink>
            <NavLink
              to="/booking"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Booking
            </NavLink>
            <a href="/#about" className="block rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
              About
            </a>
            <a href="/#services" className="block rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
              Services
            </a>
            {authUser ? (
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="block rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Sign Out
              </button>
            ) : (
              <NavLink
                to="/login"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
