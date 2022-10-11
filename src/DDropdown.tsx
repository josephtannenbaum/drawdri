import { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  DropdownProps,
} from "reactstrap";

interface DDropdownProps<TValue = string> extends DropdownProps {
  value: TValue;
  onChangeValue?: (v: TValue) => void;
  options: { label: string; value: TValue }[];
}

export default function DDropdown<TValue = string>({
  value,
  onChangeValue = () => {},
  options,
  ...props
}: DDropdownProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const onItemClick = (v: TValue) => {
    setIsOpen(false);
    onChangeValue(v);
  };

  return (
    <Dropdown isOpen={isOpen} toggle={(e: any) => console.log(e)} {...props}>
      <DropdownToggle
        onClick={() => options?.length && setIsOpen(!isOpen)}
        disabled={!options?.length}
        caret
      >
        {options.find(({ value: v }) => v === value)?.label}
      </DropdownToggle>
      <DropdownMenu>
        {options.map(({ label, value }, i) => (
          <DropdownItem onClick={() => onItemClick(value)} key={i}>
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
