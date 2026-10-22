import React from 'react';
import { VentasTableLayout, ColumnDef } from './VentasTableLayout';
import { Pencil, Trash2, MoreHorizontal } from 'lucide-react';

// 1. Comprobantes de Venta View (Image 1)
export const ComprobantesVentaView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Fecha', key: 'fecha' },
    { header: 'Fecha Vto.', key: 'fechaVto' },
    { header: 'Tipo', key: 'tipo' },
    { header: 'Comprobante', key: 'comprobante' },
    { header: 'CAE', key: 'cae' },
    { header: 'Cliente', key: 'cliente' },
    { header: 'Moneda', key: 'moneda' },
    { header: 'Importe Bruto', key: 'importeBruto' },
    { header: 'Impuestos', key: 'impuestos' },
    { header: 'Total', key: 'total' },
    { header: 'Observaciones', key: 'observaciones' },
    { header: 'Lista de Precios', key: 'listaPrecios' },
    { header: 'Provincia', key: 'provincia' },
    { header: 'Vendedor', key: 'vendedor' },
  ];

  return (
    <VentasTableLayout
      title="Comprobantes de Venta"
      filterPills={[
        { label: 'Desde', value: '01-10-2026' },
        { label: 'Hasta', value: '22-10-2026' },
      ]}
      primaryButtonLabel="+ Nueva Venta"
      secondaryButtons={['Acciones']}
      columns={columns}
      emptyMessage="No se encontraron registros."
    />
  );
};

// 2. Presupuestos View (Image 2)
export const PresupuestosView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Fecha Vto.', key: 'fechaVto' },
    { header: 'Fecha', key: 'fecha' },
    { header: 'Documento', key: 'documento' },
    { header: 'Cliente', key: 'cliente' },
    { header: 'Moneda', key: 'moneda' },
    { header: 'Importe Bruto', key: 'importeBruto' },
    { header: 'Impuestos', key: 'impuestos' },
    { header: 'Total', key: 'total' },
    { header: 'Cotización', key: 'cotizacion' },
    { header: 'Total Mon. Principal', key: 'totalMonPrincipal' },
    { header: 'Observaciones', key: 'observaciones' },
  ];

  return (
    <VentasTableLayout
      title="Presupuestos"
      filterPills={[
        { label: 'Desde', value: '01-10-2026' },
        { label: 'Hasta', value: '22-10-2026' },
      ]}
      primaryButtonLabel="+ Nuevo Presupuesto"
      secondaryButtons={['Acciones']}
      columns={columns}
      emptyMessage="No se encontraron registros."
    />
  );
};

// 3. Remitos de Venta View (Image 3)
export const RemitosVentaView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Fecha', key: 'fecha' },
    { header: 'Documento', key: 'documento' },
    { header: 'Cliente', key: 'cliente' },
    { header: 'Observaciones', key: 'observaciones' },
  ];

  return (
    <VentasTableLayout
      title="Remitos de Venta"
      filterPills={[
        { label: 'Desde', value: '01-10-2026' },
        { label: 'Hasta', value: '22-10-2026' },
      ]}
      primaryButtonLabel="+ Nuevo Remito"
      secondaryButtons={['Acciones']}
      columns={columns}
      emptyMessage="No se encontraron registros."
    />
  );
};

// 4. Cobranzas View (Image 4)
export const CobranzasView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Fecha', key: 'fecha' },
    { header: 'Comprobante', key: 'comprobante' },
    { header: 'Cliente', key: 'cliente' },
    { header: 'Total', key: 'total' },
    { header: 'Observaciones', key: 'observaciones' },
    { header: 'Estado email', key: 'estadoEmail' },
  ];

  return (
    <VentasTableLayout
      title="Cobranzas"
      filterPills={[
        { label: 'Desde', value: '01-10-2026' },
        { label: 'Hasta', value: '22-10-2026' },
      ]}
      primaryButtonLabel="+ Nueva Cobranza"
      secondaryButtons={['Importar', 'Envío de emails', 'Imprimir', 'Exportar ▾', 'Eliminar']}
      columns={columns}
      emptyMessage="No se encontraron registros."
    />
  );
};

