import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("slide-display-item")
export class SlideDisplayItem extends LitElement {
  render() {
    return html`
      <div class="tag">
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    .tag {
      display: flex;
      margin-right: 1rem;
      white-space: nowrap;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "slide-display-item": SlideDisplayItem;
  }
}
