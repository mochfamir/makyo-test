import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Dropdown, DropdownProps } from "../Dropdown";

export default {
  title: "Dropdown",
  component: Dropdown,
  argTypes: {
    options: { control: "object" },
    placeholder: { control: "text" },
    multiple: { control: "boolean" },
    searchable: { control: "boolean" },
    usePortal: { control: "boolean" },
    zIndex: { control: "number" },
  },
} as ComponentMeta<typeof Dropdown>;

const defaultOptions = [
  { value: "rendang", label: "Rendang" },
  { value: "sate", label: "Sate" },
  { value: "gudeg", label: "Gudeg" },
  { value: "pempek", label: "Pempek" },
  { value: "nasi_goreng", label: "Nasi Goreng" },
];

// Default template
const Template: ComponentStory<typeof Dropdown> = (args) => {
  const [value, setValue] = useState(args.multiple ? [] : "");

  return (
    <Dropdown
      {...args}
      value={value}
      onChange={(val) => {
        setValue(val);
        action("onChange")(val);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  options: defaultOptions,
  placeholder: "Select the dishes",
  multiple: false,
  searchable: true,
  usePortal: true,
  zIndex: 1001,
};
