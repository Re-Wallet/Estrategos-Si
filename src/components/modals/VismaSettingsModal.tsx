import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Smartphone, History, X, Check, Key } from 'lucide-react';

interface VismaSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VismaSettingsModal: React.FC<VismaSettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState<'security' | '2fa' | 'activity'>('security');
  
  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passSaved, setPassSaved] = useState(false);
  const [passError, setPassError] = useState('');

  // 2FA state
  const [twoFaEnabled, setTwoFaEnabled] = useState(user?.twoFactorEnabled ?? false);

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    if (!newPass || newPass.length < 6) {
      setPassError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (newPass !== confirmPass) {
      setPassError('Las contraseñas no coinciden');
      return;
    }
    setPassSaved(true);
    showToast('Contraseña actualizada en Visma Account');
    setTimeout(() => {
      setPassSaved(false);
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    }, 2000);
  };

  const handleToggle2FA = () => {
    const nextState = !twoFaEnabled;
    setTwoFaEnabled(nextState);
    updateUser({ twoFactorEnabled: nextState });
    showToast(nextState ? 'Autenticación en dos pasos activada' : 'Autenticación en dos pasos desactivada');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-[#07133b] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-400/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Visma Account Settings</h3>
              <p className="text-[11px] text-slate-300">Gestión de seguridad centralizada para {user?.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="border-b border-slate-200 px-6 flex items-center gap-6 text-xs font-semibold bg-slate-50">
          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#008db9] text-[#008db9]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Contraseña</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('2fa')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === '2fa'
                ? 'border-[#008db9] text-[#008db9]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Autenticación en 2 pasos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`py-3 flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'activity'
                ? 'border-[#008db9] text-[#008db9]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Historial de accesos</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6">
          {activeTab === 'security' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {passError && (
                <div className="p-2.5 rounded bg-red-50 text-red-700 text-xs border border-red-200">
                  {passError}
                </div>
              )}
              {passSaved && (
                <div className="p-2.5 rounded bg-emerald-50 text-emerald-700 text-xs border border-emerald-200 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Tu contraseña ha sido cambiada correctamente.</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Contraseña actual
                </label>
                <input
                  type="password"
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-[#008db9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Mínimo 8 caracteres, alfanumérico"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-[#008db9] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Confirmar nueva contraseña
                </label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repetir nueva contraseña"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-[#008db9] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md text-xs font-medium hover:bg-slate-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#008db9] hover:bg-[#007a9e] text-white rounded-md text-xs font-medium cursor-pointer"
                >
                  Guardar nueva contraseña
                </button>
              </div>
            </form>
          )}

          {activeTab === '2fa' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">
                    Verificación en dos pasos (2FA)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Protegé tu cuenta con un código temporal generado por Google Authenticator o enviado por SMS cada vez que inicies sesión.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleToggle2FA}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
                    twoFaEnabled
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {twoFaEnabled ? 'Activado ✓' : 'Desactivado'}
                </button>
              </div>

              <div className="text-xs text-slate-500 space-y-2 border-t border-slate-100 pt-3">
                <p className="font-semibold text-slate-700">Dispositivos vinculados autorizados:</p>
                <div className="flex items-center justify-between p-2.5 rounded bg-white border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-slate-500" />
                    <span>iPhone 15 Pro • Buenos Aires, Argentina</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium">Activo ahora</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-[#008db9] hover:bg-[#007a9e] text-white rounded-md text-xs font-medium cursor-pointer"
                >
                  Listo
                </button>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 mb-2">
                Últimos inicios de sesión registrados en tu cuenta:
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">Chrome (macOS) - Sesión Actual</div>
                    <div className="text-slate-500 text-[11px]">IP: 190.224.88.14 • Buenos Aires, Argentina</div>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">En línea</span>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">App Móvil Xubio (iOS)</div>
                    <div className="text-slate-500 text-[11px]">IP: 181.44.120.3 • Hace 2 días</div>
                  </div>
                  <span className="text-[11px] text-slate-500">Expirada</span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-md text-xs font-medium cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
