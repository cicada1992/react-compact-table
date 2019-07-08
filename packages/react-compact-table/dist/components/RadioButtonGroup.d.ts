import React from 'react';
export interface RadioButtonGroupProps {
    testId?: string;
    value?: string;
    onChange?: (value: string) => void;
    width?: string;
    vertical?: boolean;
    buttonStyle?: boolean;
    inline?: boolean;
}
declare class RadioButtonGroup extends React.Component<RadioButtonGroupProps> {
    private groupName;
    render(): JSX.Element;
    private handleChildrenChange;
}
export default RadioButtonGroup;
