export class AppElement extends HTMLElement {
  public static observedAttributes = ["text", "color"];
  text = 'component-lib';
  color = 'red';

  connectedCallback() {
    this.innerHTML = `
    <div style="background-color: ${this.color}">${this.text}</div>
      `;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if(name === 'color') {
      this.color = newValue;
    }

    if(name === 'text') {
      this.text = newValue;
    }

    console.log(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
    );
  }
}

if (!customElements.get('library-button')) {
  customElements.define('library-button', AppElement);
}
