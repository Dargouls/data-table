// Exemplo de uso da DataTable
import { useState } from 'react';
import type { DataTableColumn } from './datatable';
import { DataTable } from './datatable';

// Dados de exemplo
interface User {
	id: number;
	name: string;
	email: string;
	age: number;
	department: string;
	salary: number;
	status: 'active' | 'inactive';
}

const sampleData: User[] = [
	{
		id: 1,
		name: 'João Silva',
		email: 'joao@email.com',
		age: 30,
		department: 'TI',
		salary: 5000,
		status: 'active',
	},
	{
		id: 2,
		name: 'Maria Santos',
		email: 'maria@email.com',
		age: 25,
		department: 'RH',
		salary: 4500,
		status: 'active',
	},
	{
		id: 3,
		name: 'Pedro Costa',
		email: 'pedro@email.com',
		age: 35,
		department: 'Vendas',
		salary: 6000,
		status: 'inactive',
	},
	{
		id: 4,
		name: 'Ana Oliveira',
		email: 'ana@email.com',
		age: 28,
		department: 'Marketing',
		salary: 4800,
		status: 'active',
	},
	{
		id: 5,
		name: 'Carlos Ferreira',
		email: 'carlos@email.com',
		age: 42,
		department: 'TI',
		salary: 7000,
		status: 'active',
	},
	{
		id: 6,
		name: 'Lucia Pereira',
		email: 'lucia@email.com',
		age: 31,
		department: 'Financeiro',
		salary: 5500,
		status: 'active',
	},
	{
		id: 7,
		name: 'Roberto Lima',
		email: 'roberto@email.com',
		age: 29,
		department: 'Vendas',
		salary: 5200,
		status: 'inactive',
	},
	{
		id: 8,
		name: 'Fernanda Rocha',
		email: 'fernanda@email.com',
		age: 26,
		department: 'Marketing',
		salary: 4600,
		status: 'active',
	},
	{
		id: 9,
		name: 'Marcos Alves',
		email: 'marcos@email.com',
		age: 38,
		department: 'TI',
		salary: 6500,
		status: 'active',
	},
	{
		id: 10,
		name: 'Juliana Souza',
		email: 'juliana@email.com',
		age: 33,
		department: 'RH',
		salary: 5100,
		status: 'active',
	},
];

// Definição das colunas
const columns: DataTableColumn<User>[] = [
	{
		id: 'id',
		header: 'ID',
		accessorKey: 'id',
		minSize: 80,
		justifyContent: 'center',
		enableSorting: true,
		enablePinning: true,
	},
	{
		id: 'name',
		header: 'Nome',
		accessorKey: 'name',
		minSize: 100,
		enableSorting: true,
		enablePinning: true,
		enableColumnMenu: true,
	},
	{
		id: 'email',
		header: 'Email',
		accessorKey: 'email',
		minSize: 150,
		enableSorting: true,
		enablePinning: true,
		enableColumnMenu: true,
	},
	{
		id: 'age',
		header: 'Idade',
		accessorKey: 'age',
		minSize: 80,
		justifyContent: 'end',
		enableSorting: true,
	},
	{
		id: 'department',
		header: 'Departamento',
		accessorKey: 'department',
		minSize: 100,
		enableSorting: true,
	},
	{
		id: 'salary',
		header: 'Salário',
		accessorKey: 'salary',
		minSize: 120,
		justifyContent: 'end',
		enableSorting: true,
		cell: (value) => `R$ ${value.toLocaleString()}`,
	},
	{
		id: 'status',
		header: 'Status',
		accessorKey: 'status',
		minSize: 100,
		justifyContent: 'center',
		enableSorting: true,
		cell: (value) => (
			<span
				style={{
					padding: '4px 8px',
					borderRadius: '4px',
					fontSize: '12px',
					fontWeight: 'bold',
					color: value === 'active' ? '#059669' : '#DC2626',
					backgroundColor: value === 'active' ? '#D1FAE5' : '#FEE2E2',
				}}
			>
				{value === 'active' ? 'Ativo' : 'Inativo'}
			</span>
		),
	},
];

export function DataTableExample() {
	const [loading, setLoading] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

	// Componente para linha expandida
	const renderExpandedRow = (user: User) => (
		<div style={{ padding: '16px', backgroundColor: '#f8fafc' }}>
			<h4>Detalhes do Usuário</h4>
			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
				<div>
					<strong>ID:</strong> {user.id}
				</div>
				<div>
					<strong>Nome:</strong> {user.name}
				</div>
				<div>
					<strong>Email:</strong> {user.email}
				</div>
				<div>
					<strong>Idade:</strong> {user.age} anos
				</div>
				<div>
					<strong>Departamento:</strong> {user.department}
				</div>
				<div>
					<strong>Salário:</strong> R$ {user.salary.toLocaleString()}
				</div>
				<div>
					<strong>Status:</strong> {user.status === 'active' ? 'Ativo' : 'Inativo'}
				</div>
			</div>
		</div>
	);

	const handleToggleLoading = () => {
		setLoading(true);
		setTimeout(() => setLoading(false), 2000);
	};

	const handleSelectionChange = (selectedRows: User[]) => {
		setSelectedUsers(selectedRows);
		console.log('Linhas selecionadas:', selectedRows);
	};

	return (
		<div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
			<h1 style={{ color: '#111827', marginBottom: '8px' }}>Exemplo da DataTable</h1>
			<p style={{ color: '#6b7280', marginBottom: '24px' }}>
				DataTable completa com todas as funcionalidades implementadas
			</p>

			<div style={{ marginBottom: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
				<button
					onClick={handleToggleLoading}
					disabled={loading}
					style={{
						padding: '8px 16px',
						backgroundColor: loading ? '#e5e7eb' : '#2563eb',
						color: 'white',
						border: 'none',
						borderRadius: '6px',
						cursor: loading ? 'not-allowed' : 'pointer',
						fontSize: '14px',
						fontWeight: '500',
					}}
				>
					{loading ? 'Carregando...' : 'Simular Loading'}
				</button>

				{selectedUsers.length > 0 && (
					<div
						style={{
							padding: '8px 12px',
							backgroundColor: '#dbeafe',
							color: '#1e40af',
							borderRadius: '6px',
							fontSize: '14px',
							fontWeight: '500',
						}}
					>
						{selectedUsers.length} usuário(s) selecionado(s)
					</div>
				)}
			</div>

			<div style={{ width: '800px' }}>
				<DataTable
					data={sampleData}
					columns={columns}
					loading={loading}
					pagination={{
						enabled: true,
						initialPageSize: 5,
						pageSizeOptions: [5, 10, 20, 50],
					}}
					search={{
						enabled: true,
						searchableColumns: ['name', 'email', 'department'],
						placeholder: 'Buscar por nome, email ou departamento...',
					}}
					export={{
						enabled: true,
						filename: 'usuarios.xlsx',
					}}
					columnManagement={{
						enabled: true,
						allowReorder: true,
					}}
					advancedFilter
					rowSelection={{
						enabled: true,
						multiple: true,
						onSelectionChange: handleSelectionChange,
					}}
					rowExpansion={{
						enabled: true,
						renderExpandedRow,
					}}
				/>
			</div>
		</div>
	);
}
