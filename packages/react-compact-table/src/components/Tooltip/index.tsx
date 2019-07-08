import React from 'react';
import { Tooltip as TippyTooltip } from 'react-tippy';
import styled, { createGlobalStyle } from 'styled-components';

import { v3Colors } from '../../lib/styleColors';
import { boxShadow } from '../../lib/styleUtils';

export const TooltipGlobalStyle = createGlobalStyle`
  .tippy-popper {
    max-width: none;
  }

  .tippy-popper .tippy-tooltip {
    padding: 8px 10px;
    font-size: 12px;
    background-color: ${v3Colors.N100};
    border-radius: 8px;
    &:not(.light-theme) {
      .enter {
        background-color: ${v3Colors.N100};
      }
    }
    &.light-theme {
      padding: 10px 15px;
      border-top: 1px solid ${v3Colors.N50};
      border-left: 1px solid ${v3Colors.N50};
      border-right: 1px solid ${v3Colors.N50};
      border-radius: 2px !important;
      color: ${v3Colors.N300} !important;
      background-color: ${v3Colors.N10} !important;
      ${boxShadow()};
    }
    &.controller-theme {
      padding: 0;
      border-radius: 0;
      background: ${v3Colors.N0};
      color: ${v3Colors.N500};
      ${boxShadow()};
      .enter {
        display: none;
      }
    }
    .tippy-tooltip-content {
      a {
        color: ${v3Colors.B100};
        text-decoration: none;
      }
    }
  }

  /* up arrow */
  .tippy-popper[x-placement=bottom] .tippy-tooltip.light-theme .arrow-regular {
    top: 0;
    width: 50px;
    height: 30px;
    overflow: hidden;
    border: 0 !important;
    transform: translateY(-100%);

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 9px;
      height: 9px;
      background: ${v3Colors.N10};
      border: 1px solid ${v3Colors.N50};
      transform: translateX(-50%) translateY(9px) rotate(45deg);
    }
  }

  /* up arrow && gray-theme */
  .tippy-popper[x-placement=bottom] .tippy-tooltip.gray-theme .arrow-regular {
    border-bottom: 7px solid ${v3Colors.N100};
  }

  /* down arrow && light-theme */
  .tippy-popper[x-placement=top] .tippy-tooltip.light-theme .arrow-regular {
    top: 100%;
    width: 50px;
    height: 30px;
    overflow: hidden;
    border: 0 !important;

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 50%;
      width: 9px;
      height: 9px;
      background: ${v3Colors.N10};
      transform: translateX(-50%) translateY(-50%) rotate(-45deg);
      ${boxShadow(0.5)};
    }
  }

  /* down arrow && gray-theme */
  .tippy-popper[x-placement=top] .tippy-tooltip.gray-theme .arrow-regular {
    border-top: 7px solid ${v3Colors.N100};
  }

  /* left arrow */
  .tippy-popper[x-placement=right] .tippy-tooltip.light-theme .arrow-regular {
    left: 0;
    width: 30px;
    height: 30px;
    overflow: hidden;
    border: 0 !important;
    transform: translateX(-100%);

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      right: 0;
      width: 9px;
      height: 9px;
      background: ${v3Colors.N10};
      transform: translateX(50%) translateY(-50%) rotate(45deg);
      ${boxShadow(0.5)};
    }
  }

  /* right arrow */
  .tippy-popper[x-placement=left] .tippy-tooltip.light-theme .arrow-regular {
    left: 100%;
    width: 30px;
    height: 30px;
    overflow: hidden;
    border: 0 !important;

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      width: 9px;
      height: 9px;
      background: ${v3Colors.N10};
      transform: translateX(-50%) translateY(-50%) rotate(-45deg);
      ${boxShadow(0.5)};
    }
  }

  .tippy-popper .tippy-tooltip.light-theme .enter {
    background-color: ${v3Colors.N10} !important;
  }
`;

const TooltipWrapper = styled.div`
  max-width: ${(props: { maxWidth: string }) => (props.maxWidth ? props.maxWidth : '360px')};
  text-align: left;
`;

export interface TooltipProps {
  className?: string;
  help: React.ReactNode;
  hideDelay?: number;
  maxWidth?: string;
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';
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

const Tooltip: React.SFC<TooltipProps> = (props) => {
  const {
    className,
    help,
    theme,
    duration,
    hideDuration,
    hideDelay,
    maxWidth,
    position,
    distance,
    offset,
    interactive,
    open,
    disabled,
    arrow,
    title,
    overflow,
    onRequestClose,
    children,
    onShow,
    onHide
  } = props;
  const content =
    typeof help === 'string' ? (
      <TooltipWrapper dangerouslySetInnerHTML={{ __html: help }} maxWidth={maxWidth} />
    ) : (
      help
    );
  const popperOptions = overflow && {
    modifiers: { preventOverflow: { escapeWithReference: true } }
  };
  return (
    <TippyTooltip
      className={className}
      theme={theme || ''}
      animation="fade"
      duration={duration}
      hideDuration={hideDuration}
      delay={[0, hideDelay]}
      html={content}
      position={position}
      distance={distance}
      offset={offset}
      interactive={interactive}
      open={open}
      onRequestClose={onRequestClose}
      arrow={arrow}
      disabled={disabled}
      title={title}
      popperOptions={popperOptions}
      onShow={onShow}
      onHide={onHide}
    >
      {children}
    </TippyTooltip>
  );
};

Tooltip.defaultProps = {
  hideDelay: 250,
  interactive: true,
  theme: 'light',
  arrow: true,
  duration: 150
};

export default Tooltip;
