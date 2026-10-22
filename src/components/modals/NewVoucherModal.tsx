import React, { useState } from 'react';
import { X, CheckCircle, Calculator } from 'lucide-react';
import { VoucherItem } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface NewVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: 'venta' | 'compra';
  onSaveVoucher: (voucher: VoucherItem) => void;
}

export const NewVoucherModal: React.FC<NewVoucherModalProps> = ({
  isOpen,
  onClose,
  category,
  onSaveVoucher,
}) => {
  const { showToast } = useAuth();
  const [voucherType, setVoucherType] = useState<'Factura A' | 'Factura B' | 'Factura C' | 'Nota de Crédito'>('Factura A');
  const [entityName, setEntityName] = useState('');
  const [cuit, setCuit] = useState('30-71458921-9');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [netAmount, setNetAmount] = useState('100000');
  const [ivaRate, setIvaRate] = useState('21');

  if (!isOpen) return null;

  const net = parseFloat(netAmount) || 0;
  const iva = (net * parseFloat(ivaRate)) / 100;
  const total = net + iva;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entityName.trim()) {
      return;
    }

    const newV: VoucherItem = {
      id: 'vch_' + Date.now(),
      type: voucherType,
      date,
      clientOrSupplier: entityName.trim(),
      cuit,
      total,
      status: 'Aprobado',
      category,
    };

    onSaveVoucher(newV);
    showToast(`Comprobante de ${category === 'venta' ? 'Venta' : 'Compra'} emitido con éxito con CAE ARCA.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-[#07133b] text-white flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">
              Nuevo Comprobante de {category === 'venta' ? 'Venta' : 'Compra'}
            </h3>
            <p className="text-[11px] text-slate-300">Emisión electrónica conectada con AFIP / ARCA</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo de Comprobante
              </label>
              <select
                value={voucherType}
                onChange={(e) => setVoucherType(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#008db9]"
              >
                <option value="Factura A">Factura A</option>
                <option value="Factura B">Factura B</option>
                <option value="Factura C">Factura C</option>
                <option value="Nota de Crédito">Nota de Crédito</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Fecha de Emisión
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#008db9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {category === 'venta' ? 'Cliente' : 'Proveedor'}
              </label>
              <input
                type="text"
                required
                placeholder={category === 'venta' ? 'ej. Distribuidora Sur S.A.' : 'ej. Proveedora Industrial SRL'}
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#008db9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CUIT / Identificación
              </label>
              <input
                type="text"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#008db9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Importe Neto ($)
              </label>
              <input
                type="number"
                step="any"
                min="0"
                value={netAmount}
                onChange={(e) => setNetAmount(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#008db9]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alícuota IVA
              </label>
              <select
                value={ivaRate}
                onChange={(e) => setIvaRate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#008db9]"
              >
                <option value="21">21% (General)</option>
                <option value="10.5">10.5% (Diferencial)</option>
                <option value="27">27% (Servicios)</option>
                <option value="0">0% (Exento)</option>
              </select>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal Neto:</span>
              <span>${net.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>IVA ({ivaRate}%):</span>
              <span>${iva.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1 text-sm">
              <span>Total Comprobante:</span>
              <span className="text-[#008db9]">${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md text-xs font-medium hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#008db9] hover:bg-[#007a9e] text-white rounded-md text-xs font-semibold cursor-pointer shadow-xs"
            >
              Emitir comprobante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
