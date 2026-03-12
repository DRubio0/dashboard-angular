import { Component, signal } from '@angular/core';

interface ReportStat {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
  bgClass: string;
  textClass: string;
}

interface MonthlyData {
  month: string;
  revenue: number;
  orders: number;
}

interface Report {
  id: number;
  name: string;
  category: string;
  date: string;
  size: string;
  status: 'Listo' | 'Procesando' | 'Error';
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.html',
})
export class Reportes {
  readonly selectedPeriod = signal('Este mes');
  readonly periods = ['Hoy', 'Esta semana', 'Este mes', 'Este año'];

  readonly stats: ReportStat[] = [
    {
      label: 'Ingresos totales',
      value: '$84,320',
      trend: '+14%',
      positive: true,
      bgClass: 'bg-indigo-100',
      textClass: 'text-indigo-600',
    },
    {
      label: 'Pedidos realizados',
      value: '1,540',
      trend: '+8%',
      positive: true,
      bgClass: 'bg-green-100',
      textClass: 'text-green-600',
    },
    {
      label: 'Tasa de devolución',
      value: '3.2%',
      trend: '-1%',
      positive: true,
      bgClass: 'bg-amber-100',
      textClass: 'text-amber-600',
    },
    {
      label: 'Clientes nuevos',
      value: '247',
      trend: '+22%',
      positive: true,
      bgClass: 'bg-purple-100',
      textClass: 'text-purple-600',
    },
  ];

  readonly monthlyData: MonthlyData[] = [
    { month: 'Oct', revenue: 52000, orders: 820 },
    { month: 'Nov', revenue: 61000, orders: 950 },
    { month: 'Dic', revenue: 78000, orders: 1200 },
    { month: 'Ene', revenue: 65000, orders: 1040 },
    { month: 'Feb', revenue: 71000, orders: 1130 },
    { month: 'Mar', revenue: 84320, orders: 1540 },
  ];

  readonly reports: Report[] = [
    { id: 1, name: 'Ventas mensuales - Marzo 2026', category: 'Ventas', date: '11 Mar 2026', size: '2.4 MB', status: 'Listo' },
    { id: 2, name: 'Usuarios activos - Q1 2026', category: 'Usuarios', date: '10 Mar 2026', size: '1.8 MB', status: 'Listo' },
    { id: 3, name: 'Análisis de rendimiento', category: 'Operaciones', date: '09 Mar 2026', size: '—', status: 'Procesando' },
    { id: 4, name: 'Reporte de devoluciones', category: 'Finanzas', date: '08 Mar 2026', size: '890 KB', status: 'Listo' },
    { id: 5, name: 'Tráfico web - Febrero 2026', category: 'Marketing', date: '05 Mar 2026', size: '—', status: 'Error' },
  ];

  get maxRevenue(): number {
    return Math.max(...this.monthlyData.map((d) => d.revenue));
  }

  getBarHeight(value: number): string {
    const pct = (value / this.maxRevenue) * 100;
    return `${Math.round(pct)}%`;
  }

  getStatusClasses(status: Report['status']): string {
    const map: Record<Report['status'], string> = {
      Listo: 'bg-green-100 text-green-700',
      Procesando: 'bg-yellow-100 text-yellow-700',
      Error: 'bg-red-100 text-red-600',
    };
    return map[status];
  }

  getCategoryClasses(category: string): string {
    const map: Record<string, string> = {
      Ventas: 'bg-indigo-100 text-indigo-700',
      Usuarios: 'bg-purple-100 text-purple-700',
      Operaciones: 'bg-blue-100 text-blue-700',
      Finanzas: 'bg-green-100 text-green-700',
      Marketing: 'bg-amber-100 text-amber-700',
    };
    return map[category] ?? 'bg-gray-100 text-gray-600';
  }
}
