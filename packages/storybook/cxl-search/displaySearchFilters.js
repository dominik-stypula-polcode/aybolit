import { html } from 'lit-html';
// @todo: to multiple-select
import '@vaadin/vaadin-combo-box';
import filtersData from './data/search-filters.data.json';

const initDefaultOrStorageValue = (combo, type, defaultVal) => {
  const prevVal = localStorage.getItem(`cxl_search_${type}`);
  // no "prevVal || defaultValue" possible since it can be 0 which is valid index
  // eslint-disable-next-line no-param-reassign
  combo.value = prevVal !== null ? prevVal : defaultVal;
};

const setupListenerAndValue = (combo, type, defaultVal) => {
  combo.addEventListener('change', (event) => {
    localStorage.setItem(`cxl_search_${type}`, event.target.value);
  });
  initDefaultOrStorageValue(combo, type, defaultVal);
};

const initCombo = (type) => {
  const combo = document.querySelector(`#${type}-combo`);
  let data;

  switch (type) {
    case 'category':
      data = filtersData.categories;
      break;
    case 'topic':
      data = filtersData.topics;
      break;
    case 'sort':
      data = filtersData.sort_type;
      break;
    default:
      throw new Error(`No combo type ${type} available`);
  }

  const defaultValue = data[0].id;

  combo.itemValuePath = 'id';
  combo.itemLabelPath = 'name';
  combo.items = data;

  setupListenerAndValue(combo, type, defaultValue);
};

const init = () => {
  customElements.whenDefined('vaadin-combo-box').then(() => {
    initCombo('category');
    initCombo('topic');
    initCombo('sort');
  });
};

export const displaySearchFilters = () => html`
  <vaadin-combo-box
    id="category-combo"
    label="Filter by categories"
    clear-button-visible
  ></vaadin-combo-box>
  <vaadin-combo-box
    id="topic-combo"
    label="Filter by topics"
    clear-button-visible
  ></vaadin-combo-box>
  <vaadin-combo-box id="sort-combo" label="Sort" clear-button-visible></vaadin-combo-box>
  ${init()}
`;

export default {
  title: 'CXL Search/Search Filters',
};
