# react-compact-table
- This is compact & easy to use react-compact-table (render props pattern & using styled components)


## Getting Started
```
npm install react-compact-table --save
```


## Dependancies
```
- styled-components
- lodash
```


## Demo
https://cicada1992.github.io/react-compact-table/


## TableProps
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| data | any[] | ✓ | inject your data (array) ✓ | TableColumn 
| minWidth | string |  | If you want to set minWidth, apply this.
| maxHeight | string |  | maxHeight means body's max height. If table body's height exceed this, will be scrollable. 
| headerBgColor | string | | default: #ffffff
| headerFontSize | string |  | default: 12px
| headerFontColor | string |  | default: black
| headerHeight | string |  | default: 22px
| rowHeight | string |  | default: auto (depends on content)
| renderFooterChildren | () => React.ReactNode |  | If you need footer, use this
| footerColor | string |  | default: none
| selectable | boolean |  | activate to select (radio button in first column)
| selectedId | string |  | inject selected id
| noRadioButton | boolean |  | you can apply selectable row without radio button
| onRowClick | (id: string) => void |  | inject callback function to change clicked id 
| removable | boolean |  | activate to remove (be added *X* icon end of each row)
| onRemoveClick | (id: string) => void |  | inject callback function to remove clicked id 
| sortable | boolean |  | activate to sort (If you click header label, will be added sorting icon end of each header)
| currentSortKey | SortKey |  | sort key (should be same as data key)
| currentSortOrder | SortOrder |  | **desc** or **asc**
| onHeaderClick | (sortKey: SortKey) => void |  | inject callback function to change sort key || sort order related to clicked specific header label


## TableColumnProps
| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| dataKey | string | ✓ | matched key as your data
| label | string |  | header label 
| help | React.ReactNode |  | tooltip (inactive now, fixing minor bug)
| width | string |  | default: 10% of table width
| align | string |  | default: left
| cellAlign | string | | if you want to apply align separately between header and cell, use this


## Basic Usage
```
const data = [
  { id: 'id-0', name: 'DongYoon',  conversions: 23242424 },
  { id: 'id-1', name: 'SangBoak', conversions: 1234 },
  { id: 'id-2', name: 'MoonSik', conversions: 3 },
  { id: 'id-3', name: 'Heejin', conversions: 7211233123 },
  { id: 'id-4', name: 'Youngjae', conversions: 312 }
];
```
```
<Table data={data}>
  <TableColumn
    dataKey="name"
    label="Name"
    help="this is pure text"
    align="left"
  >
     {({ value }) => <Text>{value}</Text>}
  </TableColumn>
  <TableColumn
     dataKey="conversions"
     label="Conversions"
     help={<div>I'm react node</div>}
     align="right"
  >
    {({ value })) => <Text>{formatNumber(args.value) || 0}</Text>}
  </TableColumn>
</Table>
```