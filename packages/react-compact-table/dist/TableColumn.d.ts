import React from 'react';
export interface RenderProps<T, TValue> {
    id: string;
    value: TValue;
    values: Partial<T>;
}
export declare type RenderFunc<T, TKey extends keyof T> = (props: RenderProps<T, T[TKey]>) => React.ReactNode;
export interface TableColumnProps<T, TKey extends keyof T> {
    dataKey: TKey;
    label?: string;
    help?: React.ReactNode;
    width?: string;
    align?: string;
    cellAlign?: string;
    children: RenderFunc<T, TKey>;
}
declare function TableColumn<T, TKey extends keyof T>(props: TableColumnProps<T, TKey>): null;
export default TableColumn;
