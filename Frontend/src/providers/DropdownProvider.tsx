import { createContext } from "@utils/CreateContext";
import { ReactNode, useState } from "react";
import $ from "jquery";

export interface ItemProps {
  label: string;
  color?: "primary" | "danger";
  onClick: () => void;
}

interface IPosition {
  x: number;
  y: number;
}

interface DropdownContext {
  setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  onSetPosition: (props: IPosition) => void;
}

interface DropdownProviderProps {
  children: ReactNode;
}

const [Provider, useContext] = createContext<DropdownContext>();

const DropdownProvider = (props: DropdownProviderProps) => {
  const { children } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ItemProps[]>([]);

  const onSetPosition = (props: IPosition) => {
    setIsOpen(!isOpen);
    $("#dropdown-contain").css("top", `${props.y + 15}px`);
    $("#dropdown-contain").css("left", `${props.x - 50}px`);
  };

  const dropdownValue = {
    setItems: setItems,
    onSetPosition: onSetPosition,
  };

  return (
    <Provider value={dropdownValue}>
      <div className="relative">
        <div
          id="dropdown-contain"
          className={`absolute ${!isOpen && "hidden"}`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`text-${item.color ?? "black"}`}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
        {children}
      </div>
    </Provider>
  );
};

export { DropdownProvider, useContext as useDropdownContext };
