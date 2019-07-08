import Svg from '@components/Svg';
import helpIcon from '@icons/help.svg';
import React from 'react';
import styled from 'styled-components';

import { v3Colors } from '../../lib/styleColors';

import Tooltip from '.';

const StyledSvg = styled(Svg)`
  position: relative;
  vertical-align: middle;
  top: ${(props: { top: string }) => props.top || '-1px'};
  margin-left: 4px;
  color: ${v3Colors.N60};
  &:hover {
    color: ${v3Colors.N80};
  }
`;

interface QuestionMarkProps {
  className?: string;
  help: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: string;
  top?: string;
}

const QuestionMark: React.SFC<QuestionMarkProps> = (props) => {
  const { className, help, position, maxWidth, top } = props;
  if (!help) {
    return null;
  }
  return (
    <Tooltip className={className} help={help} position={position} maxWidth={maxWidth}>
      <StyledSvg src={helpIcon} top={top} />
    </Tooltip>
  );
};

export default QuestionMark;
