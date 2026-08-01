import React, { useState, useEffect } from 'react';
import { Quote, quotesApi } from '../lib/api';
import { TrendingUp, Clock, CheckCircle, DollarSign } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    quotesApi
      .list()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setQuotes(data);
      })
      .catch(() => setQuotes([]))
      .finally(() => setLoading(false));
  }, []);

  const fmt = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const changeStatus = async (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    await quotesApi.updateStatus(id, status);
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  const stats = [
    {
      label: 'Total',
      value: quotes.length,
      icon: TrendingUp,
      color: 'bg-kea-cyan',
    },
    {
      label: 'Pendentes',
      value: quotes.filter((q) => q.status === 'PENDING').length,
      icon: Clock,
      color: 'bg-kea-alert-orange',
    },
    {
      label: 'Aprovados',
      value: quotes.filter((q) => q.status === 'APPROVED').length,
      icon: CheckCircle,
      color: 'bg-kea-emerald',
    },
    {
      label: 'Setup Total',
      value: fmt(quotes.reduce((s, q) => s + (q.setup_value ?? 0), 0)),
      icon: DollarSign,
      color: 'bg-kea-deep-blue',
    },
  ];

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-kea-deep-blue mb-2">Gestão</h1>
        <p className="text-kea-slate">Seus orçamentos e propostas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-kea-slate text-sm font-medium mb-2">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-kea-deep-blue">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-kea-emerald mb-4"></div>
            <p className="text-kea-slate">Carregando...</p>
          </div>
        </div>
      ) : quotes.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-100">
          <div className="mb-4">
            <div className="inline-block p-3 bg-kea-cyan/10 rounded-lg mb-4">
              <TrendingUp className="text-kea-cyan" size={32} />
            </div>
          </div>
          <p className="text-kea-slate mb-6">Nenhum orçamento ainda.</p>
          <a
            href="/app/builder"
            className="inline-block px-6 py-3 bg-kea-emerald hover:bg-kea-emerald/90 text-white rounded-lg font-semibold transition-colors"
          >
            Criar o primeiro →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-kea-deep-blue mb-2">
                    {q.clientName || q.client_name || 'Cliente'}
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        q.status === 'APPROVED'
                          ? 'bg-kea-emerald/10 text-kea-emerald'
                          : q.status === 'REJECTED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-kea-alert-orange/10 text-kea-alert-orange'
                      }`}
                    >
                      {q.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-kea-cyan/10 text-kea-cyan">
                      {q.service_type}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-kea-slate mb-1">Setup</p>
                      <p className="font-semibold text-kea-deep-blue">
                        {fmt(q.setup_value)}
                      </p>
                    </div>
                    <div>
                      <p className="text-kea-slate mb-1">Mensal</p>
                      <p className="font-semibold text-kea-deep-blue">
                        {fmt(q.monthly_value)}
                      </p>
                    </div>
                  </div>
                </div>
                {q.status === 'PENDING' && (
                  <div className="flex gap-2 md:flex-col">
                    <button
                      onClick={() => changeStatus(q.id, 'APPROVED')}
                      className="flex-1 px-4 py-2 bg-kea-emerald hover:bg-kea-emerald/90 text-white rounded-lg font-semibold transition-colors text-sm"
                    >
                      Aprovar
                    </button>
                    <button
                      onClick={() => changeStatus(q.id, 'REJECTED')}
                      className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors text-sm"
                    >
                      Rejeitar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
