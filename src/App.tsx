import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './components/auth/AuthPage';
import { Header } from './components/dashboard/Header';
import { InicioView } from './components/dashboard/InicioView';
import { PerfilView } from './components/dashboard/PerfilView';
import { SectionPlaceholderView } from './components/dashboard/SectionPlaceholderView';
import {
  ComprobantesVentaView,
  PresupuestosView,
  RemitosVentaView,
  CobranzasView,
  IngresosFondosView,
  AbonosView,
  ClientesView,
  ProductosVentaView,
  VendedoresView,
  ListasPreciosView,
} from './components/ventas/VentasViews';
import { VismaSettingsModal } from './components/modals/VismaSettingsModal';
import { PlanModal } from './components/modals/PlanModal';
import { QuickGuideModal } from './components/modals/QuickGuideModal';
import { NewVoucherModal } from './components/modals/NewVoucherModal';
import { ListVouchersModal } from './components/modals/ListVouchersModal';
import { ClientModal } from './components/modals/ClientModal';
import { AddLinkModal } from './components/modals/AddLinkModal';
import { SettingsDetailModal } from './components/modals/SettingsDetailModal';
import { ActiveView, QuickLink, ClientItem, VoucherItem } from './types';
import { CheckCircle2 } from 'lucide-react';

const INITIAL_QUICK_LINKS: QuickLink[] = [
  {
    id: 'lnk_arca',
    url: 'https://www.afip.gob.ar/',
    title: 'ARCA',
    description: 'Agencia de Recaudación y Control Aduanero (ex AFIP)',
  },
];

const INITIAL_CLIENTS: ClientItem[] = [
  {
    id: 'cli_1',
    name: 'Distribuidora Central S.A.',
    cuit: '30-71124589-4',
    condition: 'Responsable Inscripto',
    featured: true,
  },
  {
    id: 'cli_2',
    name: 'Consultores Andinos SRL',
    cuit: '30-68945123-2',
    condition: 'Responsable Inscripto',
    featured: true,
  },
  {
    id: 'cli_3',
    name: 'Matias Rodriguez (Desarrollo)',
    cuit: '20-38491204-5',
    condition: 'Monotributo Cat. H',
    featured: false,
  },
  {
    id: 'cli_4',
    name: 'Agropecuaria El Ombú S.A.',
    cuit: '30-55412894-9',
    condition: 'Responsable Inscripto',
    featured: false,
  },
];

const INITIAL_PROVIDERS: ClientItem[] = [
  {
    id: 'prv_1',
    name: 'Telecom Argentina S.A.',
    cuit: '30-63945373-8',
    condition: 'Gran Contribuyente',
    featured: true,
  },
  {
    id: 'prv_2',
    name: 'Edenor S.A.',
    cuit: '30-65511620-2',
    condition: 'Servicios Públicos',
    featured: false,
  },
  {
    id: 'prv_3',
    name: 'Librería & Papelería Belgrano',
    cuit: '27-24891044-6',
    condition: 'Responsable Inscripto',
    featured: false,
  },
];

const INITIAL_VOUCHERS: VoucherItem[] = [
  {
    id: 'v_1',
    type: 'Factura A',
    date: '2026-10-20',
    clientOrSupplier: 'Distribuidora Central S.A.',
    cuit: '30-71124589-4',
    total: 350000,
    status: 'Aprobado',
    category: 'venta',
  },
  {
    id: 'v_2',
    type: 'Factura B',
    date: '2026-10-18',
    clientOrSupplier: 'Matias Rodriguez',
    cuit: '20-38491204-5',
    total: 120000,
    status: 'Aprobado',
    category: 'venta',
  },
  {
    id: 'v_3',
    type: 'Factura A',
    date: '2026-10-19',
    clientOrSupplier: 'Telecom Argentina S.A.',
    cuit: '30-63945373-8',
    total: 84500,
    status: 'Aprobado',
    category: 'compra',
  },
  {
    id: 'v_4',
    type: 'Factura A',
    date: '2026-10-15',
    clientOrSupplier: 'Edenor S.A.',
    cuit: '30-65511620-2',
    total: 42300,
    status: 'Aprobado',
    category: 'compra',
  },
];

