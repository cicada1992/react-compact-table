import { TooltipGlobalStyle } from '@components/Tooltip';
import { configure, addDecorator } from '@storybook/react';
import React, { Fragment } from 'react';
import backgroundColor from 'react-storybook-decorator-background';
import 'react-tippy/dist/tippy.css';


// automatically import all files ending in *.stories.tsx
const req = require.context('../src', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}

addDecorator(backgroundColor(['#ffffff', '#333333']));
addDecorator((story) => (
  <Fragment>
    {story()}
    <TooltipGlobalStyle />
  </Fragment>
));

configure(loadStories, module);
