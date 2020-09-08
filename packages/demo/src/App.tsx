import { boundMethod } from 'autobind-decorator';
import memoize from 'memoize-one';
import React from 'react';
import { Table, TableColumn, TooltipGlobalStyle } from 'react-compact-table';
import styled from 'styled-components';

import { DATA, Data } from './fakeData';
import { getSortedItems, SortOrder } from './sortHelpers';

const Text = styled.span`
  font-size: 13px;
  color: #333333;
`;

interface AppProps {}

interface AppState {
  selectedId: string;
  currentSortKey: keyof Data;
  currentSortOrder: SortOrder;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      selectedId: DATA[0].id,
      currentSortKey: null,
      currentSortOrder: SortOrder.Desc
    };
  }

  public render() {
    const { selectedId, currentSortKey, currentSortOrder } = this.state;
    const sortedItems = this.memoizedGetSortedItems(DATA, currentSortKey, currentSortOrder);
    return (
      <>
        <Table
          data={sortedItems}
          headerHeight="30px"
          headerFontSize="13px"
          headerFontColor="#333"
          minWidth="600px"
          maxHeight="300px"
          rowHeight="25px"
          selectable
          selectedId={selectedId}
          onRowClick={this.handleRowClick}
          sortable
          onHeaderClick={this.handleHeaderClick}
          currentSortKey={currentSortKey}
          currentSortOrder={currentSortOrder}
        >
          <TableColumn<Data, 'name'>
            dataKey="name"
            label="Name"
            help="this is pure text"
            align="left"
          >
            {({ value }) => <Text>{value}</Text>}
          </TableColumn>
          <TableColumn<Data, 'objective'>
            dataKey="objective"
            label="Objective"
            help={<div>I'm react node</div>}
            width="150px"
            align="center"
          >
            {({ value }) => <Text>{value}</Text>}
          </TableColumn>
          <TableColumn<Data, 'conversions'>
            dataKey="conversions"
            label="Conversions"
            help={<div>I'm react node</div>}
            width="120px"
            align="right"
          >
            {({ value }) => <Text>{value || 0}</Text>}
          </TableColumn>
          <TableColumn<Data, 'cvr'>
            dataKey="cvr"
            label="CVR"
            help={<div>I'm react node</div>}
            width="100px"
            align="right"
          >
            {({ value }) => <Text>{value || 0}</Text>}
          </TableColumn>
        </Table>
        <TooltipGlobalStyle />
      </>
    );
  }

  private memoizedGetSortedItems = memoize(
    (items: any[], sortKey: keyof Data, sortOrder: SortOrder) =>
      getSortedItems(items, sortKey, sortOrder)
  );

  @boundMethod
  private handleRowClick(id: string) {
    this.setState({ selectedId: id });
  }

  private getNextSortOrder(currentSortOrder: SortOrder) {
    return currentSortOrder === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc;
  }

  @boundMethod
  private handleHeaderClick(sortKey: keyof Data) {
    const { currentSortKey, currentSortOrder } = this.state;
    const nextSortOrder = this.getNextSortOrder(currentSortOrder);

    if (sortKey === currentSortKey) {
      this.setSortOrder(nextSortOrder);
    } else {
      this.clearSortOrder();
      this.setSortKey(sortKey);
    }
  }

  @boundMethod
  private setSortKey(nextSortKey: keyof Data) {
    this.setState({
      currentSortKey: nextSortKey
    });
  }

  @boundMethod
  private setSortOrder(nextSortOrder: SortOrder) {
    this.setState({
      currentSortOrder: nextSortOrder
    });
  }

  @boundMethod
  private clearSortOrder() {
    this.setState({
      currentSortOrder: SortOrder.Desc
    });
  }
}

export default App;
