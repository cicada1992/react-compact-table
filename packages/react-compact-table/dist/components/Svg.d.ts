import React from 'react';
interface SvgProps {
    src: React.ComponentClass;
    className?: string;
    style?: React.CSSProperties;
    width?: string | number;
    height?: string | number;
    color?: string;
}
declare class Svg extends React.PureComponent<SvgProps> {
    render(): React.ComponentElement<{}, React.Component<{}, any, any>>;
}
export default Svg;
