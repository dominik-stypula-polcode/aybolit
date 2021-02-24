
import { LitElement, customElement, UpdatingElement } from 'lit-element';
import { MasonryLayout } from "@appnest/masonry-layout";

@customElement('cxl-masonry-layout')
export class CXLMasonryLayout extends MasonryLayout {

  // DISABLED, AS A SCRATCH.

  // connectedCallback() {

  //   this.querySelectorAll('cxl-accordion-card').forEach(item => {
  //     item.addEventListener('opened-changed', e => {
  //       const myEvent = new CustomEvent('send-this-event-elsewhere-or-do-something-here', {
  //           detail: { message: 'here we pass'},
  //           bubbles: true,
  //           composed: true
  //       });
  //       this.dispatchEvent(myEvent);
  //     });
  //   });

  //   /**
  //    * Original functionality
  //    */

  //   this.$unsetElementsSlot.addEventListener("slotchange", this.onSlotChange);
  //   // Attach resize observer so we can relayout eachtime the size changes
  //   if ("ResizeObserver" in window) {
  //       this.ro = new ResizeObserver(this.onResize);
  //       this.ro.observe(this);
  //   }
  //   else {
  //       window.addEventListener("resize", this.onResize);
  //   }
  // }

}
