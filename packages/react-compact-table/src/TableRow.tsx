import RadioButton from '@components/RadioButton';
import Svg from '@components/Svg';
import closeIcon from '@icons/close.svg';
import { boundMethod } from 'autobind-decorator';
import _ from 'lodash';
import React, { MouseEvent } from 'react';
import styled, { css } from 'styled-components';

import { TableCell } from './Table';
import { TableColumnProps } from './TableColumn';
import { BaseDataItem } from './types';

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

interface TableRowProps<T> {
  item: T;
  children: Array<React.ReactElement<TableColumnProps<T, keyof T>>>;
  rowHeight?: string;

  selectable?: boolean;
  selected?: boolean;
  noRadioButton?: boolean;
  onRowClick?: (id: string) => void;

  removable?: boolean;
  onRemoveClick?: (id: string) => void;
}

interface TableRowState {
  hover: boolean;
}

export class TableRow<T extends BaseDataItem> extends React.Component<
  TableRowProps<T>,
  TableRowState
> {
  constructor(props: TableRowProps<T>) {
    super(props);

    this.state = { hover: false };
  }

  public render() {
    const {
      item,
      selectable,
      selected,
      noRadioButton,
      removable,
      rowHeight,
      children
    } = this.props;
    const { hover } = this.state;

    return (
      <TableRowContainer
        active={selectable && (selected || hover)}
        height={rowHeight}
        onClick={this.handleRowClick}
        onMouseEnter={this.handleRowHover}
        onMouseLeave={this.handleRowUnhover}
      >
        {React.Children.map(
          children,
          (child: React.ReactElement<TableColumnProps<T, keyof T>>, idx) => {
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
          }
        )}
        {removable && (
          <RemoveIcon show={hover} onClick={this.handleRemoveClick}>
            <StyledSvg src={closeIcon} />
          </RemoveIcon>
        )}
      </TableRowContainer>
    );
  }

  @boundMethod
  private handleRowClick(evt: MouseEvent<HTMLDivElement>) {
    const { item, selectable, onRowClick } = this.props;
    if (selectable && onRowClick) {
      onRowClick(item.id);
    }
    evt.stopPropagation();
  }

  @boundMethod
  private handleRemoveClick(evt: MouseEvent<HTMLDivElement>) {
    const { item, removable, onRemoveClick } = this.props;
    if (removable && onRemoveClick) {
      onRemoveClick(item.id);
    }
    evt.stopPropagation();
  }

  @boundMethod
  private handleRowHover() {
    this.setState({ hover: true });
  }

  @boundMethod
  private handleRowUnhover() {
    this.setState({ hover: false });
  }
}
