import centered from '@storybook/addon-centered/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { Table, TableColumn } from '..';

const Text = styled.span`
  font-size: 13px;
  color: #333333;
`;

const data = [
  {
    id: 'id-0',
    name: 'DongYoon',
    objective: 'CPA',
    conversions: 23242424,
    cvr: 0.054,
    bid: '3',
    error: 'error'
  },
  { id: 'id-1', name: 'SangBoak', objective: 'V2I', conversions: 1234, cvr: 0.16 },
  { id: 'id-2', name: 'MoonSik', objective: 'CPV' },
  { id: 'id-3', name: 'Heejin', objective: 'CPI', conversions: 7211233123, cvr: 0.71 },
  { id: 'id-4', name: 'Youngjae', objective: 'PPE', conversions: 312, cvr: 0.4281 }
];

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .addDecorator(centered)
  .add('basic', () => {
    const selectable = boolean('selectable', true);
    const noRadioButton = boolean('noRadioButton', false);
    const removable = boolean('removable', true);
    const sortable = boolean('sortable', false);
    const selectedId = text('selectedId', 'id-0');
    const headerHeight = text('headerHeight', '30px');
    const headerFontSize = text('headerFontSize', '13px');
    const headerFontColor = text('headerFontColor', '#333333');
    const minWidth = text('minWidth', '700px');
    const maxHeight = text('maxHeight', '300px');
    const rowHeight = text('rowHeight', '30px');
    return (
      <Table
        data={data}
        selectable={selectable}
        selectedId={selectedId}
        noRadioButton={noRadioButton}
        headerHeight={headerHeight}
        headerFontSize={headerFontSize}
        headerFontColor={headerFontColor}
        removable={removable}
        sortable={sortable}
        minWidth={minWidth}
        maxHeight={maxHeight}
        rowHeight={rowHeight}
        currentSortKey="name"
        currentSortOrder="desc"
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
    );
  });
