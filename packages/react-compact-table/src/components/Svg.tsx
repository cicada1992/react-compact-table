import _ from 'lodash';
import React from 'react';

interface SvgProps {
  src: React.ComponentClass;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  color?: string;
}

const TARGET_PROPS: Array<keyof SvgProps> = ['className', 'width', 'height'];

class Svg extends React.PureComponent<SvgProps> {
  public render() {
    const { src: Src, color, style: inheritedStyle } = this.props;
    const style = { ...inheritedStyle, color };
    const pickedProps = _.pick(this.props, TARGET_PROPS);
    const props = { ...pickedProps, style };
    return React.createElement(Src, props as any);
  }
}

export default Svg;
