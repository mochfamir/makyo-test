import React from "react";
import { Meta, Story } from "@storybook/react";
import { Dropdown, DropdownProps, DropdownOption } from "./Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    options: { control: "object" },
    value: { control: "object" },
    placeholder: { control: "text" },
    multiple: { control: "boolean" },
    searchable: { control: "boolean" },
    usePortal: { control: "boolean" },
    zIndex: { control: "number" },
  },
} as Meta;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

const sampleOptions: DropdownOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
];

export const Default = Template.bind({});
Default.args = {
  options: sampleOptions,
  placeholder: "Select a framework",
  multiple: false,
  searchable: true,
  usePortal: true,
  zIndex: 1001,
};

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  options: sampleOptions,
  placeholder: "Select frameworks",
  multiple: true,
  searchable: true,
  usePortal: true,
  zIndex: 1001,
};

export const WithoutSearch = Template.bind({});
WithoutSearch.args = {
  options: sampleOptions,
  placeholder: "Select a framework",
  multiple: false,
  searchable: false,
  usePortal: true,
  zIndex: 1001,
};

export const CustomOptionRendering = Template.bind({});
CustomOptionRendering.args = {
  options: sampleOptions,
  placeholder: "Select a framework",
  multiple: false,
  searchable: true,
  usePortal: true,
  zIndex: 1001,
  renderOption: (option) => (
    <div className="flex items-center gap-2">
      <span className="text-blue-500">●</span> {option.label}
    </div>
  ),
};
