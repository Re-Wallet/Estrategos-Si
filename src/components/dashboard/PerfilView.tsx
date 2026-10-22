import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Check } from 'lucide-react';

interface PerfilViewProps {
  onOpenVismaSettings: () => void;
  onOpenHelp: () => void;
}

export const PerfilView: React.FC<PerfilViewProps> = ({
  onOpenVismaSettings,
  onOpenHelp,
}) => {
  const { user, updateUser, showToast } = useAuth();
  const [nombre, setNombre] = useState(user?.name || 'Facundo Chavez');
  const [email, setEmail] = useState(user?.email || 'facundochavez@gmail.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setNombre(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!nombre.trim() || !email.trim()) return;
    updateUser({
      name: nombre.trim(),
      email: email.trim().toUpperCase(),
      studioName: user?.studioName === user?.name ? nombre.trim() : user?.studioName || nombre.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="w-full pb-16">
      {/* Page Title Subheader */}
      <div className="border-b border-slate-200 bg-white px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-normal text-slate-800 tracking-tight">
          Mi Perfil
        </h1>
        <button
          type="button"
          onClick={onOpenHelp}
          className="text-xs sm:text-sm text-[#008db9] hover:underline font-medium cursor-pointer"
        >
          Ver ayuda
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Main Card matching Image 2 */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-6 sm:p-8">
          
          {/* Section: Mis datos */}
          <div className="mb-6">
            <h2 className="text-xl font-medium text-slate-800 mb-6">
              Mis datos
            </h2>

            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Outlined input with notch label for Nombre */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-slate-500 font-normal">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    onBlur={() => handleSave()}
                    className="w-full px-3.5 py-3 border border-slate-300 rounded-md text-sm text-slate-800 focus:outline-none focus:border-[#008db9] focus:ring-1 focus:ring-[#008db9] bg-white transition-colors"
                  />
                </div>

                {/* Outlined input with notch label for Email */}
                <div className="relative">
                  <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-slate-500 font-normal">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => handleSave()}
                    className="w-full px-3.5 py-3 border border-slate-300 rounded-md text-sm text-slate-800 uppercase focus:outline-none focus:border-[#008db9] focus:ring-1 focus:ring-[#008db9] bg-white transition-colors"
                  />
                </div>

              </div>

              {savedSuccess && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <Check className="w-4 h-4" />
                  <span>Datos actualizados correctamente</span>
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
