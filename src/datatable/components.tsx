import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Columns,
	Download,
	Filter,
	MoreHorizontal,
	Pin,
	PinOff,
	Search,
	X,
} from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../components/dropdown-menu';
import * as S from './styled';

// Hook para debounce
function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

// Interfaces
export interface DataTableColumn<T = any> {
	id: string;
	header: string;
	accessorKey: keyof T;
	minSize?: number;
	justifyContent?: 'start' | 'center' | 'end';
	enableSorting?: boolean;
	enablePinning?: boolean;
	enableColumnMenu?: boolean;
	pinned?: 'left' | 'right' | false;
	cell?: (value: any, row: T) => ReactNode;
}

export interface PaginationConfig {
	enabled: boolean;
	initialPageSize?: number;
	pageSizeOptions?: number[];
	serverSide?: boolean;
	totalItems?: number;
	onPageChange?: (page: number, pageSize: number) => void;
}

export interface SearchConfig {
	enabled: boolean;
	searchableColumns: string[];
	placeholder?: string;
}

export interface ExportConfig {
	enabled: boolean;
	filename?: string;
}

export interface ColumnManagementConfig {
	enabled: boolean;
	allowReorder?: boolean;
}

export interface FilterOperation {
	id: string;
	label: string;
	operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'gte' | 'lt' | 'lte';
}

export interface AdvancedFilter {
	id: string;
	column: string;
	operation: FilterOperation;
	value: any;
}

export interface RowExpansionConfig<T = any> {
	enabled: boolean;
	renderExpandedRow: (row: T) => ReactNode;
}

export interface RowSelectionConfig {
	enabled: boolean;
	multiple?: boolean;
	onSelectionChange?: (selectedRows: any[]) => void;
}

export interface RowActionsConfig<T = any> {
	enabled: boolean;
	renderActions: (row: T, index: number) => ReactNode;
	width?: number;
	position?: 'start' | 'end';
}

export interface DataTableProps<T = any> {
	data: T[];
	columns: DataTableColumn<T>[];
	loading?: boolean;
	pagination?: PaginationConfig;
	search?: SearchConfig;
	export?: ExportConfig;
	columnManagement?: ColumnManagementConfig;
	advancedFilter?: boolean;
	rowExpansion?: RowExpansionConfig<T>;
	rowSelection?: RowSelectionConfig;
	rowActions?: RowActionsConfig<T>;
	columnSpacing?: 'compact' | 'normal' | 'comfortable';
	className?: string;
}

