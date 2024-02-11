import { useDropdownContext, ItemProps } from "@providers/DropdownProvider";
import { useRef } from "react";

interface IDropdown {
  items: ItemProps[];
}

export const Dropdown = (props: IDropdown) => {
  const { items } = props;
  const { onSetPosition, setItems } = useDropdownContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!dropdownRef.current) return;

    setItems(items);

    const { offsetTop, offsetLeft } = dropdownRef.current;
    onSetPosition({
      x: offsetLeft,
      y: offsetTop,
    });
  };

  return (
    <div className="dropdown" ref={dropdownRef} onClick={handleClick}>
      <div className="dot">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