// 5. Ingresos De Fondos View (Image 5)
export const IngresosFondosView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Fecha', key: 'fecha' },
    { header: 'Documento', key: 'documento' },
    { header: 'Observaciones', key: 'observaciones' },
    { header: 'Total', key: 'total' },
  ];

  return (
    <VentasTableLayout
      title="Ingresos De Fondos"
      showHelpLink={false}
      filterPills={[
        { label: 'Desde', value: '01-10-2026' },
        { label: 'Hasta', value: '22-10-2026' },
      ]}
      primaryButtonLabel="+ Nuevo Ingreso de Fondos"
      secondaryButtons={['Acciones']}
      columns={columns}
      emptyMessage="No se encontraron registros."
    />
  );
};

// 6. Abonos View (Image 6)
export const AbonosView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Vigencia Desde', key: 'vigenciaDesde' },
    { header: 'Vigencia Hasta', key: 'vigenciaHasta' },
    { header: 'Fecha Últ. Fact.', key: 'fechaUltFact' },
    { header: 'Documento', key: 'documento' },
    { header: 'Cliente', key: 'cliente' },
    { header: 'Moneda', key: 'moneda' },
    { header: 'Total', key: 'total' },
    { header: 'Provincia', key: 'provincia' },
    { header: 'Observaciones', key: 'observaciones' },
    { header: 'Total Mon. Principal', key: 'totalMonPrincipal' },
  ];

  return (
    <VentasTableLayout
      title="Abonos"
      showHelpLink={false}
      filterPills={[
        { label: 'Vigencia Hasta', value: '22-10-2026' },
        { label: 'Ver', value: 'Vigentes' },
      ]}
      primaryButtonLabel="+ Nuevo Abono"
      secondaryButtons={['Ver Facturacion Masiva', 'Acciones']}
      columns={columns}
      emptyMessage="No se encontraron registros."
    />
  );
};

// 7. Clientes View (Image 7)
export const ClientesView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Nombre', key: 'nombre' },
    { header: 'Código', key: 'codigo' },
    { header: 'Tipo de ID', key: 'tipoId' },
    { header: 'N° de ID', key: 'nroId' },
    { header: 'Condición IVA', key: 'condicionIva' },
    { header: 'Mail', key: 'mail' },
    { header: '', key: 'actions', width: '50px' },
  ];

  return (
    <VentasTableLayout
      title="Clientes"
      showHelpLink={false}
      collapsibleFilter={true}
      primaryButtonLabel="Nuevo cliente"
      secondaryButtons={['Importar', 'Imprimir', 'Exportar', 'Eliminar']}
      columns={columns}
      pagination={{
        pageSize: 20,
        total: 1,
        page: 1,
        totalPages: 1,
      }}
    >
      <tr className="hover:bg-slate-50 text-slate-800">
        <td className="py-2.5 px-3 text-center">
          <input type="checkbox" className="rounded border-slate-300 text-[#008db9] focus:ring-0 cursor-pointer" />
        </td>
        <td className="py-2.5 px-3 font-medium">Consumidor Final</td>
        <td className="py-2.5 px-3 text-slate-400"></td>
        <td className="py-2.5 px-3 text-slate-600">Sin ident...</td>
        <td className="py-2.5 px-3 text-slate-600">Consumidor Final</td>
        <td className="py-2.5 px-3 text-slate-400"></td>
        <td className="py-2.5 px-3 text-right">
          <div className="flex items-center justify-end gap-1 text-slate-600">
            <Pencil className="w-3.5 h-3.5 cursor-pointer hover:text-[#008db9]" />
            <span className="text-slate-400">...</span>
          </div>
        </td>
      </tr>
    </VentasTableLayout>
  );
};

