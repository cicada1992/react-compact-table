import autobind from 'autobind-decorator';
import React, { SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';

import { v3Colors } from '../lib/styleColors';

const verticalStyle = css`
  display: block;

  &:not(:first-child) {
    margin-top: 8px;
  }
`;

interface ContainerProps {
  vertical: boolean;
  buttonStyle?: boolean;
  disabled?: boolean;
}

interface LabelProps {
  buttonStyle?: boolean;
  checked?: boolean;
  noLabel?: boolean;
}

const Container = styled.div`
  display: inline-block;
  vertical-align: middle;
  ${(props: ContainerProps) => (props.vertical ? verticalStyle : '')};
  ${(props) =>
    !props.vertical &&
    props.buttonStyle &&
    css`
      &:not(:first-child) {
        margin-left: -1px;
      }
    `};
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `};
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-right: ${(props: LabelProps) => (props.buttonStyle || props.noLabel ? '0' : '20px')};
  margin-left: ${(props: LabelProps) => props.noLabel && '7px'};
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  user-select: none;
  transition: 0.15s ease all;

  ${(props: LabelProps) =>
    props.buttonStyle &&
    css`
      width: auto;
      height: auto;
      padding: 6px 15px;
      font-size: 13px;
      cursor: pointer;
    `};
  ${(props) => props.buttonStyle && (props.checked ? activeButtonStyle : defaultButtonStyle)};
`;

const Input = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const Circle = styled.span`
  display: inline-block;
  position: relative;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  background: ${v3Colors.N70};
  border-radius: 50%;
  vertical-align: middle;
  transition: 0.15s ease all;

  &:after {
    position: absolute;
    content: '';
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    background: ${v3Colors.N0};
    border-radius: 50%;
    transition: 0.15s ease all;
  }

  ${Input}:checked ~ & {
    background: ${v3Colors.B100};

    &:after {
      top: 6px;
      left: 6px;
      width: 6px;
      height: 6px;
    }
  }
`;

const Text = styled.span`
  vertical-align: middle;
`;

const activeButtonStyle = css`
  color: ${v3Colors.N0};
  background: ${v3Colors.B100};
  border: 1px solid ${v3Colors.N50};
`;

const defaultButtonStyle = css`
  color: ${v3Colors.N300};
  background: ${v3Colors.N0};
  border: 1px solid ${v3Colors.N50};

  &:hover {
    background: ${v3Colors.N10};
  }
`;

export interface RadioButtonProps {
  testId?: string;
  name?: string;
  label?: string | JSX.Element;
  value?: string;
  checked?: boolean;
  onChange?: (checked: boolean, value?: string) => void;
  buttonStyle?: boolean;
  vertical?: boolean;
  disabled?: boolean;
}

class RadioButton extends React.PureComponent<RadioButtonProps> {
  public render() {
    const { testId, name, value, label, checked, buttonStyle, vertical, disabled } = this.props;
    const noLabel = !label;
    return (
      <Container
        data-role="radioButton"
        data-test-id={testId}
        data-value={value}
        vertical={vertical}
        buttonStyle={buttonStyle}
        disabled={disabled}
      >
        <Label noLabel={noLabel} buttonStyle={buttonStyle} checked={checked}>
          <Input name={name} value={value} onChange={this.handleInputChange} checked={checked} />
          {!buttonStyle && <Circle />}
          <Text>{label}</Text>
        </Label>
      </Container>
    );
  }

  @autobind
  private handleInputChange(evt: SyntheticEvent<HTMLInputElement>) {
    const { onChange, disabled } = this.props;
    if (!disabled && onChange) {
      const target = evt.currentTarget;
      onChange(target.checked, target.value);
    }
  }
}

export default RadioButton;