// Hook para gerenciar estado da tabela
function useDataTable<T>(data: T[], columns: DataTableColumn<T>[], props: DataTableProps<T>) {
	const [searchTerm, setSearchTerm] = useState('');
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [currentPage, setCurrentPage] = useState(0);
	const [pageSize, setPageSize] = useState(props.pagination?.initialPageSize || 5);
	const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
	const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
	const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
	const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilter[]>([]);
	const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
	const [columnPinning, setColumnPinning] = useState<Record<string, 'left' | 'right' | false>>({});

	// Aplicar debounce na busca para melhor performance
	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	// Função para obter largura atual da coluna
	const getColumnWidth = useCallback(
		(columnId: string, minSize?: number) => {
			return columnWidths[columnId] || minSize || 150;
		},
		[columnWidths]
	);

	// Função para redimensionar coluna
	const resizeColumn = useCallback(
		(columnId: string, newWidth: number) => {
			const column = columns.find((col) => col.id === columnId);
			const minWidth = column?.minSize || 50;

			// Garantir que não seja menor que o minSize
			const finalWidth = Math.max(newWidth, minWidth);

			setColumnWidths((prev) => ({
				...prev,
				[columnId]: finalWidth,
			}));
		},
		[columns]
	);

	// Filtrar dados por busca e filtros avançados
	const filteredData = useMemo(() => {
		let result = data;

		// Aplicar busca global com debounce
		if (debouncedSearchTerm && props.search?.enabled) {
			result = result.filter((row) =>
				props.search!.searchableColumns.some((col) => {
					const value = row[col as keyof T];
					return value && String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase());
				})
			);
		}

		// Aplicar filtros avançados
		if (advancedFilters.length > 0) {
			result = result.filter((row) => {
				return advancedFilters.every((filter) => {
					const value = row[filter.column as keyof T];
					const filterValue = filter.value;

					if (value == null || filterValue == null) return false;

					const stringValue = String(value).toLowerCase();
					const stringFilterValue = String(filterValue).toLowerCase();

					switch (filter.operation.operator) {
						case 'equals':
							return stringValue === stringFilterValue;
						case 'contains':
							return stringValue.includes(stringFilterValue);
						case 'startsWith':
							return stringValue.startsWith(stringFilterValue);
						case 'endsWith':
							return stringValue.endsWith(stringFilterValue);
						case 'gt':
							return Number(value) > Number(filterValue);
						case 'gte':
							return Number(value) >= Number(filterValue);
						case 'lt':
							return Number(value) < Number(filterValue);
						case 'lte':
							return Number(value) <= Number(filterValue);
						default:
							return true;
					}
				});
			});
		}

		return result;
	}, [data, debouncedSearchTerm, props.search, advancedFilters]);

	// Ordenar dados
	const sortedData = useMemo(() => {
		if (!sortColumn) return filteredData;

		return [...filteredData].sort((a, b) => {
			const aVal = a[sortColumn as keyof T];
			const bVal = b[sortColumn as keyof T];

			if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
			if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});
	}, [filteredData, sortColumn, sortDirection]);

	// Paginar dados
	const paginatedData = useMemo(() => {
		if (!props.pagination?.enabled) return sortedData;

		// Se for paginação server-side, retornar os dados como estão
		if (props.pagination.serverSide) {
			return data;
		}

		const start = currentPage * pageSize;
		return sortedData.slice(start, start + pageSize);
	}, [sortedData, currentPage, pageSize, props.pagination, data]);

	// Colunas visíveis com pinning
	const { leftPinnedColumns, centerColumns, rightPinnedColumns, allVisibleColumns, columnOffsets } =
		useMemo(() => {
			const visible = columns.filter((col) => columnVisibility[col.id] !== false);

			const left: DataTableColumn<T>[] = [];
			const center: DataTableColumn<T>[] = [];
			const right: DataTableColumn<T>[] = [];

			visible.forEach((col) => {
				const pinning = columnPinning[col.id];
				if (pinning === 'left') {
					left.push(col);
				} else if (pinning === 'right') {
					right.push(col);
				} else {
					center.push(col);
				}
			});

			// Calcular offsets para colunas fixadas
			const offsets: Record<string, number> = {};

			// Calcular offsets para colunas fixadas à esquerda
			let leftOffset = 0;
			left.forEach((col) => {
				offsets[col.id] = leftOffset;
				leftOffset += getColumnWidth(col.id, col.minSize);
			});

			// Calcular offsets para colunas fixadas à direita
			let rightOffset = 0;
			[...right].reverse().forEach((col) => {
				offsets[col.id] = rightOffset;
				rightOffset += getColumnWidth(col.id, col.minSize);
			});

			return {
				leftPinnedColumns: left,
				centerColumns: center,
				rightPinnedColumns: right,
				allVisibleColumns: [...left, ...center, ...right],
				columnOffsets: offsets,
			};
		}, [columns, columnVisibility, columnPinning, columnWidths]);

	const handleSort = useCallback(
		(columnId: string) => {
			if (sortColumn === columnId) {
				setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
			} else {
				setSortColumn(columnId);
				setSortDirection('asc');
			}
		},
		[sortColumn]
	);

	const handleSearch = useCallback((term: string) => {
		setSearchTerm(term);
		setCurrentPage(0);
	}, []);

	const handlePageChange = useCallback(
		(newPage: number) => {
			setCurrentPage(newPage);
			if (props.pagination?.serverSide && props.pagination.onPageChange) {
				props.pagination.onPageChange(newPage, pageSize);
			}
		},
		[props.pagination, pageSize]
	);

	const handlePageSizeChange = useCallback(
		(newPageSize: number) => {
			setPageSize(newPageSize);
			setCurrentPage(0);
			if (props.pagination?.serverSide && props.pagination.onPageChange) {
				props.pagination.onPageChange(0, newPageSize);
			}
		},
		[props.pagination]
	);

	const toggleRowExpansion = useCallback((index: number) => {
		setExpandedRows((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(index)) {
				newSet.delete(index);
			} else {
				newSet.add(index);
			}
			return newSet;
		});
	}, []);

	const totalItems = props.pagination?.serverSide ? props.pagination.totalItems || 0 : sortedData.length;
	const totalPages = Math.ceil(totalItems / pageSize);
	const startIndex = currentPage * pageSize + 1;
	const endIndex = Math.min((currentPage + 1) * pageSize, totalItems);

	const addAdvancedFilter = useCallback((filter: AdvancedFilter) => {
		setAdvancedFilters((prev) => [...prev, filter]);
		setCurrentPage(0);
	}, []);

	const removeAdvancedFilter = useCallback((filterId: string) => {
		setAdvancedFilters((prev) => prev.filter((f) => f.id !== filterId));
		setCurrentPage(0);
	}, []);

	const clearAdvancedFilters = useCallback(() => {
		setAdvancedFilters([]);
		setCurrentPage(0);
	}, []);

	const toggleRowSelection = useCallback(
		(index: number) => {
			setSelectedRows((prev) => {
				const newSet = new Set(prev);
				if (newSet.has(index)) {
					newSet.delete(index);
				} else {
					// Só limpa a seleção se explicitamente definido como single selection
					if (props.rowSelection?.multiple === false) {
						newSet.clear();
					}
					newSet.add(index);
				}

				// Chamar callback se fornecido
				if (props.rowSelection?.onSelectionChange) {
					const selectedData = Array.from(newSet)
						.map((i) => paginatedData[i])
						.filter(Boolean);
					props.rowSelection.onSelectionChange(selectedData);
				}

				return newSet;
			});
		},
		[props.rowSelection, paginatedData]
	);

	const toggleAllRowsSelection = useCallback(() => {
		setSelectedRows((prev) => {
			const allSelected = prev.size === paginatedData.length && paginatedData.length > 0;
			const newSet = allSelected ? new Set<number>() : new Set(paginatedData.map((_, i) => i));

			// Chamar callback se fornecido
			if (props.rowSelection?.onSelectionChange) {
				const selectedData = Array.from(newSet)
					.map((i) => paginatedData[i])
					.filter(Boolean);
				props.rowSelection.onSelectionChange(selectedData);
			}

			return newSet;
		});
	}, [paginatedData, props.rowSelection]);

	const clearRowSelection = useCallback(() => {
		setSelectedRows(new Set());
		if (props.rowSelection?.onSelectionChange) {
			props.rowSelection.onSelectionChange([]);
		}
	}, [props.rowSelection]);

	const pinColumn = useCallback((columnId: string, position: 'left' | 'right') => {
		setColumnPinning((prev) => {
			const newPinning = { ...prev };

			// Encontrar e desfixar qualquer coluna já fixada na mesma posição
			Object.keys(newPinning).forEach((key) => {
				if (newPinning[key] === position) {
					newPinning[key] = false;
				}
			});

			// Fixar a nova coluna
			newPinning[columnId] = position;

			return newPinning;
		});
	}, []);

	const unpinColumn = useCallback((columnId: string) => {
		setColumnPinning((prev) => ({
			...prev,
			[columnId]: false,
		}));
	}, []);

	return {
		searchTerm,
		sortColumn,
		sortDirection,
		currentPage,
		pageSize,
		columnVisibility,
		columnPinning,
		expandedRows,
		selectedRows,
		advancedFilters,
		paginatedData,
		allVisibleColumns,
		leftPinnedColumns,
		centerColumns,
		rightPinnedColumns,
		columnOffsets,
		totalPages,
		startIndex,
		endIndex,
		totalItems,
		handleSort,
		handleSearch,
		handlePageChange,
		handlePageSizeChange,
		setCurrentPage,
		setPageSize,
		setColumnVisibility,
		toggleRowExpansion,
		toggleRowSelection,
		toggleAllRowsSelection,
		clearRowSelection,
		addAdvancedFilter,
		removeAdvancedFilter,
		clearAdvancedFilters,
		pinColumn,
		unpinColumn,
		getColumnWidth,
		resizeColumn,
	};
}

