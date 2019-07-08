import React, { FunctionComponent } from 'react';
export interface TableColumnProps {
    dataKey: string;
    label?: string;
    help?: React.ReactNode;
    width?: string;
    align?: string;
    cellAlign?: string;
    children: (args: {
        id: string;
        value: any;
        values: any;
    }) => React.ReactNode;
}
declare const TableColumn: FunctionComponent<TableColumnProps>;
export default TableColumn;
