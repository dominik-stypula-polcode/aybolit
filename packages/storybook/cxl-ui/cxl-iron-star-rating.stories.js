import { html } from 'lit-html';
import '@conversionxl/cxl-ui/src/components/cxl-institute-layout.js';
import '@cwmr/iron-star-rating';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

/**
 * --> for future selves, machine elves
 * all about knobs in storybook with examples
 * https://github.com/storybookjs/storybook/tree/master/addons/knobs
 */

export default {
  title: 'CXL UI',
  decorators: [withKnobs]
};

const Template = () => {
  const isDisabled = boolean('Disabled', false);
  const starsCount = number('Stars Count', 3);
  return html`
    <cxl-institute-layout id="container" theme="2c-l">
      <h2>Iron Star Rating</h2>
      <iron-star-rating ?readonly=${isDisabled} value=${starsCount}></iron-star-rating>
    </cxl-institute-layout>
  `;
};

export const CxlIronStarRating = Template.bind({});

CxlIronStarRating.story = {
  name: 'cxl-iron-star-rating'
};
