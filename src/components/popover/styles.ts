import * as PopoverPrimitive from '@radix-ui/react-popover';
import styled, { keyframes } from 'styled-components';

// Defina as animações usando keyframes
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomOut = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0.95); }
`;

const zoomIn = keyframes`
  from { transform: scale(0.95); }
  to { transform: scale(1); }
`;

const slideInFromTop = keyframes`
  from { transform: translateY(-8px); }
  to { transform: translateY(0); }
`;

const slideInFromRight = keyframes`
  from { transform: translateX(8px); }
  to { transform: translateX(0); }
`;

const slideInFromLeft = keyframes`
  from { transform: translateX(-8px); }
  to { transform: translateX(0); }
`;

const slideInFromBottom = keyframes`
  from { transform: translateY(8px); }
  to { transform: translateY(0); }
`;

export const PopoverContentStyled = styled(PopoverPrimitive.Content)`
  z-index: 30000000;
  border-radius: 0.375rem;  
 border: 1px solid var(--popover-border); 
 padding: 1rem;

 box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);  
  outline: none;

	background-color: var(--popover-bg);
  color: var(--popover-foreground);

  transform-origin: var(--radix-popover-content-transform-origin);

  animation-duration: 200ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: forwards;

  &[data-state='open'] {
    animation-name: ${fadeIn}, ${zoomIn};
  }

  &[data-state='closed'] {
    animation-name: ${fadeOut}, ${zoomOut};
  }

  &[data-state='open'][data-side='bottom'] {
    animation-name: ${slideInFromTop}, ${fadeIn}, ${zoomIn};
  }
  &[data-state='open'][data-side='left'] {
    animation-name: ${slideInFromRight}, ${fadeIn}, ${zoomIn};
  }
  &[data-state='open'][data-side='right'] {
    animation-name: ${slideInFromLeft}, ${fadeIn}, ${zoomIn};
  }
  &[data-state='open'][data-side='top'] {
    animation-name: ${slideInFromBottom}, ${fadeIn}, ${zoomIn};
  }

`;

export const PopoverRoot = PopoverPrimitive.Root;
export const PopoverTriggerStyled = PopoverPrimitive.Trigger;
export const PopoverAnchorStyled = PopoverPrimitive.Anchor;
