import React, { useRef, useEffect } from 'react';

interface SettingsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (optionTitle: string, category: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  isOpen,
  onClose,
  onSelectOption,
  onMouseEnter,
  onMouseLeave,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute right-0 top-full mt-1.5 z-50 w-[780px] max-w-[95vw] bg-white rounded-lg shadow-2xl border border-slate-200/90 py-6 px-8 animate-in fade-in slide-in-from-top-1 duration-150"
      style={{
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.22), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Column 1: Mi Cuenta */}
        <div>
          <h3 className="text-[#07133b] font-bold text-base mb-4 tracking-tight">
            Mi Cuenta
          </h3>
          <ul className="space-y-3">
            {[
              { label: 'Mi Estudio', id: 'mi-estudio' },
              { label: 'Mis Puntos de Venta', id: 'puntos-de-venta' },
              { label: 'Mis Sucursales', id: 'sucursales' },
              { label: 'Categorias Ajustables por Inflacion', id: 'inflacion' },
              { label: 'Mis Clientes', id: 'mis-clientes' },
              { label: 'Usuarios de mi Estudio', id: 'usuarios' },
              { label: 'Permisos por Usuario', id: 'permisos', badge: 'Renovado' },
              { label: 'Mi Plan en Xubio', id: 'mi-plan' },
              { label: 'Mis Pagos a Xubio', id: 'mis-pagos' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectOption(item.label, 'Mi Cuenta');
                    onClose();
                  }}
                  className="w-full text-left text-slate-600 hover:text-[#008db9] transition-colors py-0.5 flex items-center justify-between group cursor-pointer"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="text-[11px] font-medium text-blue-600 border border-blue-500 rounded-md px-1.5 py-0.5 leading-none">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Funcionalidades */}
        <div>
          <h3 className="text-[#07133b] font-bold text-base mb-4 tracking-tight">
            Funcionalidades
          </h3>
          <ul className="space-y-3">
            {[
              { label: 'Plantillas de Observaciones', id: 'plantillas-observaciones' },
              { label: 'Plantillas de Mails', id: 'plantillas-mails' },
              { label: 'Avisos de Vencimiento', id: 'avisos-vencimiento' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectOption(item.label, 'Funcionalidades');
                    onClose();
                  }}
                  className="w-full text-left text-slate-600 hover:text-[#008db9] transition-colors py-0.5 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Integraciones */}
        <div>
          <h3 className="text-[#07133b] font-bold text-base mb-4 tracking-tight">
            Integraciones
          </h3>
          <ul className="space-y-3">
            {[
              { label: 'API de Xubio', id: 'api-xubio' },
              { label: 'Integraciones de Xubio', id: 'integraciones-xubio' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectOption(item.label, 'Integraciones');
                    onClose();
                  }}
                  className="w-full text-left text-slate-600 hover:text-[#008db9] transition-colors py-0.5 group cursor-pointer"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
