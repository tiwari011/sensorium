import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCmsContent from "../hooks/useCmsContent";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPhilosophyMenuOpen, setIsPhilosophyMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const philosophyMenuRef = useRef(null);
  const servicesMenuRef = useRef(null);

  const { content: servicesPageSettings } = useCmsContent({
    query: '*[_type == "servicesPage"][0]{show_blog}',
    fallbackPath: "/content/services-page.json",
    fallbackData: { show_blog: true },
    normalize: (data) => data || { show_blog: true },
  });

  const showBlog = servicesPageSettings?.show_blog !== false;

  const philosophyLinks = [
    { label: "Our Mission", href: "/our-mission" },
    { label: "Our Vision", href: "/our-vision" },
    { label: "Our Approach", href: "/our-approach" },
  ];

  useEffect(() => {
    const onClickOutside = (event) => {
      if (philosophyMenuRef.current && !philosophyMenuRef.current.contains(event.target)) {
        setIsPhilosophyMenuOpen(false);
      }
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target)) {
        setIsServicesMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-200/80 bg-amber-50/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 md:gap-4 md:px-4 md:py-4">
        <a href="/" className="whitespace-nowrap text-sm font-bold tracking-tight text-stone-800 sm:text-base md:text-xl">
          THE SENSORIUM SCHOOL
        </a>

        <div className="flex items-center gap-2 lg:gap-3">
        <nav className="hidden flex-nowrap items-center gap-3 text-sm font-semibold text-stone-800 xl:gap-4 xl:text-base lg:flex">
          <Link to="/" className="whitespace-nowrap hover:text-amber-700">
            Home
          </Link>
          <Link to="/about-us" className="whitespace-nowrap hover:text-amber-700">
            About Us
          </Link>

          <div className="relative" ref={philosophyMenuRef}>
            <button
              type="button"
              onClick={() => {
                setIsPhilosophyMenuOpen((prev) => !prev);
                setIsServicesMenuOpen(false);
              }}
              className="inline-flex items-center gap-1 whitespace-nowrap hover:text-amber-700"
            >
              Our Philosophy
              <span className="text-xs">{isPhilosophyMenuOpen ? "^" : "v"}</span>
            </button>

            {isPhilosophyMenuOpen ? (
              <div className="absolute left-0 top-8 min-w-[11.5rem] rounded-xl border border-amber-200 bg-amber-50 p-2 shadow-lg">
                {philosophyLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-amber-100"
                    onClick={() => setIsPhilosophyMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          <Link to="/areas-of-support" className="whitespace-nowrap hover:text-amber-700">
            Area of Support
          </Link>

          {showBlog ? (
            <div className="relative" ref={servicesMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setIsServicesMenuOpen((prev) => !prev);
                  setIsPhilosophyMenuOpen(false);
                }}
                className="inline-flex items-center gap-1 whitespace-nowrap hover:text-amber-700"
              >
                Our Services
                <span className="text-xs">{isServicesMenuOpen ? "^" : "v"}</span>
              </button>

              {isServicesMenuOpen ? (
                <div className="absolute left-0 top-8 min-w-180px rounded-xl border border-amber-200 bg-amber-50 p-2 shadow-lg">
                  <Link
                    to="/our-services"
                    className="block rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-amber-100"
                    onClick={() => setIsServicesMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    to="/blog"
                    className="block rounded-lg px-3 py-2 text-sm text-stone-700 hover:bg-amber-100"
                    onClick={() => setIsServicesMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <Link to="/our-services" className="whitespace-nowrap hover:text-amber-700">
              Our Services
            </Link>
          )}

          <Link to="/gallery" className="whitespace-nowrap hover:text-amber-700">
            Gallery
          </Link>
        </nav>

        <div className="flex items-center gap-2 pr-1 sm:pr-0">
          <Link
            to="/join-us"
            className="rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600 sm:px-4 sm:py-2 sm:text-sm md:text-lg"
          >
            Join Us
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-300 bg-white/70 text-stone-700 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="text-xl leading-none">{isMenuOpen ? "x" : "="}</span>
          </button>
        </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-amber-100/90 bg-amber-50/95 px-4 py-3 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-2 text-base font-semibold text-stone-700">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 hover:bg-amber-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="rounded-lg px-3 py-2 hover:bg-amber-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <div className="px-3 py-2 text-stone-800">Our Philosophy</div>
            {philosophyLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="rounded-lg py-2 pl-6 pr-3 hover:bg-amber-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/areas-of-support"
              className="rounded-lg px-3 py-2 hover:bg-amber-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Area of Support
            </Link>
            <Link
              to="/our-services"
              className="rounded-lg px-3 py-2 hover:bg-amber-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Services
            </Link>
            <Link
              to="/gallery"
              className="rounded-lg px-3 py-2 hover:bg-amber-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </Link>
            {showBlog ? (
              <Link
                to="/blog"
                className="rounded-lg px-3 py-2 hover:bg-amber-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            ) : null}
          </nav>
        </div>
      ) : null}
    </header>
    <div className="h-[76px] md:h-[84px]" />
    </>
  );
}

export default Navbar;
