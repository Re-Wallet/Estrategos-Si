export interface NavSubItem {
  name: string;
  hasPlus?: boolean;
}

export interface NavSection {
  title: string;
  items: NavSubItem[];
}

export interface NavMenuConfig {
  columns: NavSection[][]; // Array of columns, each containing one or more sections
  footerLink?: {
    text: string;
    action?: string;
  };
  minWidth?: string;
}

export const NAV_MENUS: Record<string, NavMenuConfig> = {
  reportes: {
    minWidth: '780px',
    columns: [
      [
        {
          title: 'VENTAS',
          items: [
            { name: 'Reporte de Ventas' },
            { name: 'Reporte de Cuentas a Cobrar' },
            { name: 'Ranking de Clientes' },
            { name: 'Ranking de Productos' },
            { name: 'Rentabilidad de Productos' },
            { name: 'Tablero de Presupuestos' },
            { name: 'Análisis de Facturas de Venta' },
            { name: 'Análisis de Presupuestos' },
            { name: 'Análisis de Remitos de Venta' },
            { name: 'Comisiones por Vendedor' },
          ],
        },
      ],
      [
        {
          title: 'REPORTES GENERALES',
          items: [{ name: 'Visión General' }],
        },
        {
          title: 'COMPRAS',
          items: [
            { name: 'Reporte de Compras' },
            { name: 'Reporte de Cuentas a Pagar' },
            { name: 'Análisis de Facturas de Compra' },
            { name: 'Análisis de Remitos de Compra' },
          ],
        },
      ],
      [
        {
          title: 'FINANZAS',
          items: [
            { name: 'Análisis de Cobranzas' },
            { name: 'Análisis de Pagos' },
            { name: 'Disponibilidades en Moneda Extranjera' },
          ],
        },
        {
          title: 'INVENTARIOS',
          items: [{ name: 'Inventario' }],
        },
        {
          title: 'CONTABILIDAD',
          items: [{ name: 'Reporte de Resultados' }],
        },
      ],
    ],
  },

  ventas: {
    minWidth: '680px',
    columns: [
      [
        {
          title: 'GESTIÓN',
          items: [
            { name: 'Comprobantes de Venta', hasPlus: true },
            { name: 'Presupuestos', hasPlus: true },
            { name: 'Remitos', hasPlus: true },
            { name: 'Cobranzas', hasPlus: true },
            { name: 'Ingresos de Fondos', hasPlus: true },
            { name: 'Abonos', hasPlus: true },
          ],
        },
        {
          title: 'CONFIGURACIÓN',
          items: [
            { name: 'Clientes', hasPlus: true },
            { name: 'Productos de Venta', hasPlus: true },
            { name: 'Vendedores', hasPlus: true },
            { name: 'Listas de Precios', hasPlus: true },
          ],
        },
      ],
      [
        {
          title: 'REPORTES',
          items: [
            { name: 'Cuentas a Cobrar' },
            { name: 'Saldos de Clientes' },
            { name: 'Cuenta Corriente de Clientes' },
          ],
        },
      ],
    ],
  },

  compras: {
    minWidth: '680px',
    columns: [
      [
        {
          title: 'GESTIÓN',
          items: [
            { name: 'Comprobantes de Compra', hasPlus: true },
            { name: 'Orden de Compra', hasPlus: true },
            { name: 'Remitos', hasPlus: true },
            { name: 'Pagos', hasPlus: true },
            { name: 'Salidas de Fondos', hasPlus: true },
          ],
        },
        {
          title: 'CONFIGURACIÓN',
          items: [
            { name: 'Proveedores', hasPlus: true },
            { name: 'Productos de Compra', hasPlus: true },
            { name: 'Listas de Precios', hasPlus: true },
          ],
        },
      ],
      [
        {
          title: 'REPORTES',
          items: [
            { name: 'Cuentas a Pagar' },
            { name: 'Saldos de Proveedores' },
            { name: 'Cuenta Corriente de Proveedores' },
          ],
        },
      ],
    ],
  },

  finanzas: {
    minWidth: '620px',
    columns: [
      [
        {
          title: 'FONDOS',
          items: [
            { name: 'Movimientos de Fondos', hasPlus: true },
            { name: 'Fondos' },
          ],
        },
        {
          title: 'CONCILIACIÓN',
          items: [{ name: 'Conciliación Bancaria Automática' }],
        },
        {
          title: 'CONFIGURACIÓN',
          items: [{ name: 'Monedas', hasPlus: true }],
        },
      ],
      [
        {
          title: 'CHEQUES',
          items: [
            { name: 'Cheques en Cartera' },
            { name: 'Cheques Depositados' },
            { name: 'Cheques Diferidos' },
            { name: 'Seguimiento de Cheques' },
          ],
        },
      ],
    ],
  },

  inventarios: {
    minWidth: '540px',
    columns: [
      [
        {
          title: 'GESTIÓN',
          items: [
            { name: 'Ajustes de Stock', hasPlus: true },
            { name: 'Orden de Producción', hasPlus: true },
          ],
        },
        {
          title: 'CONFIGURACIÓN',
          items: [
            { name: 'Depósitos', hasPlus: true },
            { name: 'Transporte', hasPlus: true },
          ],
        },
      ],
      [
        {
          title: 'REPORTES',
          items: [
            { name: 'Inventario' },
            { name: 'Ingresos y Egresos' },
          ],
        },
      ],
    ],
  },

  impuestos: {
    minWidth: '760px',
    columns: [
      [
        {
          title: 'IVA',
          items: [
            { name: 'Libro IVA Ventas' },
            { name: 'Libro IVA Compras' },
            { name: 'Libro IVA Digital Ventas' },
            { name: 'Libro IVA Digital Compras' },
            { name: 'IVA Simple' },
            { name: 'Posición IVA' },
            { name: 'Formulario IVA Web F2002' },
            { name: 'RG 3685/14 (ex CITI)' },
          ],
        },
        {
          title: 'INGRESOS BRUTOS',
          items: [
            { name: 'SIFERE Web' },
            { name: 'Ventas por Provincia' },
            { name: 'Compras por Provincia' },
          ],
        },
      ],
      [
        {
          title: 'RETENCIONES Y PERCEPCIONES',
          items: [
            { name: 'Retenciones' },
            { name: 'Percepciones' },
            { name: 'Informe de Retenciones y Percepciones' },
            { name: 'SICORE Retenciones' },
            { name: 'SICORE Sujetos Retenidos' },
            { name: 'SIRE Retenidos' },
            { name: 'Declaración Jurada Agentes de Recaudación RN 38/2011 ARBA' },
          ],
        },
        {
          title: 'MONOTRIBUTO',
          items: [{ name: 'Monotributo' }],
        },
      ],
    ],
  },

  contabilidad: {
    minWidth: '660px',
    columns: [
      [
        {
          title: 'REGISTROS CONTABLES',
          items: [
            { name: 'Asientos Manuales', hasPlus: true },
            { name: 'Libro Diario' },
            { name: 'Libro Mayor' },
          ],
        },
        {
          title: 'PAPELES DE TRABAJO',
          items: [
            { name: 'Sumas y Saldos' },
            { name: 'Resultados Mensuales' },
            { name: 'Saldos Mensuales' },
          ],
        },
      ],
      [
        {
          title: 'ESTADOS CONTABLES',
          items: [
            { name: 'Estado de Resultados' },
            { name: 'Estado de Situación Patrimonial' },
            { name: 'Balance de Gestión' },
          ],
        },
        {
          title: 'CONFIGURACIÓN',
          items: [
            { name: 'Plan de Cuentas' },
            { name: 'Ejercicios Contables' },
            { name: 'Centros de Costos' },
            { name: 'Circuito Contable' },
          ],
        },
      ],
    ],
  },

  sueldos: {
    minWidth: '680px',
    columns: [
      [
        {
          title: 'LIQUIDACIÓN',
          items: [
            { name: 'Legajos', hasPlus: true },
            { name: 'Novedades', hasPlus: true },
            { name: 'SIRADIG', hasPlus: true },
            { name: 'Liquidaciones', hasPlus: true },
          ],
        },
        {
          title: 'CONFIGURACIÓN',
          items: [
            { name: 'Convenios', hasPlus: true },
            { name: 'Fórmulas', hasPlus: true },
            { name: 'Conceptos', hasPlus: true },
          ],
        },
      ],
      [
        {
          title: 'PRESENTACIONES',
          items: [
            { name: 'Cargas Sociales F.931' },
            { name: 'Libro de Sueldos Digital' },
            { name: 'Libro Sueldos' },
            { name: 'SICORE 4ta Categoría' },
            { name: 'Formulario 1359' },
            { name: 'Presentaciones Sindicales' },
          ],
        },
        {
          title: 'REPORTES',
          items: [
            { name: 'Reporte de sueldos' },
            { name: 'Reporte de acreditación' },
            { name: 'Listado de empleados' },
          ],
        },
      ],
    ],
    footerLink: {
      text: '¿Cómo funciona el módulo de sueldos?',
    },
  },
};
