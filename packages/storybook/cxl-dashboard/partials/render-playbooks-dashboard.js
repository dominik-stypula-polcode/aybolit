// eslint-disable-next-line import/no-extraneous-dependencies
import { html } from 'lit-element';
import DashboardRenderItems from './dashboard-render-items';

const filterByTags = (playbooksData) => {
  /**
   * @type Array
   */
  const elements = Array.from(document.querySelectorAll('#selected-tags vaadin-button[selected]'));

  if (elements && elements.length) {
    const tags = elements.map((el) => el.innerText);

    return playbooksData.filter((data) => {
      let hasTag = false;

      tags.forEach((tag) => {
        if (data.cxl_tags && data.cxl_tags.indexOf(tag) !== -1) {
          hasTag = true;
        }
      });

      return hasTag;
    });
  }

  return playbooksData;
};

const RenderPlaybooksDashboard = (miniDegData, playbooksData) => {
  const filteredPlaybooks = filterByTags(playbooksData);
  const filteredMiniDeg = filterByTags(miniDegData);
  return html`${DashboardRenderItems(filteredMiniDeg)} ${DashboardRenderItems(filteredPlaybooks)}`;
};

export default RenderPlaybooksDashboard;
