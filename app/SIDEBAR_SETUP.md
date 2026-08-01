# Kealabs App - Sidebar com Tailwind CSS

## 🎨 Atualizações Realizadas

### Novo Layout com Sidebar
- Sidebar lateral fixa com menu responsivo
- Menu items: Gestão, Orçamentos, Prospect, Agent Kea
- Ícones do Lucide React
- Cores da identidade visual Kealabs
- Totalmente responsivo (mobile, tablet, desktop)

### Tecnologias Adicionadas
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide React** - Ícones SVG
- **PostCSS** - Processador CSS

### Cores Kealabs Integradas
- Azul Profundo (#0A2540) - Sidebar e textos principais
- Verde Esmeralda (#10B981) - Botões e destaques
- Ciano Digital (#00B4D8) - Acentos
- Laranja Alerta (#FF6B00) - Ações e alertas
- Cinza Slate (#64748B) - Textos secundários

## 📦 Instalação

1. Instale as dependências:
```bash
cd app
npm install
```

2. Execute o projeto:
```bash
npm start
```

O app estará disponível em `http://localhost:3000`

## 📁 Estrutura de Arquivos Criados

```
app/
├── tailwind.config.js          # Configuração Tailwind com cores Kealabs
├── postcss.config.js           # Configuração PostCSS
├── src/
│   ├── components/
│   │   └── Sidebar.tsx         # Novo componente de sidebar
│   ├── pages/
│   │   └── Dashboard.tsx       # Dashboard atualizado com Tailwind
│   ├── styles/
│   │   └── global.css          # Global CSS com Tailwind directives
│   └── App.tsx                 # App atualizado com layout sidebar
└── package.json                # Dependências atualizadas
```

## 🎯 Componentes

### Sidebar
- Menu lateral com logo Kealabs
- 4 itens de menu com ícones
- Botão de logout
- Responsivo (colapsável em mobile)
- Overlay em mobile

### Dashboard
- Cards de estatísticas com ícones
- Lista de orçamentos com status
- Ações de aprovação/rejeição
- Design moderno com Tailwind

## 🚀 Próximos Passos

1. Criar páginas para os outros itens do menu:
   - `/prospect` - Gestão de prospects
   - `/agent` - Agent Kea

2. Adicionar mais funcionalidades ao Dashboard

3. Implementar animações com Magic UI

## 📝 Notas

- O Tailwind CSS está configurado com as cores customizadas da Kealabs
- Todos os componentes usam a tipografia Inter
- O layout é totalmente responsivo
- Mobile-first approach com breakpoints do Tailwind
