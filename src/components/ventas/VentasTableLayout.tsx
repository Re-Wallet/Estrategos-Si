import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

export interface ColumnDef {
  header: string;
  key: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
}

interface VentasTableLayoutProps {
  title: string;
  showHelpLink?: boolean;
  filterPills?: { label: string; value: string }[];
  collapsibleFilter?: boolean;
  filterPillsSecondRow?: { label: string }[];
  primaryButtonLabel?: string;
  secondaryButtons?: string[];
  searchPlaceholder?: string;
  columns: ColumnDef[];
  children?: React.ReactNode;
  emptyMessage?: string;
  footerInfo?: string;
  pagination?: {
    pageSize: number;
    total: number;
    page: number;
    totalPages: number;
  };
}

export const VentasTableLayout: React.FC<VentasTableLayoutProps> = ({
  title,
  showHelpLink = true,
  filterPills,
  collapsibleFilter,
  filterPillsSecondRow,
  primaryButtonLabel,
  secondaryButtons = [],
  searchPlaceholder = 'Buscar...',
  columns,
  children,
  emptyMessage = 'No se encontraron registros.',
  footerInfo,
  pagination,
}) => {
  return (
    <div className="w-full pb-16 bg-[#f4f6f8] min-h-[calc(100vh-110px)]">
      {/* 1. Subheader with Title and "Ver ayuda" */}
      <div className="border-b border-slate-200 bg-white px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-normal text-slate-800 tracking-tight">
          {title}
        </h1>
        {showHelpLink && (
          <button
            type="button"
            className="text-xs sm:text-sm text-[#008db9] hover:underline font-medium cursor-pointer"
          >
            Ver ayuda
          </button>
        )}
      </div>

      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-4">
        
        {/* 2. Collapsible Filter Box (e.g. Clientes view) */}
        {collapsibleFilter && (
          <div className="bg-white border border-slate-200 rounded-md p-3 flex items-center justify-between shadow-xs">
            <span className="text-xs text-slate-700 font-medium">Filtros</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        )}

        {/* 2b. Standard Filter Pills Row (e.g. Desde / Hasta) */}
        {filterPills && filterPills.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#008db9] font-medium mr-1">Filtros</span>
            {filterPills.map((pill, idx) => (
              <span
                key={idx}
                className="bg-slate-200/70 text-slate-700 px-3 py-1 rounded-full text-xs font-normal"
              >
                {pill.label}: {pill.value}
              </span>
            ))}
          </div>
        )}

        {/* 3. Button Toolbar & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Left Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {primaryButtonLabel && (
              <button
                type="button"
                className="bg-[#008db9] hover:bg-[#007a9e] text-white text-xs font-semibold px-4 py-1.5 rounded shadow-xs cursor-pointer"
              >
                {primaryButtonLabel}
              </button>
            )}

            {secondaryButtons.map((btn, idx) => {
              const hasDropdown = btn.includes('▾') || btn === 'Acciones';
              return (
                <button
                  key={idx}
                  type="button"
                  className={`text-xs font-semibold px-3 py-1.5 rounded transition-colors cursor-pointer border flex items-center gap-1 ${
                    btn === 'Eliminar'
                      ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-700/80 shadow-xs'
                  }`}
                >
                  <span>{btn}</span>
                  {hasDropdown && !btn.includes('▾') && (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-600 inline-block" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Search Input Box */}
          <div className="relative w-64 max-w-full">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-3 pr-8 py-1.5 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#008db9]"
            />
            <div className="absolute right-2.5 top-2 text-slate-400 pointer-events-none">
              <Search className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* 4. Secondary Filter Pills (e.g. "Estado" pill under buttons in Presupuestos and Remitos) */}
        {filterPillsSecondRow && filterPillsSecondRow.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            {filterPillsSecondRow.map((p, idx) => (
              <span
                key={idx}
                className="bg-slate-200/80 text-slate-700 px-3.5 py-0.5 rounded-full text-xs font-normal"
              >
                {p.label}
              </span>
            ))}
          </div>
        )}

        {/* 5. Main Table Container */}
        <div className="bg-white border border-slate-200 rounded-md shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#e4e7ec] text-slate-800 border-b border-slate-300">
                  <th className="py-2.5 px-3 w-8 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 text-[#008db9] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className={`py-2.5 px-3 font-normal text-slate-800 whitespace-nowrap ${
                        col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                      }`}
                      style={{ width: col.width }}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {children ? (
                  children
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="py-6 px-4 text-slate-400 text-xs italic"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Count or Pagination */}
          {footerInfo && (
            <div className="px-4 py-2 border-t border-slate-100 text-[11px] text-slate-400">
              {footerInfo}
            </div>
          )}

          {pagination && (
            <div className="px-4 py-2 border-t border-slate-100 flex items-center justify-end gap-6 text-xs text-slate-600 bg-white">
              <div className="flex items-center gap-1.5">
                <span>Elementos por página:</span>
                <span className="border border-slate-300 rounded px-1.5 py-0.5 flex items-center gap-1 bg-white">
                  {pagination.pageSize} <ChevronDown className="w-3 h-3 text-slate-400" />
                </span>
              </div>
              <div>
                1 a {pagination.total} de {pagination.total}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="cursor-pointer hover:text-slate-700">|&lt;</span>
                <span className="cursor-pointer hover:text-slate-700">&lt;</span>
                <span className="text-slate-700">Página {pagination.page} de {pagination.totalPages}</span>
                <span className="cursor-pointer hover:text-slate-700">&gt;</span>
                <span className="cursor-pointer hover:text-slate-700">&gt;|</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
