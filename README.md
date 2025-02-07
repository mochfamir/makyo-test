# Makyo Dropdown Component

A highly customizable dropdown component built with React, TypeScript, Tailwind CSS, and Storybook.

## 🚀 Live Demo
- **Production Deployment:** [Makyo App](https://makyo-test-1fqrcfre2-mochfamir1s-projects.vercel.app)
- **Storybook UI:** [Component Library](https://makyo-storybook-8pvdqjtxp-mochfamir1s-projects.vercel.app)

---

## 📦 Installation

```sh
npm install @mochfamir/makyo-dropdown
# or
yarn add @mochfamir/makyo-dropdown
```

---

## 🔧 Usage

```tsx
import { Dropdown, DropdownOption } from "@mochfamir/makyo-dropdown";
import { useState } from "react";

const options: DropdownOption[] = [
  { value: "rendang", label: "Rendang" },
  { value: "nasi-goreng", label: "Nasi Goreng" },
  { value: "sate", label: "Sate" },
  { value: "gado-gado", label: "Gado-Gado" },
  { value: "bakso", label: "Bakso" },
];

export default function App() {
  const [selected, setSelected] = useState<string | string[]>("");

  return (
    <Dropdown
      options={options}
      value={selected}
      onChange={setSelected}
      multiple
      searchable
    />
  );
}
```

---

## ⚙️ Props

| Prop          | Type                                   | Default       | Description |
|--------------|--------------------------------------|--------------|-------------|
| `options`    | `DropdownOption[]`                   | `[]`         | List of dropdown options |
| `value`      | `string \| string[]`                 | `undefined`  | Selected value(s) |
| `onChange`   | `(value: string \| string[]) => void`| `undefined`  | Callback when selection changes |
| `placeholder`| `string`                              | `'Select...'`| Placeholder text |
| `multiple`   | `boolean`                             | `false`      | Enables multi-selection |
| `searchable` | `boolean`                             | `true`       | Enables search input |
| `usePortal`  | `boolean`                             | `true`       | Uses `createPortal` for dropdown |

---

## 🎨 Customization

- **Custom Rendering**: You can customize how each option is displayed using the `renderOption` prop.
- **Styles**: The component supports Tailwind classes for styling.
- **Icons**: Includes a **magnifier search icon** and **dropdown arrow** for better UX.

---

## 📖 Storybook

To explore the component in an isolated environment:

```sh
npm run storybook
# or
yarn storybook
```

Visit: [Storybook Deployment](https://makyo-storybook-8pvdqjtxp-mochfamir1s-projects.vercel.app)

---

## 🚀 Deployment

### Vercel Deployment
This project is deployed on **Vercel**. To deploy your own version:

```sh
git clone https://github.com/your-repo/makyo-dropdown.git
cd makyo-dropdown
vercel
```

For production, push to the `main` branch, and Vercel will handle the deployment.

---

## 🛠 Development

```sh
git clone https://github.com/your-repo/makyo-dropdown.git
cd makyo-dropdown
npm install  # or yarn install
npm run dev  # or yarn dev
```

Visit `http://localhost:3000` in your browser.

---


