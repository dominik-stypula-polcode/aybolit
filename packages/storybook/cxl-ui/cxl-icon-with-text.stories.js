import { html } from 'lit-html';
import '@conversionxl/cxl-ui/src/components/cxl-institute-layout.js';
import '@conversionxl/cxl-ui/src/components/cxl-icon-with-text.js';
import { withKnobs, text, select } from '@storybook/addon-knobs'; // possible: boolean, number

import sampleIconFile from './static-assets/sample-icon-24x24.svg';

const sampleIcon = {
  src: sampleIconFile,
  alt: 'Sample icon file'
};

/**
 * 2021-01-14
 * --> for future selves, machine elves
 * all about knobs in storybook with examples
 * https://github.com/storybookjs/storybook/tree/master/addons/knobs
 */

export default {
  title: 'CXL UI',
  decorators: [withKnobs]
};

const Template = () => {
  const defaultText = text('Text', 'Here we go!');
  const defaultUrl = text('Url', 'https://google.com');
  const defaultUrlTarget = text('Url Target', '_blank');
  const defaultIcon = text('Icon', sampleIcon.src);
  const defaultTheme = select('Theme', ['primary', 'black'], 'primary');

  return html`
    <cxl-institute-layout id="container" theme="2c-l">
      <h2>Icon with text</h2>
      <cxl-icon-with-text
        theme="${defaultTheme}"
        url="${defaultUrl}"
        target="${defaultUrlTarget}"
        icon="${defaultIcon}"
        >${defaultText}</cxl-icon-with-text
      >
    </cxl-institute-layout>
  `;
};

export const CxlIconWithText = Template.bind({});

CxlIconWithText.story = {
  name: 'cxl-icon-with-text'
};
