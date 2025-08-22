import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

// Importe os componentes estilizados
import { PopoverAnchorStyled, PopoverContentStyled, PopoverRoot, PopoverTriggerStyled } from './styles';

// O componente PopoverRoot não tem estilos diretos, mas é importante para a estrutura
function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
	return <PopoverRoot data-slot='popover' {...props} />;
}

// O componente PopoverTriggerStyled não tem estilos diretos
function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
	return <PopoverTriggerStyled data-slot='popover-trigger' {...props} />;
}

// O PopoverContent usa o componente estilizado
function PopoverContent({
	className, // className ainda pode ser usado para estilos adicionais
	align = 'center',
	sideOffset = 4,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverContentStyled
				data-slot='popover-content'
				align={align}
				sideOffset={sideOffset}
				className={className}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
}

// O componente PopoverAnchorStyled não tem estilos diretos
function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
	return <PopoverAnchorStyled data-slot='popover-anchor' {...props} />;
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
