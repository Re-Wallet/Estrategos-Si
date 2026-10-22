import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Play, BookOpen, Layers } from 'lucide-react';

interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickGuideModal: React.FC<QuickGuideModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: '1. Configurá tu CUIT y Punto de Venta ARCA',
      desc: 'Ingresá al menú de Configuración ⚙️ > Mis Puntos de Venta y asociá tu certificado digital para facturación electrónica.',
    },
    {
      num: 2,
      title: '2. Creá tu primer Comprobante de Venta',
      desc: 'Desde la tarjeta "Comprobantes de Venta" hacé clic en "Nuevo". El sistema calculará el IVA automáticamente y solicitará el CAE.',
    },
    {
      num: 3,
      title: '3. Importá tus Clientes y Proveedores',
      desc: 'Cargá los datos de tus clientes para tener acceso rápido con un solo clic en la sección "Clientes destacados".',
    },
    {
      num: 4,
      title: '4. Generá Libros de IVA Digital y Balances',
      desc: 'En el menú superior navegá a "Impuestos" o "Contabilidad" para exportar los archivos de importación para ARCA.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        <div className="px-6 py-4 bg-[#07133b] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-300" />
            <h3 className="text-sm font-bold">Guía de Inicio Rápido Xubio</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600">
            Seguí estos 4 pasos para poner en marcha tu estudio o empresa en menos de 10 minutos:
          </p>

          <div className="space-y-3">
            {steps.map((s) => (
              <div
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all ${
                  step === s.num
                    ? 'border-[#008db9] bg-sky-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-900">{s.title}</h4>
                  {step === s.num && (
                    <span className="text-[10px] bg-[#008db9] text-white px-1.5 py-0.5 rounded font-medium">
                      Paso activo
                    </span>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">Paso {step} de 4</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded text-xs font-medium cursor-pointer"
              >
                Cerrar guía
              </button>
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev + 1)}
                  className="px-4 py-1.5 bg-[#008db9] hover:bg-[#007a9e] text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Siguiente paso</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-1.5 bg-[#10b981] hover:bg-emerald-600 text-white rounded text-xs font-semibold cursor-pointer"
                >
                  ¡Completado! Empezar a usar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
