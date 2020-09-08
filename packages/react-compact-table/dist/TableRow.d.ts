import React from 'react';
import { TableColumnProps } from './TableColumn';
import { BaseDataItem } from './types';
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
export declare class TableRow<T extends BaseDataItem> extends React.Component<TableRowProps<T>, TableRowState> {
    constructor(props: TableRowProps<T>);
    render(): JSX.Element;
    private handleRowClick;
    private handleRemoveClick;
    private handleRowHover;
    private handleRowUnhover;
}
export {};
