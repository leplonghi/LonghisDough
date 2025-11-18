import React from 'react';

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-md font-semibold text-slate-800">{title}</h3>
        <div className="mt-4">{children}</div>
    </div>
);

const InsightsCharts: React.FC = () => {
  return (
    <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Tendências de Massa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Line Chart Placeholder */}
            <ChartCard title="Evolução da Hidratação (Últimos 10 Batches)">
                <div className="h-40 flex items-end justify-center bg-slate-50 rounded-lg p-2">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 60">
                        <path d="M0 30 L20 40 L40 20 L60 50 L80 45 L100 25" fill="none" stroke="#84cc16" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                    </svg>
                </div>
            </ChartCard>

            {/* Bar Chart Placeholder */}
            <ChartCard title="Estilos Mais Utilizados">
                <div className="h-40 flex flex-col justify-end gap-2 rounded-lg p-4">
                    <div className="flex items-end gap-4 h-full">
                        <div className="w-1/3 bg-lime-300 rounded-t-sm" style={{ height: '80%' }} title="Napolitana"></div>
                        <div className="w-1/3 bg-lime-400 rounded-t-sm" style={{ height: '50%' }} title="NY Style"></div>
                        <div className="w-1/3 bg-lime-200 rounded-t-sm" style={{ height: '30%' }} title="Detroit"></div>
                    </div>
                </div>
            </ChartCard>

            {/* Radial Chart Placeholder */}
            <ChartCard title="Índice de Consistência">
                <div className="h-40 flex items-center justify-center">
                    <svg className="w-24 h-24" viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="3.5"
                        />
                        <path
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#84cc16"
                            strokeWidth="3.5"
                            strokeDasharray="85, 100"
                            strokeLinecap="round"
                        />
                         <text x="18" y="21" className="fill-current text-slate-700 text-lg font-bold" textAnchor="middle">85%</text>
                    </svg>
                </div>
            </ChartCard>
        </div>
    </div>
  );
};

export default InsightsCharts;
