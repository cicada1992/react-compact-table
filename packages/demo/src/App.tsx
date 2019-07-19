import autobind from 'autobind-decorator';
import memoize from 'memoize-one';
import React from 'react';
import { Table, TableColumn, TooltipGlobalStyle } from 'react-compact-table';
import styled from 'styled-components';

import { DATA } from './fakeData';
import { getSortedItems, SortKey, SortOrder } from './sortHelpers';

const Text = styled.span`
  font-size: 13px;
  color: #333333;
`;

interface AppProps {}

interface AppState {
  selectedId: string;
  currentSortKey: SortKey;
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
          <TableColumn dataKey="name" label="Name" help="this is pure text" align="left">
            {({ value }) => <Text>{value}</Text>}
          </TableColumn>
          <TableColumn
            dataKey="objective"
            label="Objective"
            help={<div>I'm react node</div>}
            width="150px"
            align="center"
          >
            {({ value }) => <Text>{value}</Text>}
          </TableColumn>
          <TableColumn
            dataKey="conversions"
            label="Conversions"
            help={<div>I'm react node</div>}
            width="120px"
            align="left"
          >
            {({ value }) => <Text>{value || 0}</Text>}
          </TableColumn>
          <TableColumn
            dataKey="cvr"
            label="CVR"
            help={<div>I'm react node</div>}
            width="100px"
            align="left"
          >
            {({ value }) => <Text>{value || 0}</Text>}
          </TableColumn>
        </Table>
        <TooltipGlobalStyle />
      </>
    );
  }

  private memoizedGetSortedItems = memoize((items: any[], sortKey: SortKey, sortOrder: SortOrder) =>
    getSortedItems(items, sortKey, sortOrder)
  );

  @autobind
  private handleRowClick(id: string) {
    this.setState({ selectedId: id });
  }

  private getNextSortOrder(currentSortOrder: SortOrder) {
    return currentSortOrder === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc;
  }

  @autobind
  private handleHeaderClick(sortKey: SortKey) {
    const { currentSortKey, currentSortOrder } = this.state;
    const nextSortOrder = this.getNextSortOrder(currentSortOrder);

    if (sortKey === currentSortKey) {
      this.setSortOrder(nextSortOrder);
    } else {
      this.clearSortOrder();
      this.setSortKey(sortKey);
    }
  }

  @autobind
  private setSortKey(nextSortKey: SortKey) {
    this.setState({
      currentSortKey: nextSortKey
    });
  }

  @autobind
  private setSortOrder(nextSortOrder: SortOrder) {
    this.setState({
      currentSortOrder: nextSortOrder
    });
  }

  @autobind
  private clearSortOrder() {
    this.setState({
      currentSortOrder: SortOrder.Desc
    });
  }
}

export default App;
