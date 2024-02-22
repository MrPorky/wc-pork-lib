import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("slide-display-item")
export class SlideDisplayItem extends LitElement {
  /**
   * The direction of the slide display.
   */
  @property({ type: String })
  direction = "normal";

  @state()
  length = 0;

  handleSlotchange(e: Event) {
    if (e.target === null || !(e.target instanceof HTMLSlotElement)) return;

    this.length = e.target.assignedElements().length;
  }

  render() {
    return html`
      <div class="tag">
        <slot />
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
