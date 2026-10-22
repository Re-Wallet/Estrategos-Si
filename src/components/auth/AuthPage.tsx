import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, User, Building, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { loginWithEmail, loginWithGoogle, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  
  // Login form state - starts EMPTY as requested
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state - starts EMPTY as requested
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regStudio, setRegStudio] = useState('');
  const [regPass, setRegPass] = useState('');
  const [showRegPass, setShowRegPass] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Recovery state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await loginWithEmail(loginEmail, loginPass);
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await register(regName, regEmail, regPass, regStudio);
    setLoading(false);
  };

  const handleGoogleSelect = async (email: string, name: string) => {
    setShowGoogleModal(false);
    setLoading(true);
    await loginWithGoogle(email, name);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main Centered Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: ONLY an image as requested */}
          <div className="lg:col-span-5 relative bg-slate-900 overflow-hidden min-h-[260px] lg:min-h-[580px]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
              alt="Xubio Oficina y Gestión Empresarial"
              className="w-full h-full object-cover object-center"
            />
            {/* Elegant dark gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07133b]/80 via-transparent to-[#07133b]/40" />
            
            {/* Subtle logo badge at the bottom of the image */}
            <div className="absolute bottom-6 left-6 right-6 text-white text-xs bg-[#07133b]/70 backdrop-blur-md p-3 rounded-lg border border-white/10 flex items-center justify-between">
              <div>
                <span className="font-bold text-sm tracking-tight block">xubio</span>
                <span className="text-[11px] text-slate-300">Una empresa del grupo Visma</span>
              </div>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 px-2 py-0.5 rounded">
                Seguridad SSL
              </span>
            </div>
          </div>

          {/* Right Column: Equal size, NO top navigation tabs (only switched via bottom links) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center min-h-[580px]">
            
            {/* MODE: LOGIN */}
            {mode === 'login' && (
              <div className="flex flex-col justify-between h-full py-2">
                <div>
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Ingresá a tu cuenta para administrar tu estudio o empresa
                    </p>
                  </div>

                  {/* Google Button */}
                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(true)}
                    className="w-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-xs text-sm cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continuar con Google</span>
                  </button>

                  <div className="relative my-6 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <span className="relative px-3 bg-white text-xs text-slate-400 uppercase tracking-wider">
                      o con correo electrónico
                    </span>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="tu-correo@empresa.com"
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008db9] focus:border-[#008db9] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                          Contraseña
                        </label>
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-xs text-[#008db9] hover:underline font-medium cursor-pointer"
                        >
                          ¿Olvidaste tu contraseña?
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showLoginPass ? 'text' : 'password'}
                          value={loginPass}
                          onChange={(e) => setLoginPass(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008db9] focus:border-[#008db9] transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPass(!showLoginPass)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="rounded border-slate-300 text-[#008db9] focus:ring-[#008db9] w-4 h-4 cursor-pointer"
                        />
                        <span>Recordar mis datos</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#008db9] hover:bg-[#007a9e] text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm"
                    >
                      {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Ingresar a Xubio</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Bottom link: switch only here */}
                <p className="pt-6 text-center text-xs text-slate-500 border-t border-slate-100">
                  ¿No tenés una cuenta en Xubio?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-[#008db9] font-bold hover:underline cursor-pointer"
                  >
                    Registrate gratis aquí
                  </button>
                </p>
              </div>
            )}

            {/* MODE: REGISTER */}
            {mode === 'register' && (
              <div className="flex flex-col justify-between h-full py-2">
                <div>
                  <div className="mb-4">
                    <h1 className="text-2xl font-bold text-slate-900">Crear cuenta gratis</h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Comenzá tu prueba sin costo por 14 días. Sin tarjeta de crédito.
                    </p>
                  </div>

                  {/* Google Register Button */}
                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(true)}
                    className="w-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors shadow-xs text-sm mb-4 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Registrarse con Google</span>
                  </button>

                  <div className="relative my-4 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <span className="relative px-3 bg-white text-xs text-slate-400 uppercase tracking-wider">
                      o con tus datos
                    </span>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Nombre y Apellido
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="Facundo Chavez"
                          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008db9] focus:border-[#008db9]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="facundochavez@gmail.com"
                          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008db9] focus:border-[#008db9]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Nombre del Estudio o Empresa
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Building className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={regStudio}
                          onChange={(e) => setRegStudio(e.target.value)}
                          placeholder="Estudio Contable Chavez"
                          className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008db9] focus:border-[#008db9]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Contraseña
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showRegPass ? 'text' : 'password'}
                          value={regPass}
                          onChange={(e) => setRegPass(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-9 pr-10 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008db9] focus:border-[#008db9]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPass(!showRegPass)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showRegPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-slate-600 pt-1">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="rounded border-slate-300 text-[#008db9] focus:ring-[#008db9] w-4 h-4 mt-0.5 cursor-pointer"
                      />
                      <label htmlFor="terms" className="cursor-pointer">
                        Acepto los <a href="#" className="text-[#008db9] underline">Términos del Servicio</a> y la{' '}
                        <a href="#" className="text-[#008db9] underline">Política de Privacidad</a> de Xubio.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#008db9] hover:bg-[#007a9e] text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm mt-2"
                    >
                      {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Crear cuenta y comenzar gratis</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Bottom link: switch only here */}
                <p className="pt-4 text-center text-xs text-slate-500 border-t border-slate-100">
                  ¿Ya tenés una cuenta en Xubio?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#008db9] font-bold hover:underline cursor-pointer"
                  >
                    Iniciá sesión aquí
                  </button>
                </p>
              </div>
            )}

            {/* MODE: FORGOT PASSWORD */}
            {mode === 'forgot' && (
              <div className="flex flex-col justify-between h-full py-2">
                <div>
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Recuperar contraseña</h1>
                    <p className="text-xs text-slate-500 mt-1">
                      Ingresá el correo asociado a tu cuenta de Xubio para recibir las instrucciones
                    </p>
                  </div>

                  {forgotSent ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs space-y-2">
                      <p className="font-semibold text-emerald-900">
                        ¡Correo de restablecimiento enviado!
                      </p>
                      <p>
                        Hemos enviado un enlace a <strong>{forgotEmail || 'tu casilla'}</strong>. Revisá tu bandeja de entrada.
                      </p>
                      <button
                        type="button"
                        onClick={() => { setMode('login'); setForgotSent(false); }}
                        className="mt-3 inline-block font-semibold text-[#008db9] hover:underline cursor-pointer"
                      >
                        ← Volver a inicio de sesión
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setForgotSent(true);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Correo Electrónico Registrado
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            placeholder="tu-correo@empresa.com"
                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008db9] focus:border-[#008db9]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#008db9] hover:bg-[#007a9e] text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition-all text-sm cursor-pointer"
                      >
                        Enviar enlace de recuperación
                      </button>
                    </form>
                  )}
                </div>

                <div className="text-center pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-xs text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                  >
                    ← Volver a Iniciar sesión
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      {/* Google Simulated Account Selector Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Iniciar sesión con Google</h3>
                <p className="text-xs text-slate-500">Seleccioná una cuenta para ingresar a Xubio</p>
              </div>
            </div>

            <div className="space-y-2 border-t border-b border-slate-100 py-3 my-3">
              <button
                type="button"
                onClick={() => handleGoogleSelect('facundochavez@gmail.com', 'Facundo Chavez')}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                  F
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900 truncate">Facundo Chavez</div>
                  <div className="text-[11px] text-slate-500 truncate">facundochavez@gmail.com</div>
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">Predeterminada</span>
              </button>

              <button
                type="button"
                onClick={() => handleGoogleSelect('estudio.chavez@gmail.com', 'Estudio Contable Chavez')}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                  E
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900 truncate">Estudio Contable Chavez</div>
                  <div className="text-[11px] text-slate-500 truncate">estudio.chavez@gmail.com</div>
                </div>
              </button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowGoogleModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
