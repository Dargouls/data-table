/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react';
import * as React from 'react';
import {
	StyledCheckboxIndicator,
	StyledDropdownMenuCheckboxItem,
	StyledDropdownMenuContent,
	StyledDropdownMenuGroup,
	StyledDropdownMenuItem,
	StyledDropdownMenuLabel,
	StyledDropdownMenuPortal,
	StyledDropdownMenuRadioGroup,
	StyledDropdownMenuRadioItem,
	StyledDropdownMenuRoot,
	StyledDropdownMenuSeparator,
	StyledDropdownMenuShortcut,
	StyledDropdownMenuSub,
	StyledDropdownMenuSubContent,
	StyledDropdownMenuSubTrigger,
	StyledDropdownMenuTrigger,
	StyledRadioIndicator,
} from './styles';

interface DropdownMenuProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Root> {}

function DropdownMenu({ ...props }: DropdownMenuProps) {
	return <StyledDropdownMenuRoot data-slot='dropdown-menu' {...props} />;
}

interface DropdownMenuPortalProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Portal> {}

function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
	return <StyledDropdownMenuPortal data-slot='dropdown-menu-portal' {...props} />;
}

interface DropdownMenuTriggerProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> {}

function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
	return <StyledDropdownMenuTrigger data-slot='dropdown-menu-trigger' {...props} />;
}

interface DropdownMenuContentProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Content> {
	sideOffset?: number;
}

function DropdownMenuContent({ sideOffset = 4, ...props }: DropdownMenuContentProps) {
	return (
		<StyledDropdownMenuPortal>
			<StyledDropdownMenuContent data-slot='dropdown-menu-content' sideOffset={sideOffset} {...props} />
		</StyledDropdownMenuPortal>
	);
}

interface DropdownMenuGroupProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Group> {}

function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
	return <StyledDropdownMenuGroup data-slot='dropdown-menu-group' {...props} />;
}

interface DropdownMenuItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
	inset?: boolean;
	variant?: 'default' | 'destructive';
}

function DropdownMenuItem({ inset, variant = 'default', ...props }: DropdownMenuItemProps) {
	return (
		<StyledDropdownMenuItem
			data-slot='dropdown-menu-item'
			data-inset={inset}
			data-variant={variant}
			$inset={inset}
			$variant={variant}
			{...props}
		/>
	);
}

interface DropdownMenuCheckboxItemProps
	extends React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> {}

function DropdownMenuCheckboxItem({ children, checked, ...props }: DropdownMenuCheckboxItemProps) {
	return (
		<StyledDropdownMenuCheckboxItem data-slot='dropdown-menu-checkbox-item' checked={checked} {...props}>
			<StyledCheckboxIndicator>
				<DropdownMenuPrimitive.ItemIndicator>
					<CheckIcon style={{ width: '1rem', height: '1rem' }} />
				</DropdownMenuPrimitive.ItemIndicator>
			</StyledCheckboxIndicator>
			{children}
		</StyledDropdownMenuCheckboxItem>
	);
}

interface DropdownMenuRadioGroupProps extends React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup> {}

function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
	return <StyledDropdownMenuRadioGroup data-slot='dropdown-menu-radio-group' {...props} />;
}

interface DropdownMenuRadioItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> {}

function DropdownMenuRadioItem({ children, ...props }: DropdownMenuRadioItemProps) {
	return (
		<StyledDropdownMenuRadioItem data-slot='dropdown-menu-radio-item' {...props}>
			<StyledRadioIndicator>
				<DropdownMenuPrimitive.ItemIndicator>
					<CircleIcon style={{ width: '0.5rem', height: '0.5rem', fill: 'currentColor' }} />
				</DropdownMenuPrimitive.ItemIndicator>
			</StyledRadioIndicator>
			{children}
		</StyledDropdownMenuRadioItem>
	);
}

interface DropdownMenuLabelProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Label> {
	inset?: boolean;
}

function DropdownMenuLabel({ inset, ...props }: DropdownMenuLabelProps) {
	return (
		<StyledDropdownMenuLabel data-slot='dropdown-menu-label' data-inset={inset} $inset={inset} {...props} />
	);
}

interface DropdownMenuSeparatorProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Separator> {}

function DropdownMenuSeparator({ ...props }: DropdownMenuSeparatorProps) {
	return <StyledDropdownMenuSeparator data-slot='dropdown-menu-separator' {...props} />;
}

interface DropdownMenuShortcutProps extends React.ComponentProps<'span'> {}

function DropdownMenuShortcut({ ...props }: DropdownMenuShortcutProps) {
	return <StyledDropdownMenuShortcut data-slot='dropdown-menu-shortcut' {...props} />;
}

interface DropdownMenuSubProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Sub> {}

function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
	return <StyledDropdownMenuSub data-slot='dropdown-menu-sub' {...props} />;
}

interface DropdownMenuSubTriggerProps extends React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> {
	inset?: boolean;
}

function DropdownMenuSubTrigger({ inset, children, ...props }: DropdownMenuSubTriggerProps) {
	return (
		<StyledDropdownMenuSubTrigger
			data-slot='dropdown-menu-sub-trigger'
			data-inset={inset}
			$inset={inset}
			{...props}
		>
			{children}
			<ChevronRightIcon className='chevron-right' />
		</StyledDropdownMenuSubTrigger>
	);
}

interface DropdownMenuSubContentProps extends React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> {}

function DropdownMenuSubContent({ ...props }: DropdownMenuSubContentProps) {
	return <StyledDropdownMenuSubContent data-slot='dropdown-menu-sub-content' {...props} />;
}

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
};
