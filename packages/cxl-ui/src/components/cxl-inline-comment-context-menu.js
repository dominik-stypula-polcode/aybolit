import { customElement } from 'lit-element';
import '@conversionxl/cxl-lumo-styles';
import { ContextMenuElement } from '@vaadin/vaadin-context-menu/src/vaadin-context-menu.js';

@customElement('cxl-inline-comment-context-menu')
export class CxlInlineCommentContextMenu extends ContextMenuElement {
  ready() {
    super.ready();
    this.appendContextMenuScript();
  }

  // eslint-disable-next-line class-methods-use-this
  appendContextMenuScript() {
    // eslint-disable-next-line func-names
    const doc = window.document;
    const contextMenu = this;
    contextMenu.closeOn = 'blur';
    contextMenu.renderer = root => {
      let listBox = root.firstElementChild;
      // Check if there is a list-box generated with the previous renderer call to update its content instead of recreation
      if (listBox) {
        listBox.innerHTML = '';
      } else {
        listBox = doc.createElement('vaadin-list-box');
        root.appendChild(listBox);
      }
      const txt = doc.createElement('textarea');
      txt.placeholder = 'Put your comment here';
      listBox.appendChild(txt);
      const but = doc.createElement('button');
      but.textContent = 'Save comment';
      but.onclick = () => {
        but.disabled = true;
        but.textContent = 'Saving...';
        setTimeout(() => {
          const evt = new CustomEvent('save-inline-comment', {
            bubbles: true,
            composed: true,
            detail: {
              comment: txt.value,
              context: contextMenu.innerHTML
            }
          });
          contextMenu.dispatchEvent(evt);
          doc.body.click();
        }, 2000);
      };
      listBox.appendChild(but);
    };
  }
}
