import autobind from 'autobind-decorator';
import React from 'react';
import styled from 'styled-components';

import { deepChildrenMap, isElementTypeOf } from '../lib/reactUtils';

import RadioButton from './RadioButton';

const Container = styled.div`
  ${(props: { width?: string; inline?: boolean }) => props.width && `width: ${props.width}`};
  display: inline-block;
  vertical-align: middle;
`;

let groupIdx = 0;

function getNextGroupName() {
  return (++groupIdx + '_radio_buttons').toString();
}

export interface RadioButtonGroupProps {
  testId?: string;
  value?: string;
  onChange?: (value: string) => void;
  width?: string;
  vertical?: boolean;
  buttonStyle?: boolean;
  inline?: boolean;
}

class RadioButtonGroup extends React.Component<RadioButtonGroupProps> {
  private groupName: string = getNextGroupName();

  public render() {
    const { children, testId, value, width, vertical, inline } = this.props;
    const modifiedChildren = deepChildrenMap(children, (child) => {
      if (isElementTypeOf(child, RadioButton)) {
        const element = child as React.ReactElement<any>;
        const childValue = element.props.value;
        return React.cloneElement(element, {
          name: this.groupName,
          checked: value && value === childValue,
          onChange: this.handleChildrenChange,
          buttonStyle: this.props.buttonStyle,
          vertical
        });
      }
      return child;
    });
    return (
      <Container
        data-role="radioButtonGroup"
        data-test-id={testId}
        data-value={value}
        width={width}
        inline={inline}
      >
        {modifiedChildren}
      </Container>
    );
  }

  @autobind
  private handleChildrenChange(checked: boolean, value?: string) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }
}

export default RadioButtonGroup;
