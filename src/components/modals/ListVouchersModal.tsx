import React, { useState } from 'react';
import { X, Search, FileDown, Plus, Filter } from 'lucide-react';
import { VoucherItem } from '../../types';

interface ListVouchersModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: 'venta' | 'compra';
  vouchers: VoucherItem[];
  onOpenNew: () => void;
}

export const ListVouchersModal: React.FC<ListVouchersModalProps> = ({
  isOpen,
  onClose,
  category,
  vouchers,
  onOpenNew,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = vouchers.filter(
    (v) =>
      v.category === category &&
      (v.clientOrSupplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.cuit.includes(searchTerm))
  );

  const totalSum = filtered.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#07133b] text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-sm font-bold">
              Comprobantes de {category === 'venta' ? 'Venta' : 'Compra'}
            </h3>
            <p className="text-[11px] text-slate-300">
              Listado general sincronizado con el Libro de IVA Digital
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

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por cliente, CUIT, comprobante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008db9]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenNew();
              }}
              className="bg-[#008db9] hover:bg-[#007a9e] text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Comprobante</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No se encontraron comprobantes registrados en este periodo.
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/50">
                  <th className="py-2.5 px-3 font-semibold">Fecha</th>
                  <th className="py-2.5 px-3 font-semibold">Tipo</th>
                  <th className="py-2.5 px-3 font-semibold">{category === 'venta' ? 'Cliente' : 'Proveedor'}</th>
                  <th className="py-2.5 px-3 font-semibold">CUIT</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Total ($)</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 text-slate-600">{item.date}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.type}</td>
                    <td className="py-2.5 px-3 text-slate-800">{item.clientOrSupplier}</td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{item.cuit}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      ${item.total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Summary */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-800 shrink-0">
          <span>Total ({filtered.length} comprobantes):</span>
          <span className="text-sm font-extrabold text-[#008db9]">
            ${totalSum.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};
