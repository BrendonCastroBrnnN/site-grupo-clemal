import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-[#111111] text-white/60 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:3133955190"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Phone className="w-3 h-3" />
            (31) 3395-5190
          </a>
          <a
            href="mailto:contato@grupoclemal.com.br"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Mail className="w-3 h-3" />
            contato@grupoclemal.com.br
          </a>
          <a
            href="https://wa.me/5531993270281"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <MessageCircle className="w-3 h-3" />
            (31) 99327-0281
          </a>
        </div>
        <div className="flex items-center gap-5 mx-auto md:mx-0" style={{ fontFamily: "'Inter', sans-serif" }}>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3" />
            Contagem · Minas Gerais · Brasil
          </span>
          <span className="hidden sm:block">·</span>
          <span className="hidden sm:block">Fabricante Nacional · Desde 1998</span>
        </div>
      </div>
    </div>
  );
}
