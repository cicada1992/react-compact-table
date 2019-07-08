import React from 'react';
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
declare class RadioButton extends React.PureComponent<RadioButtonProps> {
    render(): JSX.Element;
    private handleInputChange;
}
export default RadioButton;
