# DataTable Component

Uma DataTable flexível e completa para React TypeScript usando Tanstack Table, styled-components e Vite.

## Funcionalidades

✅ **Paginação** - Com suporte a paginação client-side e server-side  
✅ **Seletor de quantidade por página** - Quantidade inicial configurável (padrão: 5)  
✅ **Configuração flexível de largura de coluna** - Larguras customizáveis e redimensionamento  
✅ **Ordenação** - Ordenação customizável por coluna com indicadores visuais  
✅ **Barra de filtragem avançada** - Filtros por coluna/operação/valor  
✅ **Searchbox** - Busca em atributos selecionados  
✅ **Exportação Excel** - Exportação real usando biblioteca xlsx  
✅ **Expansão de linha** - Conteúdo expandido customizável  
✅ **Gerenciamento de colunas** - Visibilidade e reordenação com drag & drop  
✅ **Skeleton loading** - Loading states para todas as colunas  
✅ **Ícones Lucide React** - Ícones modernos e consistentes  

## Instalação

```bash
npm install @tanstack/react-table @tanstack/react-virtual styled-components lucide-react xlsx @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

## Uso Básico

```tsx
import { DataTable } from './datatable';
import type { DataTableColumn } from './datatable';

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: DataTableColumn<User>[] = [
  {
    id: 'id',
    header: 'ID',
    accessorKey: 'id',
    enableSorting: true,
  },
  {
    id: 'name',
    header: 'Nome',
    accessorKey: 'name',
    enableSorting: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email',
  },
];

const data: User[] = [
  { id: 1, name: 'João', email: 'joao@email.com' },
  { id: 2, name: 'Maria', email: 'maria@email.com' },
];

function App() {
  return (
    <DataTable
      data={data}
      columns={columns}
      pagination={{ enabled: true }}
      search={{ enabled: true, searchableColumns: ['name', 'email'] }}
      export={{ enabled: true }}
      columnManagement={{ enabled: true, allowReorder: true }}
      advancedFilter={{ enabled: true }}
    />
  );
}
```

## Configurações

### Paginação
```tsx
pagination={{
  enabled: true,
  serverSide: false, // true para paginação server-side
  scrollPagination: false, // true para scroll infinito
  initialPageSize: 5, // quantidade inicial por página
  pageSizeOptions: [5, 10, 20, 50], // opções de quantidade
}}
```

### Busca
```tsx
search={{
  enabled: true,
  searchableColumns: ['name', 'email'], // colunas pesquisáveis
  placeholder: 'Buscar...', // placeholder customizado
}}
```

### Exportação
```tsx
export={{
  enabled: true,
  filename: 'dados.xlsx', // nome do arquivo
  includeFiltered: true, // incluir apenas dados filtrados
}}
```

### Expansão de Linha
```tsx
rowExpansion={{
  enabled: true,
  renderExpandedRow: (row) => (
    <div>Conteúdo expandido para {row.name}</div>
  ),
}}
```

### Gerenciamento de Colunas
```tsx
columnManagement={{
  enabled: true,
  allowReorder: true, // permitir reordenação
  allowToggleVisibility: true, // permitir ocultar/mostrar
}}
```

## Definição de Colunas

```tsx
const columns: DataTableColumn<T>[] = [
  {
    id: 'unique-id',
    header: 'Cabeçalho',
    accessorKey: 'dataProperty',
    size: 150, // largura em pixels
    enableSorting: true,
    enablePinning: true, // permitir fixar coluna
    enableColumnFilter: true,
    cell: (info) => <CustomComponent value={info.getValue()} />,
    sortingFn: (rowA, rowB, columnId) => {
      // função de ordenação customizada
    },
    meta: {
      exportable: true, // incluir na exportação
    },
  },
];
```

## Eventos

```tsx
<DataTable
  onPageChange={(page) => console.log('Página:', page)}
  onPageSizeChange={(size) => console.log('Tamanho:', size)}
  onSortingChange={(sorting) => console.log('Ordenação:', sorting)}
  onDataChange={(data) => console.log('Dados:', data)}
/>
```

## Exemplo Completo

Veja o arquivo `src/example.tsx` para um exemplo completo com todas as funcionalidades.

## Especificações Técnicas

- **Framework**: React 18+ com TypeScript
- **Tabela**: @tanstack/react-table v8
- **Estilos**: styled-components
- **Ícones**: lucide-react
- **Exportação**: xlsx
- **Drag & Drop**: @dnd-kit
- **Virtualização**: @tanstack/react-virtual (preparado para implementação futura)

## Funcionalidades Detalhadas

### Paginação
- Formato "1-n de 100" posicionado no canto direito
- Setas de navegação com ícones lucide-react
- Seletor de quantidade por página ao lado da paginação
- Suporte a paginação server-side
- Preparado para scroll pagination com virtualização

### Ordenação
- Setas posicionadas à esquerda do nome da coluna
- Suporte a funções de ordenação customizadas
- Indicadores visuais de direção (ascendente/descendente)

### Filtros
- Barra de filtragem avançada com operadores
- Menu de coluna com opções de fixar e filtrar
- Searchbox global em colunas selecionadas
- Filtros persistentes (configurável)

### Gerenciamento de Colunas
- Modal com busca de colunas
- Drag & drop para reordenação
- Toggle de visibilidade
- Botão de reset
- Fixação de colunas (esquerda/direita)

### Exportação
- Exportação real para Excel (.xlsx)
- Configuração de nome do arquivo
- Opção de incluir apenas dados filtrados
- Respeita configuração de colunas exportáveis

### Expansão de Linha
- Conteúdo customizável via ReactNode
- Controle de estado de expansão
- Callback para mudanças de estado
- Ícones de expansão/colapso

### Loading States
- Skeleton loading para todas as colunas
- Overlay de loading
- Variação realista nos tamanhos dos skeletons
- Spinner animado

### Responsividade
- Ellipsis automático para texto longo
- Larguras flexíveis e configuráveis
- Scroll horizontal quando necessário
- Colunas fixas (pinning)
