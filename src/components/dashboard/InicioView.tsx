import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { QuickLink, ClientItem } from '../../types';
import { 
  ChevronUp, 
  ChevronDown, 
  Link as LinkIcon, 
  FileText, 
  ShoppingBag, 
  Users, 
  Store, 
  ExternalLink
} from 'lucide-react';

interface InicioViewProps {
  onOpenNewVoucher: (category: 'venta' | 'compra') => void;
  onOpenViewVouchers: (category: 'venta' | 'compra') => void;
  onOpenClients: () => void;
  onOpenProviders: () => void;
  onOpenClientSelector: () => void;
  onOpenAddLink: () => void;
  quickLinks: QuickLink[];
  featuredClients: ClientItem[];
}

export const InicioView: React.FC<InicioViewProps> = ({
  onOpenNewVoucher,
  onOpenViewVouchers,
  onOpenClients,
  onOpenProviders,
  onOpenClientSelector,
  onOpenAddLink,
  quickLinks,
  featuredClients,
}) => {
  const { user } = useAuth();
  const [heroExpanded, setHeroExpanded] = useState(true);

  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 13) return { title: 'Buenos días', sub: '¡Que tengas una excelente jornada laboral!' };
    if (hour >= 13 && hour < 20) return { title: 'Buenas tardes', sub: '¡Que sigas con un productivo día!' };
    return { title: 'Buenas noches', sub: '¡Que termines bien el día!' };
  };

  const greeting = getGreeting();

  return (
    <div className="w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* HERO GREETING CARD */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden transition-all">
          <div className="p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 relative">
            {/* Text greeting */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-[#07133b] tracking-tight">
                {greeting.title} {user?.name || 'Facundo Chavez'}
              </h2>
              <p className="text-sm text-slate-600 mt-1.5 font-normal">
                {greeting.sub}
              </p>
            </div>

            {/* Desk Vector Illustration */}
            <div className="shrink-0 flex items-center justify-center">
              <svg
                className="w-56 sm:w-72 h-auto"
                viewBox="0 0 320 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background light glow cloud */}
                <path
                  d="M260 20C280 15 300 25 310 45C320 65 300 85 280 90C250 95 240 75 230 65C220 50 240 25 260 20Z"
                  fill="#EBF3FA"
                />
                {/* Desk baseline */}
                <rect x="180" y="78" width="130" height="4" rx="2" fill="#A8C5E2" />

                {/* Computer Monitor */}
                <rect x="188" y="24" width="60" height="40" rx="3" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
                <rect x="191" y="27" width="54" height="34" rx="1.5" fill="#FFFFFF" />
                {/* Stand */}
                <rect x="214" y="64" width="8" height="12" fill="#1D4ED8" />
                <rect x="204" y="74" width="28" height="4" rx="1" fill="#1E3A8A" />
                {/* Mouse */}
                <rect x="254" y="74" width="6" height="4" rx="2" fill="#1E40AF" />

                {/* Receipt paper tape curling */}
                <path
                  d="M285 78 C280 60, 270 55, 260 62 C255 66, 250 68, 245 66"
                  stroke="#93C5FD"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="2 2"
                />

                {/* Calculator */}
                <path d="M265 78 L272 66 L286 66 L288 78 Z" fill="#1E3A8A" />
                <rect x="274" y="68" width="8" height="4" fill="#93C5FD" rx="1" />

                {/* Binders */}
                <rect x="290" y="46" width="10" height="32" rx="1" fill="#16A34A" />
                <circle cx="295" cy="56" r="1.5" fill="#FFFFFF" />
                <rect x="294" y="64" width="2" height="8" fill="#FFFFFF" />

                <rect x="301" y="46" width="10" height="32" rx="1" fill="#22C55E" />
                <circle cx="306" cy="56" r="1.5" fill="#FFFFFF" />
                <rect x="305" y="64" width="2" height="8" fill="#FFFFFF" />
              </svg>
            </div>

            {/* Collapse icon */}
            <button
              type="button"
              onClick={() => setHeroExpanded(!heroExpanded)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              title={heroExpanded ? 'Minimizar' : 'Expandir'}
            >
              {heroExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* MIDDLE ROW (2 CARDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Clientes destacados de tu estudio contable */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 flex flex-col justify-between min-h-[220px]">
            <h3 className="font-semibold text-slate-900 text-sm mb-4">
              Clientes destacados de tu estudio contable
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-6 my-auto">
              <div className="shrink-0">
                <svg className="w-40 sm:w-48 h-auto" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="80" cy="25" r="4" fill="#008db9" />
                  <circle cx="165" cy="70" r="3" fill="#F43F5E" />
                  <circle cx="130" cy="115" r="5" fill="#16A34A" />

                  <rect x="55" y="80" width="80" height="30" rx="2" fill="#E2E8F0" />
                  <line x1="60" y1="110" x2="60" y2="125" stroke="#94A3B8" strokeWidth="2" />
                  <line x1="130" y1="110" x2="130" y2="125" stroke="#94A3B8" strokeWidth="2" />

                  <circle cx="48" cy="50" r="10" fill="#07133b" />
                  <path d="M38 52 C35 65, 30 75, 45 80 L52 70 Z" fill="#07133b" />
                  <rect x="42" y="60" width="16" height="28" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
                  <rect x="44" y="88" width="12" height="25" fill="#07133b" rx="2" />

                  <path d="M78 80 L92 80 L95 72 L81 72 Z" fill="#94A3B8" />

                  <circle cx="145" cy="48" r="9" fill="#1E293B" />
                  <path d="M135 62 L155 62 L150 92 L140 92 Z" fill="#22C55E" />
                  <rect x="141" y="92" width="11" height="22" fill="#1E293B" rx="2" />
                </svg>
              </div>

              <div className="text-center sm:text-left flex-1">
                {featuredClients.length > 0 ? (
                  <div>
                    <p className="text-xs text-slate-500 mb-2 font-medium">
                      Tenés {featuredClients.length} clientes destacados activos:
                    </p>
                    <ul className="space-y-1 mb-4 text-xs font-semibold text-slate-800">
                      {featuredClients.slice(0, 2).map((c) => (
                        <li key={c.id} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#008db9]" />
                          <span>{c.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({c.cuit})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                    Elegí tus clientes más destacados para tenerlos de forma fácil y accesible
                  </p>
                )}

                <button
                  type="button"
                  onClick={onOpenClientSelector}
                  className="bg-[#008db9] hover:bg-[#007a9e] text-white text-xs font-semibold px-5 py-2 rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  Elegir clientes
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Links de accesos */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 flex flex-col justify-between min-h-[220px]">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm mb-4">
                Links de accesos
              </h3>

              <div className="space-y-2.5">
                {quickLinks.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] text-slate-400 truncate">{item.url}</div>
                        <div className="text-xs font-bold text-slate-800 tracking-wide">{item.title}</div>
                      </div>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-[#008db9] p-1.5 transition-colors cursor-pointer"
                      title="Abrir enlace"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={onOpenAddLink}
                className="bg-[#008db9] hover:bg-[#007a9e] text-white text-xs font-semibold px-5 py-2 rounded-md shadow-xs transition-colors cursor-pointer"
              >
                Agregar
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM 4 QUICK ACTION CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Comprobantes de Venta */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="bg-[#07133b] h-10 relative flex justify-center">
                <div className="absolute top-3 w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md border-2 border-white">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-8 pb-4 px-4 text-center">
                <h4 className="font-semibold text-slate-800 text-sm">
                  Comprobantes de Venta
                </h4>
              </div>
            </div>

            <div className="p-4 pt-0 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onOpenViewVouchers('venta')}
                className="border border-[#07133b] text-[#07133b] hover:bg-[#07133b] hover:text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Ver
              </button>
              <button
                type="button"
                onClick={() => onOpenNewVoucher('venta')}
                className="border border-[#07133b] text-[#07133b] hover:bg-[#07133b] hover:text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Nuevo
              </button>
            </div>
          </div>

          {/* Card 2: Comprobantes de Compra */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="bg-[#07133b] h-10 relative flex justify-center">
                <div className="absolute top-3 w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md border-2 border-white">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-8 pb-4 px-4 text-center">
                <h4 className="font-semibold text-slate-800 text-sm">
                  Comprobantes de Compra
                </h4>
              </div>
            </div>

            <div className="p-4 pt-0 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onOpenViewVouchers('compra')}
                className="border border-[#07133b] text-[#07133b] hover:bg-[#07133b] hover:text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Ver
              </button>
              <button
                type="button"
                onClick={() => onOpenNewVoucher('compra')}
                className="border border-[#07133b] text-[#07133b] hover:bg-[#07133b] hover:text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Nuevo
              </button>
            </div>
          </div>

          {/* Card 3: Clientes */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="bg-[#07133b] h-10 relative flex justify-center">
                <div className="absolute top-3 w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md border-2 border-white">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-8 pb-4 px-4 text-center">
                <h4 className="font-semibold text-slate-800 text-sm">
                  Clientes
                </h4>
              </div>
            </div>

            <div className="p-4 pt-0 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onOpenClients}
                className="border border-[#07133b] text-[#07133b] hover:bg-[#07133b] hover:text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Ver
              </button>
              <button
                type="button"
                onClick={onOpenClients}
                className="border border-[#07133b] text-[#07133b] hover:bg-[#07133b] hover:text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Nuevo
              </button>
            </div>
          </div>

          {/* Card 4: Proveedores */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="bg-[#07133b] h-10 relative flex justify-center">
                <div className="absolute top-3 w-12 h-12 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md border-2 border-white">
                  <Store className="w-5 h-5" />
                </div>
              </div>

              <div className="pt-8 pb-4 px-4 text-center">
                <h4 className="font-semibold text-slate-800 text-sm">
                  Proveedores
                </h4>
              </div>
            </div>

            <div className="p-4 pt-0 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={onOpenProviders}
                className="border border-[#07133b] text-[#07133b] hover:bg-[#07133b] hover:text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Ver
              </button>
              <button
                type="button"
                onClick={onOpenProviders}
                className="border border-[#07133b] text-[#07133b] hover:bg-[#07133b] hover:text-white py-1.5 px-3 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Nuevo
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
