import SelectorList from "./SelectorList";

export interface IOption {
  id: string;
  label: string;
  meta?: string;
  disabled?: boolean;
}

export default SelectorList;
