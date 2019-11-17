import RadioButton from '@components/RadioButton';
import Svg from '@components/Svg';
import closeIcon from '@icons/close.svg';
import _ from 'lodash';
import React, { FunctionComponent, MouseEvent, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

import { TableCell } from './Table';
import { TableColumnProps } from './TableColumn';

const TableRowContainer = styled.div<{ active: boolean; height: string }>`
  display: flex;
  align-items: center;
  ${({ height }) => height && `min-height: ${height}`};
  padding: 13px 15px 14px 15px;
  border-bottom: 1px solid #dddddd;
  ${({ active }) =>
    active &&
    css`
      background: #e5eeff;
      cursor: pointer;
    `};

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  margin-left: 6px;
  font-size: 13px;
  color: #333333;
`;

const RemoveIcon = styled.div<{ show: boolean }>`
  margin-left: -14px;
  color: #b0b0b0;
  cursor: pointer;
  ${({ show }) => !show && 'visibility: hidden'};
`;

const StyledSvg = styled(Svg)`
  position: relative;
  top: 2px;
  left: 5px;
`;

interface TableRowProps {
  item: any;
  children: Array<React.ReactElement<TableColumnProps>>;
  rowHeight?: string;

  selectable?: boolean;
  selected?: boolean;
  noRadioButton?: boolean;
  onRowClick?: (id: string) => void;

  removable?: boolean;
  onRemoveClick?: (id: string) => void;
}

export const TableRow: FunctionComponent<TableRowProps> = ({
  item,
  selectable,
  selected,
  noRadioButton,
  removable,
  rowHeight,
  onRowClick,
  onRemoveClick,
  children
}) => {
  const [hover, setHover] = useState(false);
  const handleRowHover = useCallback(() => setHover(true), [setHover]);
  const handleRowUnhover = useCallback(() => setHover(false), [setHover]);

  const handleRowClick = (evt: MouseEvent<HTMLDivElement>) => {
    if (selectable && onRowClick) {
      onRowClick(item.id);
    }
    evt.stopPropagation();
  };

  const handleRemoveClick = (evt: MouseEvent<HTMLDivElement>) => {
    if (removable && onRemoveClick) {
      onRemoveClick(item.id);
    }
    evt.stopPropagation();
  };

  return (
    <TableRowContainer
      active={selectable && (selected || hover)}
      height={rowHeight}
      onClick={handleRowClick}
      onMouseEnter={handleRowHover}
      onMouseLeave={handleRowUnhover}
    >
      {React.Children.map(children, (child: React.ReactElement, idx) => {
        const isFirst = idx === 0;
        const { dataKey, width, cellAlign, align, children: renderProps } = child.props;
        const shouldShowRadioButton = !noRadioButton && selectable && isFirst;
        const column = renderProps({
          id: item.id,
          value: item[dataKey],
          values: item
        });
        return (
          <TableCell key={dataKey} width={width} align={cellAlign || align}>
            {shouldShowRadioButton ? (
              <RadioButton label={<Label>{column}</Label>} checked={selected} value={item.id} />
            ) : (
              column
            )}
          </TableCell>
        );
      })}
      {removable && (
        <RemoveIcon show={hover} onClick={handleRemoveClick}>
          <StyledSvg src={closeIcon} />
        </RemoveIcon>
      )}
    </TableRowContainer>
  );
};
