import type { Meta, StoryObj } from "@storybook/react";

import { Tabs } from "./Tabs";

const meta = {
  component: Tabs,
  title: "Tabs",
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  //@ts-expect-error missing children prop
  args: {
    headersList: [
      { value: "tab1", children: "One" },
      { value: "tab2", children: "Two" },
    ],
  },
  render: (args) => {
    return (
      <Tabs {...args}>
        <div>One 1</div>
        <div>Two 2</div>
      </Tabs>
    );
  },
};
