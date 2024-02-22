import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("slide-display")
export class SlideDisplay extends LitElement {
  /**
   * The direction of the slide display.
   */
  @property({ type: String })
  direction = "normal";

  /**
   * The speed of the annimation.
   */
  @property({ type: Number })
  speed = 2000;

  /**
   * The color of the background the display is on. Fade color
   */
  @property({ type: String })
  backgroundColor = "white";

  @state()
  length = 0;

  @state()
  width = 0;

  /**
   * A function that handles the slot change event.
   *
   * @param {Event} event - the event object
   * @return {void}
   */
  handleSlotChange(event: Event) {
    if (!(event.target instanceof HTMLSlotElement)) return;

    const slot = event.target;
    const elements = slot.assignedElements();
    this.length = elements.length;

    const inner = this.shadowRoot?.querySelector(".slot");
    const clones = this.shadowRoot?.querySelector(".clones");
    this.width = inner?.getBoundingClientRect().width ?? 0;

    if (clones) {
      clones.innerHTML = "";
      elements.forEach((element) => {
        clones?.appendChild(element.cloneNode(true));
      });
    }
  }
  render() {
    const duration = `${this.length * this.speed}ms`;
    const direction = this.direction ?? "normal";
    const tagWidth = `${this.width}px`;
    const background = this.backgroundColor;

    return html`
      <div class="tag-list">
        <div
          class="loop-slider"
          style="
          --duration: ${duration}; 
          --direction: ${direction}; 
          width: ${tagWidth};
          --background: ${background};"
        >
          <div class="inner content">
            <div class="slot content">
              <slot @slotchange=${this.handleSlotChange} />
            </div>
            <div class="clones content"></div>
          </div>
          <div class="fade"></div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .tag-list {
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      gap: 1rem 0;
      position: relative;
      padding: 1.5rem 0;
      overflow: hidden;
      justify-content: center;
      align-items: center;
    }

    .loop-slider {
      position: relative;
      overflow: hidden;
    }

    .content {
      display: flex;
      width: fit-content;
    }

    .loop-slider .inner {
      animation-name: loop;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      animation-direction: var(--direction);
      animation-duration: var(--duration);
    }

    .tag {
      display: flex;
      background-color: var(--secondary);
      color: var(--secondary-text);
      margin-right: 1rem;
      white-space: nowrap;
    }

    .tag span {
      font-size: 1.2rem;
      color: #64748b;
    }

    .fade {
      pointer-events: none;
      background: linear-gradient(
        90deg,
        var(--background),
        transparent 30%,
        transparent 70%,
        var(--background)
      );
      position: absolute;
      inset: 0;
    }

    @keyframes loop {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "slide-display": SlideDisplay;
  }
}
