import { customElement } from 'lit-element';
import '@conversionxl/cxl-lumo-styles';
import { ContextMenuElement } from '@vaadin/vaadin-context-menu/src/vaadin-context-menu.js';
import { registerGlobalStyles } from '@conversionxl/cxl-lumo-styles/src/utils';
import cxlInlineCommentContextMenuGlobalStyles from '../styles/global/cxl-inline-comment-context-menu-css.js';

@customElement('cxl-inline-comment-context-menu')
export class CXLInlineCommentContextMenu extends ContextMenuElement {
  ready() {
    super.ready();
    const overlayCss = `[part="content"] {
      width: 500px;
      height: 500px;
      background: none;
      box-shadow: none;
      color: transparent;
    }`;
    const style = document.createElement('style');
    style.textContent = overlayCss;
    this.$.overlay.shadowRoot.appendChild(style);
    registerGlobalStyles(cxlInlineCommentContextMenuGlobalStyles, {
      moduleId: 'cxl-inline-comment-context-menu'
    });

    this.appendContextMenuScript();
  }

  static get is() {
    return 'cxl-inline-comment-context-menu';
  }

  static get properties() {
    return {
      ...super.properties,
      textareaPlaceholder: {
        type: String,
        value: 'Put your comment here',
        notify: true,
        reflectToAttribute: true
      },
      buttonText: {
        type: String,
        value: 'Comment',
        notify: true,
        reflectToAttribute: true
      },
      buttonTextSavingComment: {
        type: String,
        value: 'Saving...',
        notify: true,
        reflectToAttribute: true
      }
    };
  }

  // eslint-disable-next-line class-methods-use-this
  appendContextMenuScript() {
    const doc = window.document;
    const contextMenu = this;
    contextMenu.closeOn = 'blur';
    contextMenu.renderer = root => {
      let listBox = root.firstElementChild;
      // // Check if there is a list-box generated with the previous renderer call to update its content instead of recreation
      if (listBox) {
        listBox.innerHTML = '';
      } else {
        listBox = doc.createElement('vaadin-list-box');
        root.appendChild(listBox);
      }
      listBox.innerHTML = `
          <textarea id="commentArea" placeholder="${this.textareaPlaceholder}"></textarea>
          <button id="sendButton">${this.buttonText}</button>
          <button id="cancelButton">Cancel</button>
        `;
      const button = root.querySelector('#sendButton');
      const textarea = root.querySelector('#commentArea');
      button.onclick = () => {
        button.disabled = true;
        button.textContent = this.buttonTextSavingComment;
        const evt = new CustomEvent('cxl-save-inline-comment', {
          bubbles: true,
          composed: true,
          detail: {
            comment: textarea.value,
            context: contextMenu.innerHTML,
            elementId: this.getAttribute('id')
          }
        });
        contextMenu.dispatchEvent(evt);
      };
    };
  }
}
