import { useState } from "react";
import { Search, Menu, X } from "lucide-react";

interface HeaderProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  currentPage: string;
}

const NAV = [
  { label: "HOME", page: "home" },
  { label: "PRODUTOS", page: "products" },
  { label: "LICITAÇÕES", page: "licitacoes" },
  { label: "CONTATO", page: "contact" },
];

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate("products", { search: searchQuery });
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className="bg-white sticky top-0 z-50"
      style={{ borderBottom: "1px solid #ececec", boxShadow: "0 1px 0 #ececec" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center h-[72px] gap-12">

        {/* Logo */}
        <button
          onClick={() => { onNavigate("home"); setMobileOpen(false); }}
          className="flex-shrink-0 select-none"
        >
          <div className="flex flex-col leading-[1] gap-[1px]">
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 21,
              fontWeight: 900,
              color: "#111111",
              letterSpacing: "-0.2px",
            }}>GRUPO</span>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 21,
              fontWeight: 900,
              color: "#dc2626",
              letterSpacing: "-0.2px",
            }}>CLEMAL</span>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10 xl:gap-12 flex-1">
          {NAV.map(item => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="relative font-bold tracking-wide whitespace-nowrap transition-colors duration-150 py-1 group"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: currentPage === item.page ? "#dc2626" : "#374151",
              }}
            >
              {item.label}

              <span
                className="absolute -bottom-0.5 left-0 h-0.5 bg-[#dc2626] transition-all duration-200"
                style={{
                  width: currentPage === item.page ? "100%" : "0%",
                }}
              />

              <span className="absolute -bottom-0.5 left-0 h-0.5 bg-[#dc2626] opacity-0 group-hover:opacity-100 group-hover:w-full transition-all duration-200 w-0" />
            </button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto lg:ml-0">
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-1.5">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-52 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-gray-400 bg-gray-50 transition-all"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* CTA principal desktop */}
          <a
            href="https://wa.me/5531993270281?text=Olá! Gostaria de solicitar um orçamento."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold px-5 py-2.5 rounded-xl transition-colors duration-200 ml-2"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, letterSpacing: "0.05em" }}
          >
            SOLICITAR ORÇAMENTO
          </a>

          <button
            className="lg:hidden p-2.5 text-gray-500 rounded-xl hover:bg-gray-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="px-6 pt-4 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar produtos..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 bg-gray-50"
            />
            <button type="submit" className="bg-[#111111] text-white px-4 py-2.5 rounded-xl">
              <Search className="w-4 h-4" />
            </button>
          </form>
          <nav className="px-4 py-3 space-y-0.5">
            {NAV.map(item => (
              <button
                key={item.page}
                onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
                className="w-full text-left px-4 py-3.5 rounded-xl transition-colors font-bold tracking-wide"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 16,
                  letterSpacing: "0.04em",
                  color: currentPage === item.page ? "#dc2626" : "#374151",
                  background: currentPage === item.page ? "#fef2f2" : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <a
                href="https://wa.me/5531993270281?text=Olá! Gostaria de solicitar um orçamento."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-[#dc2626] text-white font-bold py-3.5 rounded-xl text-sm"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 15, letterSpacing: "0.05em" }}
              >
                SOLICITAR ORÇAMENTO
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