// Operações de filtro disponíveis
const FILTER_OPERATIONS: FilterOperation[] = [
	{ id: 'equals', label: 'Igual a', operator: 'equals' },
	{ id: 'contains', label: 'Contém', operator: 'contains' },
	{ id: 'startsWith', label: 'Começa com', operator: 'startsWith' },
	{ id: 'endsWith', label: 'Termina com', operator: 'endsWith' },
	{ id: 'gt', label: 'Maior que', operator: 'gt' },
	{ id: 'gte', label: 'Maior ou igual', operator: 'gte' },
	{ id: 'lt', label: 'Menor que', operator: 'lt' },
	{ id: 'lte', label: 'Menor ou igual', operator: 'lte' },
];

// Componente do modal de filtros avançados
interface AdvancedFilterModalProps<T> {
	isOpen: boolean;
	onClose: () => void;
	columns: DataTableColumn<T>[];
	filters: AdvancedFilter[];
	onAddFilter: (filter: AdvancedFilter) => void;
	onRemoveFilter: (filterId: string) => void;
	onClearFilters: () => void;
}

function AdvancedFilterModal<T>({
	isOpen,
	onClose,
	columns,
	filters,
	onAddFilter,
	onRemoveFilter,
	onClearFilters,
}: AdvancedFilterModalProps<T>) {
	const [newFilter, setNewFilter] = useState({
		column: '',
		operation: '',
		value: '',
	});

	const handleAddFilter = () => {
		if (!newFilter.column || !newFilter.operation || !newFilter.value) return;

		const operation = FILTER_OPERATIONS.find((op) => op.id === newFilter.operation);
		if (!operation) return;

		const filter: AdvancedFilter = {
			id: `${newFilter.column}-${newFilter.operation}-${Date.now()}`,
			column: newFilter.column,
			operation,
			value: newFilter.value,
		};

		onAddFilter(filter);
		setNewFilter({ column: '', operation: '', value: '' });
	};

	return (
		<S.Modal isOpen={isOpen} onClick={onClose}>
			<S.ModalContent onClick={(e) => e.stopPropagation()}>
				<S.ModalHeader>
					<S.ModalTitle>Filtros Avançados</S.ModalTitle>
					<S.CloseButton onClick={onClose}>
						<X size={20} />
					</S.CloseButton>
				</S.ModalHeader>

				{/* Filtros ativos */}
				{filters.length > 0 && (
					<>
						<h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
							Filtros Ativos ({filters.length})
						</h4>
						<S.ActiveFiltersContainer>
							{filters.map((filter) => (
								<S.ActiveFilterTag key={filter.id}>
									<span>
										{columns.find((col) => col.accessorKey === filter.column)?.header}{' '}
										{filter.operation.label} "{filter.value}"
									</span>
									<S.RemoveTagButton onClick={() => onRemoveFilter(filter.id)}>×</S.RemoveTagButton>
								</S.ActiveFilterTag>
							))}
						</S.ActiveFiltersContainer>
					</>
				)}

				{/* Adicionar novo filtro */}
				<h4 style={{ margin: '16px 0 12px 0', fontSize: '14px', fontWeight: '600' }}>Adicionar Filtro</h4>

				<S.FilterRow>
					<S.Select
						value={newFilter.column}
						onChange={(e) => setNewFilter((prev) => ({ ...prev, column: e.target.value }))}
						style={{ flex: 1 }}
					>
						<option value=''>Selecione uma coluna</option>
						{columns.map((column) => (
							<option key={column.id} value={column.accessorKey as string}>
								{column.header}
							</option>
						))}
					</S.Select>

					<S.Select
						value={newFilter.operation}
						onChange={(e) => setNewFilter((prev) => ({ ...prev, operation: e.target.value }))}
						style={{ flex: 1 }}
					>
						<option value=''>Selecione uma operação</option>
						{FILTER_OPERATIONS.map((operation) => (
							<option key={operation.id} value={operation.id}>
								{operation.label}
							</option>
						))}
					</S.Select>

					<S.Input
						type='text'
						placeholder='Valor'
						value={newFilter.value}
						onChange={(e) => setNewFilter((prev) => ({ ...prev, value: e.target.value }))}
						style={{ flex: 1 }}
					/>

					<S.Button
						onClick={handleAddFilter}
						disabled={!newFilter.column || !newFilter.operation || !newFilter.value}
						variant='primary'
					>
						Adicionar
					</S.Button>
				</S.FilterRow>

				<S.FilterActions>
					{filters.length > 0 && <S.Button onClick={onClearFilters}>Limpar Todos</S.Button>}
					<S.Button onClick={onClose} variant='primary'>
						Aplicar
					</S.Button>
				</S.FilterActions>
			</S.ModalContent>
		</S.Modal>
	);
}

