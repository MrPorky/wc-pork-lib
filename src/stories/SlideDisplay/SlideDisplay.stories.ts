import type { Meta, StoryObj } from "@storybook/web-components";
import "../../slide-display";
import "../../slide-display-item";
import { html } from "lit";

interface Args {
  tags: string[];
  renderTags: (tag: string) => ReturnType<typeof html>;
  direction: "normal" | "reverse";
  speed: number;
  backgroundColor: string;
}

const meta = {
  title: "Example/slide-display",
  tags: ["autodocs"],
  render: ({
    renderTags,
    tags,
    backgroundColor,
    direction,
    speed,
  }) => html` <slide-display
    backgroundColor=${backgroundColor}
    direction=${direction}
    speed=${speed}
  >
    ${tags.map((tag) => {
      return html`<slide-display-item>${renderTags(tag)}</slide-display-item>`;
    })}
  </slide-display>`,
  args: {
    tags: ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"],
    renderTags: (tag: string) => html`${tag}`,
    direction: "normal",
    backgroundColor: "white",
    speed: 2000,
  },
} satisfies Meta<Args>;

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {},
};

export const Cards: Story = {
  args: {
    renderTags: (tag: string) =>
      html`<div style="background: gray; padding: 1rem; border-radius: 6px">
        ${tag}
      </div>`,
  },
};

export const Speed: Story = {
  args: { speed: 500 },
};

export const Direction: Story = {
  args: { direction: "reverse" },
};

export const BackgroundColor: Story = {
  args: { backgroundColor: "black" },
};
