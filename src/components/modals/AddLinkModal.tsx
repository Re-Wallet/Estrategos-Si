import React, { useState } from 'react';
import { X, Link as LinkIcon, Plus } from 'lucide-react';
import { QuickLink } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface AddLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLink: (link: QuickLink) => void;
}

export const AddLinkModal: React.FC<AddLinkModalProps> = ({ isOpen, onClose, onAddLink }) => {
  const { showToast } = useAuth();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  if (!isOpen) return null;

  const presets = [
    { title: 'ARBA - Provincia de Bs As', url: 'https://www.arba.gov.ar/' },
    { title: 'AGIP - CABA Rentas', url: 'https://www.agip.gob.ar/' },
    { title: 'Banco Nación BNA', url: 'https://www.bna.com.ar/' },
    { title: 'Boletín Oficial de la República Argentina', url: 'https://www.boletinoficial.gob.ar/' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    onAddLink({
      id: 'lnk_' + Date.now(),
      title: title.trim(),
      url: formattedUrl,
    });
    showToast(`Enlace "${title}" añadido a Links de accesos`);
    setTitle('');
    setUrl('');
    onClose();
  };

  const handleApplyPreset = (p: { title: string; url: string }) => {
    setTitle(p.title);
    setUrl(p.url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 bg-[#07133b] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-cyan-300" />
            <h3 className="text-sm font-bold">Agregar Link de Acceso</h3>
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
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nombre o Sigla
            </label>
            <input
              type="text"
              required
              placeholder="ej. Rentas AGIP / Portal AFIP"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#008db9]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dirección URL
            </label>
            <input
              type="text"
              required
              placeholder="https://www.agip.gob.ar"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#008db9]"
            />
          </div>

          {/* Quick presets */}
          <div>
            <p className="text-[11px] font-semibold text-slate-500 mb-1.5 uppercase">Accesos sugeridos:</p>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="text-[11px] bg-slate-100 hover:bg-sky-50 hover:text-[#008db9] border border-slate-200 px-2 py-1 rounded transition-colors text-slate-700 text-left"
                >
                  + {p.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
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
              Guardar enlace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