function DashboardApp() {
  const { user, isAuthenticated, toast } = useAuth();
  const [currentView, setCurrentView] = useState<ActiveView>('inicio');
  const [ventasSubView, setVentasSubView] = useState<string>('comprobantes_venta');

  // Modals visibility
  const [isVismaModalOpen, setIsVismaModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isNewVoucherOpen, setIsNewVoucherOpen] = useState(false);
  const [voucherModalCategory, setVoucherModalCategory] = useState<'venta' | 'compra'>('venta');
  const [isListVouchersOpen, setIsListVouchersOpen] = useState(false);
  const [listVouchersCategory, setListVouchersCategory] = useState<'venta' | 'compra'>('venta');
  
  // Clients / Providers modals
  const [isClientsModalOpen, setIsClientsModalOpen] = useState(false);
  const [isProvidersModalOpen, setIsProvidersModalOpen] = useState(false);
  const [isClientSelectorOpen, setIsClientSelectorOpen] = useState(false);
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);

  // Settings dropdown detail modal
  const [selectedSetting, setSelectedSetting] = useState<{ title: string; category: string } | null>(null);

  // Dynamic Dashboard Data state
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>(INITIAL_QUICK_LINKS);
  const [clients, setClients] = useState<ClientItem[]>(INITIAL_CLIENTS);
  const [providers, setProviders] = useState<ClientItem[]>(INITIAL_PROVIDERS);
  const [vouchers, setVouchers] = useState<VoucherItem[]>(INITIAL_VOUCHERS);

  // If not authenticated, render Login / Register view
  if (!isAuthenticated) {
    return <AuthPage initialMode="login" />;
  }

  // Handlers
  const handleOpenNewVoucher = (category: 'venta' | 'compra') => {
    setVoucherModalCategory(category);
    setIsNewVoucherOpen(true);
  };

  const handleOpenViewVouchers = (category: 'venta' | 'compra') => {
    setListVouchersCategory(category);
    setIsListVouchersOpen(true);
  };

  const handleSaveVoucher = (newV: VoucherItem) => {
    setVouchers((prev) => [newV, ...prev]);
  };

  const handleToggleFeaturedClient = (clientId: string) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, featured: !c.featured } : c))
    );
  };

  const handleAddClient = (newC: ClientItem) => {
    setClients((prev) => [newC, ...prev]);
  };

  const handleAddLink = (newLink: QuickLink) => {
    setQuickLinks((prev) => [...prev, newLink]);
  };

  const handleOpenSettingsOption = (title: string, category: string) => {
    setSelectedSetting({ title, category });
  };

  const handleSelectNavSubItem = (section: string, item: string) => {
    if (section === 'ventas') {
      setCurrentView('ventas');
      if (item === 'Comprobantes de Venta') setVentasSubView('comprobantes_venta');
      else if (item === 'Presupuestos') setVentasSubView('presupuestos');
      else if (item === 'Remitos') setVentasSubView('remitos_venta');
      else if (item === 'Cobranzas') setVentasSubView('cobranzas');
      else if (item === 'Ingresos de Fondos') setVentasSubView('ingresos_fondos');
      else if (item === 'Abonos') setVentasSubView('abonos');
      else if (item === 'Clientes') setVentasSubView('clientes');
      else if (item === 'Productos de Venta') setVentasSubView('productos_venta');
      else if (item === 'Vendedores') setVentasSubView('vendedores');
      else if (item === 'Listas de Precios') setVentasSubView('listas_precios');
      return;
    }
  };

  const featuredClients = clients.filter((c) => c.featured);

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col justify-between selection:bg-[#008db9]/20 selection:text-[#008db9]">
      {/* 1. Header (Shared across all logged in pages) */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'ventas') {
            setVentasSubView('comprobantes_venta');
          }
        }}
        onOpenSettingsOption={handleOpenSettingsOption}
        onOpenHelpModal={() => setIsGuideModalOpen(true)}
        onSelectNavSubItem={handleSelectNavSubItem}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1">
        {currentView === 'inicio' && (
          <InicioView
            onOpenNewVoucher={handleOpenNewVoucher}
            onOpenViewVouchers={handleOpenViewVouchers}
            onOpenClients={() => setIsClientsModalOpen(true)}
            onOpenProviders={() => setIsProvidersModalOpen(true)}
            onOpenClientSelector={() => setIsClientSelectorOpen(true)}
            onOpenAddLink={() => setIsAddLinkOpen(true)}
            quickLinks={quickLinks}
            featuredClients={featuredClients}
          />
        )}

        {currentView === 'perfil' && (
          <PerfilView
            onOpenVismaSettings={() => setIsVismaModalOpen(true)}
            onOpenHelp={() => setIsGuideModalOpen(true)}
          />
        )}

        {/* Ventas Module with exact layouts for all 10 options */}
        {currentView === 'ventas' && (
          <>
            {ventasSubView === 'comprobantes_venta' && <ComprobantesVentaView />}
            {ventasSubView === 'presupuestos' && <PresupuestosView />}
            {ventasSubView === 'remitos_venta' && <RemitosVentaView />}
            {ventasSubView === 'cobranzas' && <CobranzasView />}
            {ventasSubView === 'ingresos_fondos' && <IngresosFondosView />}
            {ventasSubView === 'abonos' && <AbonosView />}
            {ventasSubView === 'clientes' && <ClientesView />}
            {ventasSubView === 'productos_venta' && <ProductosVentaView />}
            {ventasSubView === 'vendedores' && <VendedoresView />}
            {ventasSubView === 'listas_precios' && <ListasPreciosView />}
          </>
        )}

        {/* Other modules (clean blank area ready for upcoming development) */}
        {currentView !== 'inicio' && currentView !== 'perfil' && currentView !== 'ventas' && (
          <SectionPlaceholderView
            view={currentView}
            onNavigateHome={() => setCurrentView('inicio')}
          />
        )}
      </main>

      {/* 3. Subtle Footer */}
      <footer className="border-t border-slate-200 bg-white py-3 px-6 text-center text-[11px] text-slate-500">
        <div className="flex flex-wrap items-center justify-between gap-2 max-w-7xl mx-auto">
          <span>Xubio Argentina • Empresa certificada Visma Group • Soporte: soporte@xubio.com</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentView('inicio')}
              className={`hover:text-slate-900 cursor-pointer ${currentView === 'inicio' ? 'font-bold text-[#008db9]' : ''}`}
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('perfil')}
              className={`hover:text-slate-900 cursor-pointer ${currentView === 'perfil' ? 'font-bold text-[#008db9]' : ''}`}
            >
              Mi Perfil
            </button>
            <button
              type="button"
              onClick={() => setIsPlanModalOpen(true)}
              className="text-[#008db9] font-semibold hover:underline cursor-pointer"
            >
              Planes y Suscripción
            </button>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Visma Account Settings Modal */}
      <VismaSettingsModal
        isOpen={isVismaModalOpen}
        onClose={() => setIsVismaModalOpen(false)}
      />

      {/* 2. Contratar Plan Modal */}
      <PlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
      />

      {/* 3. Quick Guide Modal */}
      <QuickGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* 4. New Voucher Modal */}
      <NewVoucherModal
        isOpen={isNewVoucherOpen}
        onClose={() => setIsNewVoucherOpen(false)}
        category={voucherModalCategory}
        onSaveVoucher={handleSaveVoucher}
      />

      {/* 5. List Vouchers Modal */}
      <ListVouchersModal
        isOpen={isListVouchersOpen}
        onClose={() => setIsListVouchersOpen(false)}
        category={listVouchersCategory}
        vouchers={vouchers}
        onOpenNew={() => handleOpenNewVoucher(listVouchersCategory)}
      />

      {/* 6. Clients Modal */}
      <ClientModal
        isOpen={isClientsModalOpen}
        onClose={() => setIsClientsModalOpen(false)}
        title="Padrón de Clientes"
        clients={clients}
        onToggleFeatured={handleToggleFeaturedClient}
        onAddClient={handleAddClient}
      />

      {/* 7. Providers Modal */}
      <ClientModal
        isOpen={isProvidersModalOpen}
        onClose={() => setIsProvidersModalOpen(false)}
        title="Padrón de Proveedores"
        clients={providers}
        onToggleFeatured={() => {}}
        onAddClient={(newP) => setProviders((prev) => [newP, ...prev])}
      />

      {/* 8. Featured Clients Selector Modal */}
      <ClientModal
        isOpen={isClientSelectorOpen}
        onClose={() => setIsClientSelectorOpen(false)}
        title="Elegir clientes destacados para tu estudio"
        clients={clients}
        onToggleFeatured={handleToggleFeaturedClient}
        onAddClient={handleAddClient}
        isSelectionMode={true}
      />

      {/* 9. Add Link Modal */}
      <AddLinkModal
        isOpen={isAddLinkOpen}
        onClose={() => setIsAddLinkOpen(false)}
        onAddLink={handleAddLink}
      />

      {/* 10. Settings Dropdown Details Modal (Image 3) */}
      <SettingsDetailModal
        isOpen={!!selectedSetting}
        onClose={() => setSelectedSetting(null)}
        optionTitle={selectedSetting?.title || null}
        category={selectedSetting?.category || null}
      />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#07133b] text-white px-4 py-3 rounded-lg shadow-xl border border-white/20 flex items-center gap-3 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <DashboardApp />
    </AuthProvider>
  );
}
