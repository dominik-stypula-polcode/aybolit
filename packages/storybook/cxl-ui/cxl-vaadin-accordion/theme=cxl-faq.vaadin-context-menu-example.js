export default {};

export const appendContextMenuScript = postfix => {
  // eslint-disable-next-line func-names
  const doc = window.document;
  // eslint-disable-next-line func-names
  customElements.whenDefined('vaadin-context-menu').then(function() {
    const selector = `vaadin-context-menu#customContextMenu_${postfix}`;
    const contextMenu = doc.querySelector(selector);
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
  });
};
