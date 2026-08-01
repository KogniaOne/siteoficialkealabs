import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart3, FileText, Users, Zap } from 'lucide-react';

interface SidebarProps {
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Gestão', icon: BarChart3, path: '/dashboard' },
    { label: 'Orçamentos', icon: FileText, path: '/builder' },
    { label: 'Prospect', icon: Users, path: '/prospect' },
    { label: 'Agent Kea', icon: Zap, path: '/agent' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-kea-deep-blue text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-kea-deep-blue text-white transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-kea-cyan/20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-kea-emerald rounded-lg flex items-center justify-center font-bold text-kea-deep-blue">
              K
            </div>
            <div>
              <p className="font-black text-lg">KEA</p>
              <p className="text-xs text-kea-slate">LABS</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-kea-emerald text-kea-deep-blue font-semibold'
                    : 'text-white hover:bg-kea-cyan/10'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout?.();
            }}
            className="w-full px-4 py-2 bg-kea-alert-orange hover:bg-kea-alert-orange/90 text-white rounded-lg transition-colors font-medium"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
