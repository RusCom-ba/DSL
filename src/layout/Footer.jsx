import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white/10 backdrop-blur-md border-t border-white/20 py-6">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-12">
        <a href="https://www.lovska-zveza.si/" target="_blank" rel="noopener noreferrer">
          <img
            src="/assets/LZS-logo.png"
            alt="Logo 1"
            className="h-16 w-auto hover:scale-105 transition-transform duration-200"
          />
        </a>

        <a href="https://lisjak.lovska-zveza.si/login.aspx?ReturnUrl=%2f" target="_blank" rel="noopener noreferrer">
          <img
            src="/assets/glava.png"
            alt="Logo 2"
            className="h-16 w-auto hover:scale-105 transition-transform duration-200"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
