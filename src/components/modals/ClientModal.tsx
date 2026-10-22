import React, { useState } from 'react';
import { X, Search, Check, Star, Plus } from 'lucide-react';
import { ClientItem } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  clients: ClientItem[];
  onToggleFeatured: (clientId: string) => void;
  onAddClient: (client: ClientItem) => void;
  isSelectionMode?: boolean;
}

export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  title,
  clients,
  onToggleFeatured,
  onAddClient,
  isSelectionMode = false,
}) => {
  const { showToast } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCuit, setNewCuit] = useState('');
  const [newCondition, setNewCondition] = useState('Responsable Inscripto');

  if (!isOpen) return null;

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cuit.includes(searchTerm)
  );

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCuit.trim()) return;

    const newC: ClientItem = {
      id: 'cli_' + Date.now(),
      name: newName.trim(),
      cuit: newCuit.trim(),
      condition: newCondition,
      featured: true,
    };
    onAddClient(newC);
    setNewName('');
    setNewCuit('');
    setShowAddForm(false);
    showToast(`Cliente "${newC.name}" agregado con éxito`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#07133b] text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="text-[11px] text-slate-300">
              {isSelectionMode
                ? 'Marcá los clientes que querés ver en tu panel de accesos rápidos'
                : 'Administración de padrón y cuentas corrientes'}
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
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por razón social o CUIT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#008db9]"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#008db9] hover:bg-[#007a9e] text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo</span>
          </button>
        </div>

        {/* Add Form Accordion */}
        {showAddForm && (
          <form onSubmit={handleAddNew} className="p-4 bg-sky-50 border-b border-sky-100 grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0 text-xs">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Razón Social</label>
              <input
                type="text"
                required
                placeholder="ej. Logística del Plata S.A."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">CUIT</label>
              <input
                type="text"
                required
                placeholder="30-XXXXXXXX-X"
                value={newCuit}
                onChange={(e) => setNewCuit(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="flex-1 bg-[#008db9] text-white py-1.5 px-3 rounded font-semibold hover:bg-[#007a9e] cursor-pointer"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-2 py-1.5 border border-slate-300 text-slate-600 rounded hover:bg-slate-100 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* List */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              No se encontraron registros.
            </div>
          ) : (
            filtered.map((client) => (
              <div
                key={client.id}
                className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg transition-colors"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900">{client.name}</div>
                  <div className="text-[11px] text-slate-500">
                    CUIT: {client.cuit} • <span className="text-slate-600">{client.condition}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleFeatured(client.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    client.featured
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${client.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span>{client.featured ? 'Destacado' : 'Destacar'}</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#008db9] hover:bg-[#007a9e] text-white rounded-md text-xs font-semibold cursor-pointer"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
