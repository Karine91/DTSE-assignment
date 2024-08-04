import type { Meta, StoryObj } from "@storybook/react";

import { Spinner } from "./Spinner";

const meta = {
  component: Spinner,
  title: "Loading spinner",
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {};

export const RedSpinner: Story = {
  args: {
    className: "text-red-500",
  },
};