// Componente principal DataTable
export function DataTable<T extends Record<string, any>>(props: DataTableProps<T>) {
	const { data, columns, loading = false, className } = props;

	const {
		searchTerm,
		sortColumn,
		sortDirection,
		currentPage,
		pageSize,
		columnVisibility,
		columnPinning,
		expandedRows,
		selectedRows,
		advancedFilters,
		paginatedData,
		allVisibleColumns,
		leftPinnedColumns,
		centerColumns,
		rightPinnedColumns,
		columnOffsets,
		totalPages,
		startIndex,
		endIndex,
		totalItems,
		handleSort,
		handleSearch,
		handlePageChange,
		handlePageSizeChange,
		setColumnVisibility,
		toggleRowExpansion,
		toggleRowSelection,
		toggleAllRowsSelection,
		addAdvancedFilter,
		removeAdvancedFilter,
		clearAdvancedFilters,
		pinColumn,
		unpinColumn,
		getColumnWidth,
		resizeColumn,
	} = useDataTable(data, columns, props);

	const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

	// Função para fixar colunas
	const handleFixColumn = useCallback(
		(columnId: string, position: 'left' | 'right') => {
			pinColumn(columnId, position);
		},
		[pinColumn]
	);

	// Função para desfixar colunas
	const handleUnpinColumn = useCallback(
		(columnId: string) => {
			unpinColumn(columnId);
		},
		[unpinColumn]
	);

	// Lógica de redimensionamento
	const handleMouseDown = useCallback(
		(e: React.MouseEvent, columnId: string) => {
			e.preventDefault();
			e.stopPropagation();

			const startX = e.clientX;
			const startWidth = getColumnWidth(columnId);

			const handleMouseMove = (e: MouseEvent) => {
				const deltaX = e.clientX - startX;
				const newWidth = startWidth + deltaX;
				resizeColumn(columnId, newWidth);
			};

			const handleMouseUp = () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};

			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		},
		[getColumnWidth, resizeColumn]
	);

	// Exportar para Excel
	const handleExport = useCallback(async () => {
		if (!props.export?.enabled) return;

		try {
			const XLSX = await import('xlsx');
			const exportData = paginatedData.map((row) => {
				const exportRow: any = {};
				allVisibleColumns.forEach((col) => {
					exportRow[col.header] = row[col.accessorKey];
				});
				return exportRow;
			});

			const workbook = XLSX.utils.book_new();
			const worksheet = XLSX.utils.json_to_sheet(exportData);
			XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
			XLSX.writeFile(workbook, props.export?.filename || 'dados.xlsx');
		} catch (error) {
			console.error('Erro ao exportar:', error);
		}
	}, [paginatedData, allVisibleColumns, props.export]);

	// Renderizar célula
	const renderCell = useCallback(
		(column: DataTableColumn<T>, row: T, rowIndex: number) => {
			if (loading) {
				return <S.SkeletonCell width={Math.random() * 100 + 50} />;
			}

			const value = row[column.accessorKey];

			if (column.cell) {
				return column.cell(value, row);
			}

			return String(value || '');
		},
		[loading]
	);

	const pageSizeOptions = props.pagination?.pageSizeOptions || [5, 10, 20, 50];

	return (
		<S.DataTableContainer className={className}>
			{loading && (
				<S.LoadingOverlay>
					<S.Spinner />
				</S.LoadingOverlay>
			)}

			{/* Header com busca e ações */}
			<S.TableHeader>
				<S.SearchContainer>
					{props.search?.enabled && (
						<>
							<Search size={16} />
							<S.SearchInput
								type='text'
								placeholder={props.search.placeholder || 'Buscar...'}
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</>
					)}
				</S.SearchContainer>

				<S.ActionsContainer>
					{props.export?.enabled && (
						<S.Button onClick={handleExport}>
							<Download size={16} />
							Exportar
						</S.Button>
					)}

					{props.columnManagement?.enabled && (
						<S.Button onClick={() => setIsColumnModalOpen(true)}>
							<Columns size={16} />
							Colunas
						</S.Button>
					)}

					{props.advancedFilter && (
						<S.Button onClick={() => setIsFilterModalOpen(true)}>
							<Filter size={16} />
							Filtros
						</S.Button>
					)}
				</S.ActionsContainer>
			</S.TableHeader>

			{/* Tabela */}
			<S.TableWrapper>
				<S.Table>
					<S.TableHead>
						<tr>
							{props.rowSelection?.enabled && (
								<S.HeaderCell
									width={40}
									spacing={props.columnSpacing || 'normal'}
									style={{ textOverflow: 'inherit' }}
								>
									{props.rowSelection.multiple !== false && (
										<S.Checkbox
											checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
											ref={(el) => {
												if (el) {
													const isIndeterminate =
														selectedRows.size > 0 && selectedRows.size < paginatedData.length;
													el.indeterminate = isIndeterminate;
												}
											}}
											onChange={toggleAllRowsSelection}
										/>
									)}
								</S.HeaderCell>
							)}
							{props.rowExpansion?.enabled && (
								<S.HeaderCell width={40} spacing={props.columnSpacing || 'normal'}></S.HeaderCell>
							)}
							{props.rowActions?.enabled && props.rowActions.position === 'start' && (
								<S.HeaderCell
									width={props.rowActions.width || 120}
									spacing={props.columnSpacing || 'normal'}
									justifyContent='center'
								>
									Ações
								</S.HeaderCell>
							)}
							{allVisibleColumns.map((column) => {
								const pinning = columnPinning[column.id];
								const offset = columnOffsets[column.id] || 0;

								return (
									<S.HeaderCell
										key={column.id}
										sortable={column.enableSorting}
										width={getColumnWidth(column.id, column.minSize)}
										pinned={pinning}
										pinnedOffset={offset}
										spacing={props.columnSpacing || 'normal'}
										justifyContent={column.justifyContent || 'center'}
										onClick={column.enableSorting ? () => handleSort(column.id) : undefined}
										style={
											pinning
												? {
														position: 'sticky',
														left: pinning === 'left' ? `${offset}px` : undefined,
														right: pinning === 'right' ? `${offset}px` : undefined,
														zIndex: 20,
														backgroundColor: '#f9fafb',
												  }
												: undefined
										}
									>
										<div
											style={{
												position: 'relative',
												display: 'flex',
												alignItems: 'center',
												paddingRight: column.enablePinning !== false ? '40px' : '8px', // Espaço para o botão + handle
											}}
										>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													overflow: 'hidden',
													flex: 1,
												}}
											>
												{column.enableSorting && (
													<S.SortIcon direction={sortColumn === column.id ? sortDirection : null} />
												)}
												<span
													style={{
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														whiteSpace: 'nowrap',
													}}
												>
													{column.header}
												</span>
												{columnPinning[column.id] && (
													<Pin
														size={12}
														style={{
															marginLeft: '6px',
															color: '#3b82f6',
															opacity: 0.7,
															flexShrink: 0,
														}}
													/>
												)}
											</div>

											{column.enablePinning !== false && (
												<S.ColumnMenu
													style={{
														position: 'absolute',
														right: '8px',
														top: '50%',
														transform: 'translateY(-50%)',
													}}
												>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<S.MenuButton
																onClick={(e) => {
																	e.stopPropagation();
																}}
															>
																<MoreHorizontal size={14} />
															</S.MenuButton>
														</DropdownMenuTrigger>
														<DropdownMenuContent align='start'>
															{(() => {
																const currentPinning = columnPinning[column.id];

																if (currentPinning) {
																	// Se a coluna está fixada, mostrar opção de desfixar
																	return (
																		<DropdownMenuItem onClick={() => handleUnpinColumn(column.id)}>
																			<PinOff size={14} style={{ marginRight: '8px' }} />
																			Desfixar coluna
																		</DropdownMenuItem>
																	);
																} else {
																	// Se não está fixada, mostrar opções de fixar
																	return (
																		<>
																			<DropdownMenuItem onClick={() => handleFixColumn(column.id, 'left')}>
																				<Pin size={14} style={{ marginRight: '8px' }} />
																				Fixar à esquerda
																			</DropdownMenuItem>
																			<DropdownMenuItem onClick={() => handleFixColumn(column.id, 'right')}>
																				<Pin size={14} style={{ marginRight: '8px' }} />
																				Fixar à direita
																			</DropdownMenuItem>
																		</>
																	);
																}
															})()}
														</DropdownMenuContent>
													</DropdownMenu>
												</S.ColumnMenu>
											)}
										</div>

										{/* Handle de redimensionamento */}
										<S.ResizeHandle onMouseDown={(e) => handleMouseDown(e, column.id)} />
									</S.HeaderCell>
								);
							})}
							{props.rowActions?.enabled && props.rowActions.position !== 'start' && (
								<S.HeaderCell
									width={props.rowActions.width || 120}
									spacing={props.columnSpacing || 'normal'}
									justifyContent='center'
								>
									Ações
								</S.HeaderCell>
							)}
						</tr>
					</S.TableHead>

					<S.TableBody>
						{paginatedData.length > 0 ? (
							paginatedData.map((row, index) => (
								<React.Fragment key={index}>
									<tr>
										{props.rowSelection?.enabled && (
											<S.DataCell
												width={40}
												spacing={props.columnSpacing || 'normal'}
												style={{ textOverflow: 'inherit' }}
											>
												<S.Checkbox
													checked={selectedRows.has(index)}
													onChange={() => toggleRowSelection(index)}
												/>
											</S.DataCell>
										)}
										{props.rowExpansion?.enabled && (
											<S.DataCell width={40} spacing={props.columnSpacing || 'normal'}>
												<button
													onClick={() => toggleRowExpansion(index)}
													style={{
														background: 'none',
														border: 'none',
														cursor: 'pointer',
														padding: '4px',
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														outline: 'none',
													}}
												>
													{expandedRows.has(index) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
												</button>
											</S.DataCell>
										)}
										{props.rowActions?.enabled && props.rowActions.position === 'start' && (
											<S.DataCell
												width={props.rowActions.width || 120}
												spacing={props.columnSpacing || 'normal'}
												justifyContent='center'
											>
												<S.ActionsContainer>{props.rowActions.renderActions(row, index)}</S.ActionsContainer>
											</S.DataCell>
										)}

										{allVisibleColumns.map((column) => {
											const pinning = columnPinning[column.id];
											const offset = columnOffsets[column.id] || 0;

											return (
												<S.DataCell
													key={column.id}
													width={getColumnWidth(column.id, column.minSize)}
													pinned={pinning}
													pinnedOffset={offset}
													spacing={props.columnSpacing || 'normal'}
													justifyContent={column.justifyContent || 'start'}
													style={
														pinning
															? {
																	position: 'sticky',
																	left: pinning === 'left' ? `${offset}px` : undefined,
																	right: pinning === 'right' ? `${offset}px` : undefined,
																	zIndex: 10,
																	backgroundColor: 'white',
															  }
															: undefined
													}
												>
													{renderCell(column, row, index)}
												</S.DataCell>
											);
										})}
										{props.rowActions?.enabled && props.rowActions.position !== 'start' && (
											<S.DataCell
												width={props.rowActions.width || 120}
												spacing={props.columnSpacing || 'normal'}
												justifyContent='center'
											>
												<S.ActionsContainer>{props.rowActions.renderActions(row, index)}</S.ActionsContainer>
											</S.DataCell>
										)}
									</tr>

									{props.rowExpansion?.enabled && expandedRows.has(index) && (
										<tr>
											<td
												colSpan={
													allVisibleColumns.length +
													(props.rowSelection?.enabled ? 1 : 0) +
													(props.rowExpansion?.enabled ? 1 : 0) +
													(props.rowActions?.enabled ? 1 : 0)
												}
												style={{
													padding: '16px',
													backgroundColor: '#f9fafb',
													borderTop: '1px solid #e5e7eb',
												}}
											>
												{props.rowExpansion.renderExpandedRow(row)}
											</td>
										</tr>
									)}
								</React.Fragment>
							))
						) : (
							<tr>
								<td
									colSpan={
										allVisibleColumns.length +
										(props.rowSelection?.enabled ? 1 : 0) +
										(props.rowExpansion?.enabled ? 1 : 0)
									}
								>
									<S.EmptyState>
										<div>Nenhum dado encontrado</div>
									</S.EmptyState>
								</td>
							</tr>
						)}
					</S.TableBody>
				</S.Table>
			</S.TableWrapper>

			{/* Footer com paginação */}
			{props.pagination?.enabled && (
				<S.TableFooter>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						<span>Mostrar:</span>
						<S.PageSizeSelect
							value={pageSize}
							onChange={(e) => {
								handlePageSizeChange(Number(e.target.value));
							}}
						>
							{pageSizeOptions.map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</S.PageSizeSelect>
					</div>

					<S.PaginationInfo>
						{totalItems > 0 ? `${startIndex}-${endIndex} de ${totalItems}` : '0 de 0'}
					</S.PaginationInfo>

					<S.PaginationControls>
						<S.PaginationButton onClick={() => handlePageChange(0)} disabled={currentPage === 0}>
							<ChevronsLeft size={16} />
						</S.PaginationButton>

						<S.PaginationButton
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 0}
						>
							<ChevronLeft size={16} />
						</S.PaginationButton>

						<S.PaginationButton
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage >= totalPages - 1}
						>
							<ChevronRight size={16} />
						</S.PaginationButton>

						<S.PaginationButton
							onClick={() => handlePageChange(totalPages - 1)}
							disabled={currentPage >= totalPages - 1}
						>
							<ChevronsRight size={16} />
						</S.PaginationButton>
					</S.PaginationControls>
				</S.TableFooter>
			)}

			{/* Modal de gerenciamento de colunas */}
			{isColumnModalOpen && (
				<S.Modal isOpen={isColumnModalOpen} onClick={() => setIsColumnModalOpen(false)}>
					<S.ModalContent onClick={(e) => e.stopPropagation()}>
						<S.ModalHeader>
							<S.ModalTitle>Gerenciar Colunas</S.ModalTitle>
							<S.CloseButton onClick={() => setIsColumnModalOpen(false)}>
								<X size={20} />
							</S.CloseButton>
						</S.ModalHeader>

						<S.CheckboxList>
							{columns.map((column) => (
								<S.CheckboxItem key={column.id}>
									<S.Checkbox
										checked={columnVisibility[column.id] !== false}
										onChange={(e) =>
											setColumnVisibility((prev) => ({
												...prev,
												[column.id]: e.target.checked,
											}))
										}
									/>
									<span>{column.header}</span>
								</S.CheckboxItem>
							))}
						</S.CheckboxList>
					</S.ModalContent>
				</S.Modal>
			)}

			{/* Modal de filtros avançados */}
			{isFilterModalOpen && (
				<AdvancedFilterModal
					isOpen={isFilterModalOpen}
					onClose={() => setIsFilterModalOpen(false)}
					columns={allVisibleColumns}
					filters={advancedFilters}
					onAddFilter={addAdvancedFilter}
					onRemoveFilter={removeAdvancedFilter}
					onClearFilters={clearAdvancedFilters}
				/>
			)}
		</S.DataTableContainer>
	);
}
