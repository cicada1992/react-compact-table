import React, { FunctionComponent } from 'react';
import { TableColumnProps } from './TableColumn';
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
export declare const TableRow: FunctionComponent<TableRowProps>;
export {};
