import React, { useState } from 'react';
import { X, Check, Shield, Key, Building2, Store, Users, FileText, Send, BellRing, Code, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SettingsDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  optionTitle: string | null;
  category: string | null;
}

export const SettingsDetailModal: React.FC<SettingsDetailModalProps> = ({
  isOpen,
  onClose,
  optionTitle,
  category,
}) => {
  const { user, showToast } = useAuth();
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  if (!isOpen || !optionTitle) return null;

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('xub_live_89f0293cb9128aa774e120d912');
    setApiKeyCopied(true);
    showToast('API Key de Xubio copiada al portapapeles');
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#07133b] text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">
                {category}
              </span>
              <span className="text-slate-400">•</span>
              <h3 className="text-sm font-bold">{optionTitle}</h3>
            </div>
            <p className="text-[11px] text-slate-300">
              Configuración y parámetros para tu estudio contable
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on selected option */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 flex-1">
          {optionTitle === 'Mi Estudio' && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                <Building2 className="w-6 h-6 text-[#008db9]" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{user?.studioName || 'Estudio Facundo Chavez'}</h4>
                  <p className="text-slate-500">Padrón de Estudio Contable Certificado Xubio</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Nombre Comercial</label>
                  <input
                    type="text"
                    defaultValue={user?.studioName || 'Estudio Facundo Chavez'}
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">CUIT del Estudio</label>
                  <input
                    type="text"
                    defaultValue="20-33490812-7"
                    className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {optionTitle === 'Mis Puntos de Venta' && (
            <div className="space-y-3">
              <p className="text-slate-600">Puntos de venta habilitados para Facturación Electrónica AFIP/ARCA:</p>
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">PV 0001 - Principal Web Service</span>
                    <p className="text-slate-500 text-[11px]">Tipo: Facturación Electrónica en Línea (WSFEv1)</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Activo</span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">PV 0002 - Factura Electrónica MiPyME</span>
                    <p className="text-slate-500 text-[11px]">Tipo: Crédito Electrónico MiPyMEs FCE</p>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Activo</span>
                </div>
              </div>
            </div>
          )}

          {optionTitle === 'Permisos por Usuario' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-900 flex items-center gap-2">
                <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.5 rounded">Renovado</span>
                <span>Nuevo esquema de roles granulares por módulos (Ventas, Sueldos, Finanzas).</span>
              </div>
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{user?.name} (Vos)</span>
                    <p className="text-slate-500 text-[11px]">{user?.email}</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">Super Administrador</span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">Laura Benítez</span>
                    <p className="text-slate-500 text-[11px]">l.benitez@estudiochavez.com.ar</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">Operador Contable</span>
                </div>
              </div>
            </div>
          )}

          {optionTitle === 'API de Xubio' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                Utilizá la API REST de Xubio para sincronizar comprobantes, cobros y clientes con plataformas de comercio electrónico, Mercado Libre, Tiendanube o tu ERP.
              </p>
              <div className="p-3 bg-slate-900 text-cyan-300 rounded font-mono text-[11px] flex items-center justify-between">
                <span>xub_live_89f0293cb9128aa774e120d912</span>
                <button
                  type="button"
                  onClick={handleCopyApiKey}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-2 py-1 rounded text-[10px] font-sans font-semibold cursor-pointer"
                >
                  {apiKeyCopied ? '¡Copiado!' : 'Copiar Token'}
                </button>
              </div>
            </div>
          )}

          {optionTitle !== 'Mi Estudio' && optionTitle !== 'Mis Puntos de Venta' && optionTitle !== 'Permisos por Usuario' && optionTitle !== 'API de Xubio' && (
            <div className="space-y-3">
              <p className="text-slate-600">
                Gestioná aquí todas las configuraciones correspondientes a <strong>{optionTitle}</strong>.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
                <p className="font-semibold mb-1">Módulo listo para producción</p>
                <p className="text-slate-500 text-[11px]">
                  Todos los cambios realizados en esta sección se sincronizan en tiempo real con el plan {user?.studioName}.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-white rounded-md text-xs font-medium cursor-pointer"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={() => {
              showToast(`Configuración de "${optionTitle}" guardada`);
              onClose();
            }}
            className="px-4 py-2 bg-[#008db9] hover:bg-[#007a9e] text-white rounded-md text-xs font-semibold cursor-pointer"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
};
