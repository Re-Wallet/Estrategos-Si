import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ActiveView } from '../../types';
import { SettingsDropdown } from './SettingsDropdown';
import { NAV_MENUS, NavSection } from './NavHoverMenus';
import { 
  Building2, 
  Bell, 
  Settings, 
  HelpCircle, 
  User as UserIcon, 
  ChevronDown, 
  LogOut, 
  Plus,
  HelpCircle as HelpIcon
} from 'lucide-react';

interface HeaderProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  onOpenSettingsOption: (option: string, category: string) => void;
  onOpenHelpModal: () => void;
  onSelectNavSubItem: (section: string, item: string, isPlus?: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSettingsOption,
  onOpenHelpModal,
  onSelectNavSubItem,
}) => {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Hover menu state for navigation bar
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const navHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const settingsHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnterNav = (viewKey: string) => {
    if (navHoverTimeoutRef.current) {
      clearTimeout(navHoverTimeoutRef.current);
      navHoverTimeoutRef.current = null;
    }
    setHoveredNav(viewKey);
  };

  const handleMouseLeaveNav = () => {
    navHoverTimeoutRef.current = setTimeout(() => {
      setHoveredNav(null);
    }, 180);
  };

  const handleMouseEnterSettings = () => {
    if (settingsHoverTimeoutRef.current) {
      clearTimeout(settingsHoverTimeoutRef.current);
      settingsHoverTimeoutRef.current = null;
    }
    setSettingsMenuOpen(true);
  };

  const handleMouseLeaveSettings = () => {
    settingsHoverTimeoutRef.current = setTimeout(() => {
      setSettingsMenuOpen(false);
    }, 200);
  };

  const navItems: { label: string; view: ActiveView }[] = [
    { label: 'Reportes', view: 'reportes' },
    { label: 'Ventas', view: 'ventas' },
    { label: 'Compras', view: 'compras' },
    { label: 'Finanzas', view: 'finanzas' },
    { label: 'Inventarios', view: 'inventarios' },
    { label: 'Impuestos', view: 'impuestos' },
    { label: 'Contabilidad', view: 'contabilidad' },
    { label: 'Sueldos', view: 'sueldos' },
    { label: 'Gestor de Tareas', view: 'gestor_tareas' },
  ];

  return (
    <header className="w-full bg-white relative z-40">
      {/* 1. TOP WHITE BAR */}
      <div className="border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Brand Logo (al apretar xubio será el inicio) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('inicio')}
            title="Ir al Inicio de Xubio"
            className="flex items-center gap-1 focus:outline-none cursor-pointer group"
          >
            <span className="text-[#07133b] font-extrabold text-3xl tracking-tight lowercase">
              xubio
            </span>
          </button>
        </div>

        {/* Right: Studio indicator, icons, and User dropdown */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          
          {/* Studio button / badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 bg-slate-50/80 text-xs text-slate-700 font-medium">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">Estudio:</span>
            <span className="font-semibold text-slate-900">{user?.studioName || 'Facundo Chavez'}</span>
          </div>

          {/* Notifications bell */}
          <div className="relative" ref={notifMenuRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              title="Notificaciones"
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
            </button>
            {notificationsOpen && (
              <div className="absolute right-0 top-10 bg-white rounded-lg shadow-xl border border-slate-200 p-3 w-72 z-50 text-xs animate-in fade-in duration-100">
                <div className="font-semibold text-slate-800 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Notificaciones</span>
                  <span className="text-[10px] bg-sky-100 text-[#008db9] px-1.5 py-0.5 rounded">2 nuevas</span>
                </div>
                <div className="divide-y divide-slate-100 my-1">
                  <div className="py-2">
                    <p className="font-medium text-slate-800">Sincronización ARCA completada</p>
                    <p className="text-slate-500 text-[11px]">Se actualizaron los comprobantes electrónicos.</p>
                  </div>
                  <div className="py-2">
                    <p className="font-medium text-slate-800">Facturación en línea activa</p>
                    <p className="text-slate-500 text-[11px]">Certificado digital AFIP vigente.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Configuración / Gear button (Image 3 toggle & HOVER deployed) */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnterSettings}
            onMouseLeave={handleMouseLeaveSettings}
          >
            <button
              type="button"
              onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
              title="Configuración"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                settingsMenuOpen 
                  ? 'bg-slate-200 text-[#008db9]' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Megamenu dropdown corresponding to Image 3 */}
            <SettingsDropdown
              isOpen={settingsMenuOpen}
              onClose={() => setSettingsMenuOpen(false)}
              onSelectOption={onOpenSettingsOption}
              onMouseEnter={handleMouseEnterSettings}
              onMouseLeave={handleMouseLeaveSettings}
            />
          </div>

          {/* Help button */}
          <button
            type="button"
            onClick={onOpenHelpModal}
            title="Ayuda y Soporte"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Vertical divider */}
          <div className="h-5 w-px bg-slate-300 mx-1 hidden sm:block" />

          {/* User Profile Dropdown Button (Facundo Chavez) */}
          <div className="relative" ref={userMenuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer text-xs sm:text-sm font-medium text-slate-700"
            >
              <UserIcon className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-slate-800 max-w-[140px] truncate">
                {user?.name || 'Facundo Chavez'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu: Mi Perfil & Cerrar Sesión */}
            {userMenuOpen && (
              <div className="absolute right-0 top-11 w-60 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {user?.name || 'Facundo Chavez'}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user?.email || 'facundochavez@gmail.com'}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      onNavigate('perfil');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 flex items-center gap-2.5 transition-colors cursor-pointer font-medium"
                  >
                    <UserIcon className="w-4 h-4 text-slate-500" />
                    <span>Mi Perfil</span>
                  </button>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer font-medium"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. DARK NAVY SUB-NAVBAR WITH HOVER DROPDOWNS (Images 1-8) */}
      <nav 
        className="bg-[#07133b] px-4 sm:px-6 relative"
        onMouseLeave={handleMouseLeaveNav}
      >
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-visible">
          {navItems.map((item) => {
            const hasDropdown = item.view !== 'gestor_tareas' && !!NAV_MENUS[item.view];
            const isHovered = hoveredNav === item.view;
            const isActive = currentView === item.view;

            return (
              <div
                key={item.view}
                className="relative"
                onMouseEnter={() => {
                  if (hasDropdown) {
                    handleMouseEnterNav(item.view);
                  } else {
                    setHoveredNav(null);
                  }
                }}
                onMouseLeave={handleMouseLeaveNav}
              >
                <button
                  type="button"
                  onClick={() => {
                    setHoveredNav(null);
                    onNavigate(item.view);
                  }}
                  className={`px-3 py-2 text-xs transition-colors whitespace-nowrap cursor-pointer rounded-t-md relative z-30 ${
                    isHovered && hasDropdown
                      ? 'bg-white text-slate-900 font-semibold shadow-xs'
                      : isActive
                      ? 'text-white font-medium bg-white/10'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>

                {/* INDIVIDUAL MEGA-DROPDOWN ANCHORED EXACTLY UNDERNEATH EACH TAB (left-0 for all) */}
                {isHovered && hasDropdown && NAV_MENUS[item.view] && (
                  <div
                    className="absolute left-0 top-full z-50 bg-white rounded-b-lg rounded-tr-lg shadow-2xl border border-slate-200/90 py-5 px-6 animate-in fade-in slide-in-from-top-1 duration-100"
                    style={{
                      minWidth: NAV_MENUS[item.view].minWidth || '580px',
                      maxWidth: 'calc(100vw - 2rem)',
                      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.22), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
                    }}
                    onMouseEnter={() => handleMouseEnterNav(item.view)}
                    onMouseLeave={handleMouseLeaveNav}
                  >
                    <div className="flex flex-col gap-4">
                      <div
                        className="grid gap-8 text-xs"
                        style={{
                          gridTemplateColumns: `repeat(${NAV_MENUS[item.view].columns.length}, minmax(0, 1fr))`,
                        }}
                      >
                        {NAV_MENUS[item.view].columns.map((col, colIdx) => (
                          <div key={colIdx} className="space-y-5">
                            {col.map((section: NavSection, secIdx) => (
                              <div key={secIdx}>
                                <h4 className="text-[#07133b] font-bold text-xs uppercase tracking-wider mb-2.5">
                                  {section.title}
                                </h4>
                                <ul className="space-y-1.5">
                                  {section.items.map((subItem, itemIdx) => (
                                    <li key={itemIdx} className="flex items-center justify-between group">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setHoveredNav(null);
                                          onSelectNavSubItem(item.view, subItem.name, false);
                                        }}
                                        className="text-left text-slate-600 hover:text-[#008db9] transition-colors py-0.5 flex-1 pr-2 truncate cursor-pointer"
                                      >
                                        {subItem.name}
                                      </button>

                                      {subItem.hasPlus && (
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setHoveredNav(null);
                                            onSelectNavSubItem(item.view, subItem.name, true);
                                          }}
                                          title={`Crear nuevo en ${subItem.name}`}
                                          className="text-slate-400 hover:text-[#008db9] hover:bg-sky-50 p-1 rounded transition-colors cursor-pointer shrink-0"
                                        >
                                          <Plus className="w-3.5 h-3.5" />
                                        </button>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Optional footer link (like in Sueldos) */}
                      {NAV_MENUS[item.view].footerLink && (
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-start text-[11px]">
                          <button
                            type="button"
                            onClick={() => {
                              setHoveredNav(null);
                              onOpenHelpModal();
                            }}
                            className="text-slate-500 hover:text-[#008db9] flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <HelpIcon className="w-3.5 h-3.5" />
                            <span>{NAV_MENUS[item.view].footerLink?.text}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
