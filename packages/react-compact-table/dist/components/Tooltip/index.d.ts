import React from 'react';
export declare const TooltipGlobalStyle: import("styled-components").GlobalStyleComponent<{}, import("styled-components").DefaultTheme>;
export interface TooltipProps {
    className?: string;
    help: React.ReactNode;
    hideDelay?: number;
    maxWidth?: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
    theme?: 'light' | 'gray' | 'controller';
    duration?: number;
    hideDuration?: number;
    distance?: number;
    offset?: number;
    interactive?: boolean;
    arrow?: boolean;
    open?: boolean;
    title?: string;
    disabled?: boolean;
    /** `overflow` option to enable the overflow from the reference element. */
    overflow?: boolean;
    onRequestClose?: () => void;
    onShow?: () => void;
    onHide?: () => void;
}
declare const Tooltip: React.SFC<TooltipProps>;
export default Tooltip;
