import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useAuth();
  if (!isOpen) return null;

  const handleSelectPlan = (planName: string) => {
    showToast(`Plan ${planName} seleccionado. ¡Tu descuento del 50% ha sido aplicado!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-gradient-to-r from-[#07133b] to-[#008db9] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                50% OFF Especial
              </span>
              <h3 className="text-base font-bold">Elegí tu Plan Xubio</h3>
            </div>
            <p className="text-xs text-cyan-100 mt-0.5">
              Accedé a la suscripción con descuento exclusivo antes del fin de tu periodo de prueba.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Plan 1 */}
            <div className="border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-[#008db9] hover:shadow-md transition-all">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Emprendedor</h4>
                <p className="text-xs text-slate-500 mt-1">Para monotributistas y profesionales independientes</p>
                <div className="mt-3">
                  <span className="text-xs line-through text-slate-400">$34.000</span>
                  <div className="text-xl font-extrabold text-[#07133b]">$17.000<span className="text-xs font-normal text-slate-500"> /mes</span></div>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Facturación ilimitada AFIP/ARCA</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> 1 usuario administrador</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Reportes de ventas y compras</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleSelectPlan('Emprendedor')}
                className="mt-5 w-full border border-[#07133b] hover:bg-[#07133b] hover:text-white text-[#07133b] py-2 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Elegir plan
              </button>
            </div>

            {/* Plan 2: Estudio Contable (Destacado) */}
            <div className="border-2 border-[#008db9] rounded-lg p-4 flex flex-col justify-between relative shadow-sm bg-sky-50/20">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#008db9] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">
                Más Elegido
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Estudio Contable</h4>
                <p className="text-xs text-slate-500 mt-1">Multi-empresa y gestión integral de clientes</p>
                <div className="mt-3">
                  <span className="text-xs line-through text-slate-400">$84.000</span>
                  <div className="text-xl font-extrabold text-[#008db9]">$42.000<span className="text-xs font-normal text-slate-500"> /mes</span></div>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Multi-empresa (hasta 50 clientes)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Liquidación de Sueldos y F931</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Libros de IVA Digital y Contabilidad</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Soporte prioritario Visma</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleSelectPlan('Estudio Contable')}
                className="mt-5 w-full bg-[#008db9] hover:bg-[#007a9e] text-white py-2 rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Contratar con 50% OFF
              </button>
            </div>

            {/* Plan 3 */}
            <div className="border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-[#008db9] hover:shadow-md transition-all">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Empresas & Pymes</h4>
                <p className="text-xs text-slate-500 mt-1">Para medianas y grandes empresas con stock</p>
                <div className="mt-3">
                  <span className="text-xs line-through text-slate-400">$130.000</span>
                  <div className="text-xl font-extrabold text-[#07133b]">$65.000<span className="text-xs font-normal text-slate-500"> /mes</span></div>
                </div>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Usuarios ilimitados con roles</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Múltiples depósitos e inventario</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> API de integración ERP & e-commerce</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => handleSelectPlan('Empresas')}
                className="mt-5 w-full border border-[#07133b] hover:bg-[#07133b] hover:text-white text-[#07133b] py-2 rounded text-xs font-semibold transition-colors cursor-pointer"
              >
                Elegir plan
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Pagos procesados de forma segura con tarjeta de crédito o débito automático.</span>
            <button
              type="button"
              onClick={onClose}
              className="font-medium text-slate-600 hover:text-slate-900"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
