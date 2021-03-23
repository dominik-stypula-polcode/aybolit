import {html} from 'lit-html';

export const displaySearchFilters = () => html`
  <p>TEST TEST TEST</p>
  <vaadin-button
    type="submit"
    class="search-submit"
    aria-label="Search"
    theme="icon"
  >Test button</vaadin-button>
  <vaadin-combo-box label="Filter by categories"></vaadin-combo-box>
  <script>
    customElements.whenDefined('vaadin-combo-box').then(function() {
    const departments = [
  {id: '1', name: 'Product'},
  {id: '2', name: 'Service'},
  {id: '3', name: 'HR'},
  {id: '4', name: 'Accounting'}
    ];
    const comboBox = document.querySelectorAll('vaadin-combo-box');
    comboBox.forEach(function(combo) {
    combo.items = departments;
    combo.itemValuePath = 'id';
    combo.itemLabelPath = 'name';
    combo.value = '1';
  });
  });
  </script>
`;

export default {
  title: 'CXL Search/Search Filters',
};
