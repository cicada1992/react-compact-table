import React, { FunctionComponent } from 'react';
import { TableColumnProps } from './TableColumn';
export declare const TableCell: import("styled-components").StyledComponent<"div", any, {
    width?: string;
    align?: string;
}, never>;
interface TableProps {
    data: any[];
    children: Array<React.ReactElement<TableColumnProps>>;
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
    onRowClick?: (id: string) => void;
    removable?: boolean;
    onRemoveClick?: (id: string) => void;
    sortable?: boolean;
    currentSortKey?: string;
    currentSortOrder?: string;
    onHeaderClick?: (sortKey: string) => void;
}
declare const Table: FunctionComponent<TableProps>;
export default Table;