// 8. Productos de Venta View (Image 8)
export const ProductosVentaView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Nombre', key: 'nombre' },
    { header: 'Código/SKU', key: 'codigo' },
    { header: 'Código de Barras', key: 'codigoBarras' },
    { header: 'Actividad', key: 'actividad' },
    { header: 'Tipo de Operación', key: 'tipoOperacion' },
  ];

  return (
    <VentasTableLayout
      title="Productos de Venta"
      showHelpLink={false}
      primaryButtonLabel="+ Nuevo Producto de Venta"
      secondaryButtons={['Actualización masiva', 'Acciones']}
      columns={columns}
      footerInfo="2 registros encontrados."
    >
      <tr className="hover:bg-slate-50 text-slate-800">
        <td className="py-2.5 px-3 text-center">
          <input type="checkbox" className="rounded border-slate-300 text-[#008db9] focus:ring-0 cursor-pointer" />
        </td>
        <td className="py-2.5 px-3 font-medium text-[#008db9] hover:underline cursor-pointer">
          Producto al 21%
        </td>
        <td className="py-2.5 px-3 text-slate-600">PROD21</td>
        <td className="py-2.5 px-3 text-slate-400"></td>
        <td className="py-2.5 px-3 text-slate-400"></td>
        <td className="py-2.5 px-3 text-slate-400"></td>
      </tr>
      <tr className="hover:bg-slate-50 text-slate-800">
        <td className="py-2.5 px-3 text-center">
          <input type="checkbox" className="rounded border-slate-300 text-[#008db9] focus:ring-0 cursor-pointer" />
        </td>
        <td className="py-2.5 px-3 font-medium text-[#008db9] hover:underline cursor-pointer">
          Servicio al 21%
        </td>
        <td className="py-2.5 px-3 text-slate-600">SERV21</td>
        <td className="py-2.5 px-3 text-slate-400"></td>
        <td className="py-2.5 px-3 text-slate-400"></td>
        <td className="py-2.5 px-3 text-slate-400"></td>
      </tr>
    </VentasTableLayout>
  );
};

// 9. Vendedor View (Image 9)
export const VendedoresView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Nombre', key: 'nombre' },
    { header: 'Apellido', key: 'apellido' },
    { header: '', key: 'actions', width: '60px' },
  ];

  return (
    <VentasTableLayout
      title="Vendedor"
      showHelpLink={false}
      primaryButtonLabel="Nuevo"
      secondaryButtons={['Eliminar']}
      columns={columns}
      pagination={{
        pageSize: 10,
        total: 1,
        page: 1,
        totalPages: 1,
      }}
    >
      <tr className="hover:bg-slate-50 text-slate-800">
        <td className="py-2.5 px-3 text-center">
          <input type="checkbox" className="rounded border-slate-300 text-[#008db9] focus:ring-0 cursor-pointer" />
        </td>
        <td className="py-2.5 px-3 font-medium">Demo</td>
        <td className="py-2.5 px-3 text-slate-600">demo</td>
        <td className="py-2.5 px-3 text-right">
          <div className="flex items-center justify-end gap-2 text-slate-600">
            <Pencil className="w-3.5 h-3.5 cursor-pointer hover:text-[#008db9]" />
            <Trash2 className="w-3.5 h-3.5 cursor-pointer hover:text-red-500" />
          </div>
        </td>
      </tr>
    </VentasTableLayout>
  );
};

// 10. Listas de Precios View (Image 10)
export const ListasPreciosView: React.FC = () => {
  const columns: ColumnDef[] = [
    { header: 'Nombre', key: 'nombre' },
    { header: 'Tipo', key: 'tipo' },
    { header: 'Moneda', key: 'moneda' },
  ];

  return (
    <VentasTableLayout
      title="Listas de Precios"
      showHelpLink={false}
      primaryButtonLabel="+ Nueva Lista de Precios"
      secondaryButtons={['Acciones']}
      columns={columns}
      footerInfo="1 registro encontrado."
    >
      <tr className="hover:bg-slate-50 text-slate-800">
        <td className="py-2.5 px-3 text-center">
          <input type="checkbox" className="rounded border-slate-300 text-[#008db9] focus:ring-0 cursor-pointer" />
        </td>
        <td className="py-2.5 px-3 font-medium text-[#008db9] hover:underline cursor-pointer">
          Demo
        </td>
        <td className="py-2.5 px-3 text-slate-700">VENTA</td>
        <td className="py-2.5 px-3 text-slate-700">Pesos Argentinos</td>
      </tr>
    </VentasTableLayout>
  );
};
