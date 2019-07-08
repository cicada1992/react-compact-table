import React from 'react';
interface QuestionMarkProps {
    className?: string;
    help: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    maxWidth?: string;
    top?: string;
}
declare const QuestionMark: React.SFC<QuestionMarkProps>;
export default QuestionMark;
