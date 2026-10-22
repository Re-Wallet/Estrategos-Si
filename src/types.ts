export interface User {
  id: string;
  name: string;
  email: string;
  studioName: string;
  trialDaysLeft: number;
  phone?: string;
  avatarUrl?: string;
  twoFactorEnabled?: boolean;
}

export type ActiveView = 
  | 'inicio' 
  | 'perfil' 
  | 'reportes' 
  | 'ventas' 
  | 'compras' 
  | 'finanzas' 
  | 'inventarios' 
  | 'impuestos' 
  | 'contabilidad' 
  | 'sueldos' 
  | 'gestor_tareas';

export type SubTab = 'accesos_rapidos' | 'e_ventanilla';

export interface QuickLink {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export interface ClientItem {
  id: string;
  name: string;
  cuit: string;
  condition: string;
  featured: boolean;
}

export interface VoucherItem {
  id: string;
  type: 'Factura A' | 'Factura B' | 'Factura C' | 'Nota de Crédito';
  date: string;
  clientOrSupplier: string;
  cuit: string;
  total: number;
  status: 'Aprobado' | 'Pendiente' | 'Borrador';
  category: 'venta' | 'compra';
}
