declare module 'react-tippy' {
  import * as React from 'react';

  export interface TooltipProps {
    className?: string;
    title?: string;
    position?:
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end';
    distance?: number;
    offset?: number;
    animation?: 'shift' | 'perspective' | 'fade' | 'scale' | 'none';
    html?: React.ReactNode;
    inertia?: boolean;
    open?: boolean;
    onRequestClose?: () => void;
    theme?: string;
    arrow?: boolean;
    delay?: number[];
    hideOnClick?: boolean;
    trigger?: string;
    duration?: number;
    hideDuration?: number;
    interactive?: boolean;
    interactiveBorder?: number;
    disabled?: boolean;
    popperOptions?: Object;
    onShow?: () => void;
    onHide?: () => void;
  }

  class Tooltip extends React.Component<TooltipProps> {
    public hideTooltip(): void;
  }

  export { Tooltip };
}
