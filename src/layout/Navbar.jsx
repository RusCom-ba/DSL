import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: "PREDSTAVITEV", href: "#predstavitev" },
    { label: "UPRAVNI ODBOR", href: "#upravni-odbor" },
    { label: "OBVESTILA", href: "#obvestila" },
    { label: "FOTOGALERIJA", href: "#galerija" },
    { label: "VČLANITEV", href: "#vclanitev" },
    { label: "KONTAKT", href: "#kontakt" },

  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
            : "bg-white/10 backdrop-blur-md border-b border-white/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-4">
  <img
    src="/assets/dsl-logo.png"
    alt="logo"
    className="h-16 w-auto object-contain drop-shadow-lg cursor-pointer"
  />
</a>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`relative tracking-wide hover-underline transition duration-200 ${
                  scrolled
                    ? "text-green-900 hover:text-green-700"
                    : "text-white hover:text-green-200"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={28} className={scrolled ? "text-green-900" : "text-white"} />
            ) : (
              <Menu size={28} className={scrolled ? "text-green-900" : "text-white"} />
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-30 left-0 w-full bg-white/10 backdrop-blur-lg border-t border-white/20 flex flex-col items-center gap-6 py-6 z-50">
            {links.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-white font-medium text-lg hover:text-green-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
