import RadioButtonGroup from '@components/RadioButtonGroup';
import Svg from '@components/Svg';
import arrowDownIcon from '@icons/arrow-down.svg';
import arrowUpIcon from '@icons/arrow-up.svg';
import _ from 'lodash';
import React from 'react';
import styled, { css } from 'styled-components';

import { TableColumnProps } from './TableColumn';
import { TableRow } from './TableRow';
import { BaseDataItem } from './types';

const DEFAULT_WIDTH = '10%';
const DEFAULT_ALIGN = 'left';

const TableSheet = styled.div<{ minWidth: string }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  ${({ minWidth }) => `min-width: ${minWidth}`};
  border: 1px solid #dddddd;
`;

const TableHead = styled.div<{
  headerBgColor: string;
  headerFontColor: string;
  headerFontSize: string;
  headerHeight: string;
  useScrollbar: boolean;
  sortable: boolean;
}>`
  display: flex;
  ${({ headerHeight }) => headerHeight && `height: ${headerHeight}`};
  align-items: center;
  padding: 0 15px 0 15px;
  ${({ useScrollbar }) => useScrollbar && 'padding-right: 30px'};
  ${({ headerBgColor }) => headerBgColor && `background: ${headerBgColor}`};
  ${({ headerFontColor }) => headerFontColor && `color: ${headerFontColor}`};
  ${({ headerFontSize }) => headerFontSize && `font-size: ${headerFontSize}`};
  ${({ sortable }) => sortable && 'cursor: pointer'};
`;

export const TableCell = styled.div<{ width?: string; align?: string }>`
  ${({ width }) => (width ? `width: ${width}` : `flex: 1 1 ${DEFAULT_WIDTH}`)};
  text-align: ${({ align }) => align || DEFAULT_ALIGN};
`;

const TableBody = styled.div<{ maxHeight?: string }>`
  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight};
      overflow-y: scroll;
      scrollbar-width: 17px;
    `};
  border-top: 1px solid #dddddd;
  font-size: 13px;
  color: #333333;
`;

const FooterContainer = styled.div<{ footerColor?: string }>`
  width: 100%;
  border-top: 1px solid #dddddd;
  ${({ footerColor }) => footerColor && `background: ${footerColor}`};
`;

const StyledSvg = styled(Svg)<{ visible: boolean }>`
  position: absolute;
  margin-left: 2px;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
`;

interface TableProps<T> {
  data: T[];
  children: Array<React.ReactElement<TableColumnProps<T, keyof T>>>;

  // style
  minWidth?: string;
  maxHeight?: string; // maxHeight meas body's max height. if exceed this, will be scrollable.
  headerBgColor?: string;
  headerFontColor?: string;
  headerFontSize?: string;
  headerHeight?: string;
  rowHeight?: string;

  // footer
  renderFooterChildren?: () => React.ReactNode;
  footerColor?: string;

  // selectable
  selectable?: boolean;
  selectedId?: string;
  noRadioButton?: boolean;
  onRowClick?: (id: string) => void;

  // removable
  removable?: boolean;
  onRemoveClick?: (id: string) => void;

  // sortable
  sortable?: boolean;
  currentSortKey?: keyof T;
  currentSortOrder?: string;
  onHeaderClick?: (sortKey: keyof T) => void;
}

class Table<T extends BaseDataItem> extends React.Component<TableProps<T>> {
  public render() {
    const {
      children,
      data,
      selectable,
      selectedId,
      noRadioButton,
      removable,
      sortable,
      minWidth,
      maxHeight,
      headerBgColor = '#ffffff',
      headerFontColor = '#000000',
      headerFontSize = '12px',
      headerHeight = '22px',
      rowHeight,
      renderFooterChildren,
      footerColor,
      onRowClick,
      onRemoveClick,
      currentSortKey,
      currentSortOrder,
      onHeaderClick
    } = this.props;
    const arrowIcon = currentSortOrder === 'desc' ? arrowDownIcon : arrowUpIcon;

    return (
      <TableSheet minWidth={minWidth}>
        <TableHead
          headerBgColor={headerBgColor}
          headerFontColor={headerFontColor}
          headerFontSize={headerFontSize}
          headerHeight={headerHeight}
          useScrollbar={Boolean(maxHeight)}
          sortable={sortable}
        >
          {React.Children.map(
            children,
            (child: React.ReactElement<TableColumnProps<T, keyof T>>) => {
              const { dataKey, label, width, align } = child.props;
              return (
                <TableCell key={dataKey} width={width} align={align}>
                  <span onClick={() => sortable && onHeaderClick(dataKey)}>{label}</span>
                  {/* TODO: activate below line after fixing css problem for tippy tooltip */}
                  {/* {help && <QuestionMark help={help} />} */}
                  <StyledSvg src={arrowIcon} visible={sortable && currentSortKey === dataKey} />
                </TableCell>
              );
            }
          )}
        </TableHead>
        <TableBody maxHeight={maxHeight}>
          <RadioButtonGroup width="100%" value={selectedId}>
            {_.map(data, (item) => {
              return (
                <TableRow
                  key={item.id}
                  children={children}
                  item={item}
                  rowHeight={rowHeight}
                  selectable={selectable}
                  selected={item.id === selectedId}
                  noRadioButton={noRadioButton}
                  removable={removable}
                  onRowClick={onRowClick}
                  onRemoveClick={onRemoveClick}
                />
              );
            })}
          </RadioButtonGroup>
        </TableBody>
        {renderFooterChildren && (
          <FooterContainer footerColor={footerColor}>{renderFooterChildren()}</FooterContainer>
        )}
      </TableSheet>
    );
  }
}

export default Table;
