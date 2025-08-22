import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import styled, { css, keyframes } from 'styled-components';

// Animações
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const zoomIn95 = keyframes`
  from { transform: scale(0.95); }
  to { transform: scale(1); }
`;

const zoomOut95 = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0.95); }
`;

const slideInFromTop2 = keyframes`
  from { transform: translateY(-0.5rem); }
  to { transform: translateY(0); }
`;

const slideInFromBottom2 = keyframes`
  from { transform: translateY(0.5rem); }
  to { transform: translateY(0); }
`;

const slideInFromLeft2 = keyframes`
  from { transform: translateX(-0.5rem); }
  to { transform: translateX(0); }
`;

const slideInFromRight2 = keyframes`
  from { transform: translateX(0.5rem); }
  to { transform: translateX(0); }
`;

// Styled Components
export const StyledDropdownMenuRoot = styled(DropdownMenuPrimitive.Root)``;

export const StyledDropdownMenuPortal = styled(DropdownMenuPrimitive.Portal)``;

export const StyledDropdownMenuTrigger = styled(DropdownMenuPrimitive.Trigger)``;

export const StyledDropdownMenuContent = styled(DropdownMenuPrimitive.Content)`
  z-index: 999999999;
  max-height: var(--radix-dropdown-menu-content-available-height);
  min-width: 8rem;
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 0.375rem;
  border: 1px solid hsl(var(--border));
  background-color: var(--popover-bg);
  color: hsl(var(--popover-foreground));
  padding: 0.25rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

  &[data-state="open"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out;
  }

  &[data-state="closed"] {
    animation: ${fadeOut} 0.2s ease-in, ${zoomOut95} 0.2s ease-in;
  }

  &[data-side="bottom"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out, ${slideInFromTop2} 0.2s ease-out;
  }

  &[data-side="left"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out, ${slideInFromRight2} 0.2s ease-out;
  }

  &[data-side="right"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out, ${slideInFromLeft2} 0.2s ease-out;
  }

  &[data-side="top"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out, ${slideInFromBottom2} 0.2s ease-out;
  }
`;

export const StyledDropdownMenuGroup = styled(DropdownMenuPrimitive.Group)``;

export const StyledDropdownMenuItem = styled(DropdownMenuPrimitive.Item)<{
	$inset?: boolean;
	$variant?: 'default' | 'destructive';
}>`
  position: relative;
  display: flex;
  cursor: default;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;

  ${(props) =>
		props.$inset &&
		css`
    padding-left: 2rem;
  `}

  ${(props) =>
		props.$variant === 'destructive' &&
		css`
    color: hsl(var(--destructive));
    
    &:focus {
      background-color: hsl(var(--destructive) / 0.1);
      color: hsl(var(--destructive));
    }

    @media (prefers-color-scheme: dark) {
      &:focus {
        background-color: hsl(var(--destructive) / 0.2);
      }
    }

    svg {
      color: hsl(var(--destructive)) !important;
    }
  `}

  &:focus {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  svg {
    pointer-events: none;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    
    &:not([class*='text-']) {
      color: hsl(var(--muted-foreground));
    }
  }
`;

export const StyledDropdownMenuCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  position: relative;
  display: flex;
  cursor: default;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;

  &:focus {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  svg {
    pointer-events: none;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }
`;

export const StyledCheckboxIndicator = styled.span`
  pointer-events: none;
  position: absolute;
  left: 0.5rem;
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  align-items: center;
  justify-content: center;
`;

export const StyledDropdownMenuRadioGroup = styled(DropdownMenuPrimitive.RadioGroup)``;

export const StyledDropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  position: relative;
  display: flex;
  cursor: default;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;

  &:focus {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }

  svg {
    pointer-events: none;
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
  }
`;

export const StyledRadioIndicator = styled.span`
  pointer-events: none;
  position: absolute;
  left: 0.5rem;
  display: flex;
  width: 0.875rem;
  height: 0.875rem;
  align-items: center;
  justify-content: center;
`;

export const StyledDropdownMenuLabel = styled(DropdownMenuPrimitive.Label)<{
	$inset?: boolean;
}>`
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;

  ${(props) =>
		props.$inset &&
		css`
    padding-left: 2rem;
  `}
`;

export const StyledDropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator)`
  background-color: hsl(var(--border));
  margin: 0.25rem -0.25rem;
  height: 1px;
`;

export const StyledDropdownMenuShortcut = styled.span`
  color: hsl(var(--muted-foreground));
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
`;

export const StyledDropdownMenuSub = styled(DropdownMenuPrimitive.Sub)``;

export const StyledDropdownMenuSubTrigger = styled(DropdownMenuPrimitive.SubTrigger)<{
	$inset?: boolean;
}>`
  display: flex;
  cursor: default;
  align-items: center;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;

  ${(props) =>
		props.$inset &&
		css`
    padding-left: 2rem;
  `}

  &:focus {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &[data-state="open"] {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  .chevron-right {
    margin-left: auto;
    width: 1rem;
    height: 1rem;
  }
`;

export const StyledDropdownMenuSubContent = styled(DropdownMenuPrimitive.SubContent)`
  z-index: 999999999;
  min-width: 8rem;
  transform-origin: var(--radix-dropdown-menu-content-transform-origin);
  overflow: hidden;
  border-radius: 0.375rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  padding: 0.25rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  &[data-state="open"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out;
  }

  &[data-state="closed"] {
    animation: ${fadeOut} 0.2s ease-in, ${zoomOut95} 0.2s ease-in;
  }

  &[data-side="bottom"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out, ${slideInFromTop2} 0.2s ease-out;
  }

  &[data-side="left"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out, ${slideInFromRight2} 0.2s ease-out;
  }

  &[data-side="right"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out, ${slideInFromLeft2} 0.2s ease-out;
  }

  &[data-side="top"] {
    animation: ${fadeIn} 0.2s ease-out, ${zoomIn95} 0.2s ease-out, ${slideInFromBottom2} 0.2s ease-out;
  }
`;
