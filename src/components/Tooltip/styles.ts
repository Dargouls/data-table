import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import styled from 'styled-components';

export const StyledTooltipContent = styled(TooltipPrimitive.Content)`
  background-color: var(--tooltip);
  color: var(--tooltip-foreground);
  z-index: 50;
  width: fit-content;
  border-radius: 0.375rem; /* rounded-md */
  padding: 0.375rem 0.75rem; /* px-3 py-1.5 */
  font-size: 0.75rem; /* text-xs */
  transform-origin: var(--radix-tooltip-content-transform-origin);

  /* Animações */
  &[data-state='delayed-open'] {
    animation: fadeIn 150ms ease-out, zoomIn 150ms ease-out;
  }

  &[data-state='closed'] {
    animation: fadeOut 150ms ease-in, zoomOut 150ms ease-in;
  }

  &[data-side='bottom'] {
    animation: slideInFromTop 150ms ease-out;
  }

  &[data-side='left'] {
    animation: slideInFromRight 150ms ease-out;
  }

  &[data-side='right'] {
    animation: slideInFromLeft 150ms ease-out;
  }

  &[data-side='top'] {
    animation: slideInFromBottom 150ms ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes zoomIn {
    from { transform: scale(0.95); }
    to { transform: scale(1); }
  }

  @keyframes zoomOut {
    from { transform: scale(1); }
    to { transform: scale(0.95); }
  }

  @keyframes slideInFromTop {
    from { transform: translateY(-0.5rem); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideInFromBottom {
    from { transform: translateY(0.5rem); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideInFromLeft {
    from { transform: translateX(-0.5rem); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideInFromRight {
    from { transform: translateX(0.5rem); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

export const StyledTooltipArrow = styled(TooltipPrimitive.Arrow)`
  background-color: var(--tooltip);
  fill: var(--tooltip);
  z-index: 50;
  width: 0.625rem; /* size-2.5 */
  height: 0.625rem;
  transform: translateY(calc(-50% - 2px)) rotate(45deg);
  border-radius: 2px;
`;
