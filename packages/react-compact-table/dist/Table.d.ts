import React from 'react';
import { TableColumnProps } from './TableColumn';
import { BaseDataItem } from './types';
export declare const TableCell: import("styled-components").StyledComponent<"div", any, {
    width?: string;
    align?: string;
}, never>;
interface TableProps<T> {
    data: T[];
    children: Array<React.ReactElement<TableColumnProps<T, keyof T>>>;
    minWidth?: string;
    maxHeight?: string;
    headerBgColor?: string;
    headerFontColor?: string;
    headerFontSize?: string;
    headerHeight?: string;
    rowHeight?: string;
    renderFooterChildren?: () => React.ReactNode;
    footerColor?: string;
    selectable?: boolean;
    selectedId?: string;
    noRadioButton?: boolean;
    onRowClick?: (id: string) => void;
    removable?: boolean;
    onRemoveClick?: (id: string) => void;
    sortable?: boolean;
    currentSortKey?: keyof T;
    currentSortOrder?: string;
    onHeaderClick?: (sortKey: keyof T) => void;
}
declare class Table<T extends BaseDataItem> extends React.Component<TableProps<T>> {
    render(): JSX.Element;
}
export default Table;
