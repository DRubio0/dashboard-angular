import { Component, signal } from '@angular/core';

interface ReportSummary {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
  bgClass: string;
  textClass: string;
}

interface Report {
  id: number;
  name: string;
  type: string;
  generatedDate: string;
  size: string;
  status: 'Disponible' | 'Procesando' | 'Error';
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.html',
})
export class Reportes {
  readonly selectedPeriod = signal<'semana' | 'mes' | 'trimestre' | 'año'>('mes');

  readonly summaryStats: ReportSummary[] = [
    {
      label: 'Ingresos totales',
      value: '$128,400',
      trend: '+14%',
      positive: true,
      bgClass: 'bg-green-100',
      textClass: 'text-green-600',
    },
    {
      label: 'Pedidos completados',
      value: '1,847',
      trend: '+6%',
      positive: true,
      bgClass: 'bg-indigo-100',
      textClass: 'text-indigo-600',
    },
    {
      label: 'Tasa de conversión',
      value: '3.6%',
      trend: '-0.4%',
      positive: false,
      bgClass: 'bg-orange-100',
      textClass: 'text-orange-600',
    },
  ];

  readonly reports: Report[] = [
    { id: 1, name: 'Reporte de Ventas - Marzo 2026', type: 'Ventas', generatedDate: '01 Abr 2026', size: '245 KB', status: 'Disponible' },
    { id: 2, name: 'Reporte de Usuarios - Marzo 2026', type: 'Usuarios', generatedDate: '01 Abr 2026', size: '180 KB', status: 'Disponible' },
    { id: 3, name: 'Reporte de Inventario - Q1 2026', type: 'Inventario', generatedDate: '31 Mar 2026', size: '512 KB', status: 'Disponible' },
    { id: 4, name: 'Reporte de Conversión - Febrero 2026', type: 'Marketing', generatedDate: '01 Mar 2026', size: '320 KB', status: 'Disponible' },
    { id: 5, name: 'Reporte de Soporte - Abril 2026', type: 'Soporte', generatedDate: '—', size: '—', status: 'Procesando' },
  ];

  readonly periods: { label: string; value: 'semana' | 'mes' | 'trimestre' | 'año' }[] = [
    { label: 'Esta semana', value: 'semana' },
    { label: 'Este mes', value: 'mes' },
    { label: 'Este trimestre', value: 'trimestre' },
    { label: 'Este año', value: 'año' },
  ];

  setPeriod(period: 'semana' | 'mes' | 'trimestre' | 'año'): void {
    this.selectedPeriod.set(period);
  }

  getStatusClasses(status: Report['status']): string {
    const map: Record<Report['status'], string> = {
      Disponible: 'bg-green-100 text-green-700',
      Procesando: 'bg-yellow-100 text-yellow-700',
      Error: 'bg-red-100 text-red-600',
    };
    return map[status];
  }
}
