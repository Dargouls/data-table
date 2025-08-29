import styled from 'styled-components';

export const DataTableContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  position: relative;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  position: relative;
  /* Garantir que sticky funcione */
  contain: layout style paint;
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  width: 300px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid ${(props) => (props.variant === 'primary' ? '#3b82f6' : '#d1d5db')};
  background: ${(props) => (props.variant === 'primary' ? '#3b82f6' : 'white')};
  color: ${(props) => (props.variant === 'primary' ? 'white' : '#374151')};
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${(props) => (props.variant === 'primary' ? '#2563eb' : '#f9fafb')};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  position: relative;
  table-layout: fixed;
`;

export const TableHead = styled.thead`
  background: #f9fafb;
`;

export const TableBody = styled.tbody`
  tr:hover {
    background: #f9fafb;
  }
`;

export const HeaderCell = styled.th<{
	sortable?: boolean;
	width?: number;
	pinned?: 'left' | 'right' | false;
	pinnedOffset?: number;
	spacing?: 'compact' | 'normal' | 'comfortable';
	justifyContent?: 'start' | 'center' | 'end';
}>`
  padding: ${(props) => {
		switch (props.spacing) {
			case 'compact':
				return '8px 12px';
			case 'comfortable':
				return '16px 20px';
			default:
				return '12px 16px';
		}
	}};
  text-align: ${(props) => {
		switch (props.justifyContent) {
			case 'center':
				return 'center';
			case 'end':
				return 'right';
			case 'start':
				return 'left';
			default:
				return 'left';
		}
	}};
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  cursor: ${(props) => (props.sortable ? 'pointer' : 'default')};
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  min-width: ${(props) => (props.width ? `${props.width}px` : '50px')};
  max-width: ${(props) => (props.width ? `${props.width}px` : 'none')};
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: ${(props) => (props.pinned ? 'sticky' : 'relative')};
  z-index: ${(props) => (props.pinned ? '20' : '1')};
  background-color: #f9fafb;

  /* Forçar sticky quando pinned */
  ${(props) =>
		props.pinned &&
		`
    position: sticky !important;
    background-color: #f9fafb !important;
  `}
	
  ${(props) =>
		props.pinned === 'left' &&
		`
    left: ${props.pinnedOffset || 0}px !important;
    border-right: 1px solid #e5e7eb;
  `}

  ${(props) =>
		props.pinned === 'right' &&
		`
    right: ${props.pinnedOffset || 0}px !important;
    border-left: 1px solid #e5e7eb;
  `}

  &:hover {
    background: ${(props) => (props.sortable ? '#f3f4f6' : props.pinned ? '#f3f4f6' : 'transparent')};
  }
`;

export const DataCell = styled.td<{
	width?: number;
	pinned?: 'left' | 'right' | false;
	pinnedOffset?: number;
	spacing?: 'compact' | 'normal' | 'comfortable';
	justifyContent?: 'start' | 'center' | 'end';
}>`
  padding: ${(props) => {
		switch (props.spacing) {
			case 'compact':
				return '8px 12px';
			case 'comfortable':
				return '16px 20px';
			default:
				return '12px 16px';
		}
	}};
  border-bottom: 1px solid #f3f4f6;
  color: #374151; 
	text-align: ${(props) => {
		switch (props.justifyContent) {
			case 'center':
				return 'center';
			case 'end':
				return 'right';
			case 'start':
				return 'left';
			default:
				return 'left';
		}
	}};
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  min-width: ${(props) => (props.width ? `${props.width}px` : '50px')};
  max-width: ${(props) => (props.width ? `${props.width}px` : 'none')};
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: ${(props) => (props.pinned ? 'sticky' : 'relative')};
  z-index: ${(props) => (props.pinned ? '10' : '1')};
  background: ${(props) => (props.pinned ? 'white' : 'inherit')};

  ${(props) =>
		props.pinned === 'left' &&
		`
    left: ${props.pinnedOffset || 0}px !important;
    border-right: 1px solid #e5e7eb;
  `}

  ${(props) =>
		props.pinned === 'right' &&
		`
    right: ${props.pinnedOffset || 0}px !important;
    border-left: 1px solid #e5e7eb;
  `}
`;

export const SortIcon = styled.span<{ direction?: 'asc' | 'desc' | null }>`
  margin-right: 8px;
  color: ${(props) => (props.direction ? '#3b82f6' : '#9ca3af')};
  
  &::before {
    content: '${(props) => (props.direction === 'asc' ? '↑' : props.direction === 'desc' ? '↓' : '↕')}';
  }
`;

export const TableFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
`;

export const PaginationInfo = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: 4px;
`;

export const PaginationButton = styled.button`
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: #f9fafb;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PageSizeSelect = styled.select`
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  color: #374151;
  cursor: pointer;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const SkeletonCell = styled.div<{ width?: number }>`
  height: 16px;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  color: #6b7280;
  text-align: center;
`;

export const Modal = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  
  &:hover {
    color: #374151;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const CheckboxList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px;
`;

export const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  color: #374151;
  
  &:hover {
    background: #f9fafb;
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin: 0;
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
`;

export const FilterActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  justify-content: flex-end;
`;

export const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: #fee2e2;
  }
`;

export const FilterList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 16px;
`;

export const AddFilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px dashed #d1d5db;
  background: white;
  color: #374151;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 16px;

  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }
`;

export const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ActiveFilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid #bfdbfe;
`;

export const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: #1e40af;
  cursor: pointer;
  padding: 0;
  font-size: 14px;

  &:hover {
    color: #dc2626;
  }
`;

export const ColumnMenu = styled.div`
  position: relative;
  display: inline-block;
  z-index: 30;
  background: #f9fafb;
  border-radius: 4px;
  padding: 2px;
`;

export const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    opacity: 1;
    background: #e5e7eb;
  }

  &:hover {
    opacity: 1;
    background: #e5e7eb;
    color: #374151;
  }
`;

export const ResizeHandle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background: transparent;
  z-index: 50;

  &:hover {
    background: #3b82f6;
  }

  &:active {
    background: #1d4ed8;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
