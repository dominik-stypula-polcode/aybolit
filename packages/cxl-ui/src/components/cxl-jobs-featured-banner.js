import { customElement, LitElement, html, property } from 'lit-element';
import '@conversionxl/cxl-lumo-styles';
import { registerGlobalStyles } from '@conversionxl/cxl-lumo-styles/src/utils';
import cxlJobsFeaturedBannerStyles from '../styles/cxl-jobs-featured-banner-css.js';
import cxlJobsFeaturedBannerGlobalStyles from '../styles/global/cxl-jobs-featured-banner-css.js';

@customElement('cxl-jobs-featured-banner')
export class CXLJobsFeaturedBannerElement extends LitElement {
  @property({ type: Boolean, reflect: true })
  sticky = false;

  static get styles() {
    return [cxlJobsFeaturedBannerStyles];
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  firstUpdated(changedProperties) {
    /**
     * Global styles.
     */
    registerGlobalStyles(cxlJobsFeaturedBannerGlobalStyles, {
      moduleId: 'cxl-jobs-featured-banner-global'
    });

    super.firstUpdated(changedProperties);
  }
}
