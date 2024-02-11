import $ from "jquery";
import { useEffect } from "react";

export interface IOption {
  key: string;
  value?: boolean;
}

export interface ISelect {
  selected: IOption;
  setSelected: React.Dispatch<React.SetStateAction<IOption>>;
  options: IOption[];
}

export const Select = (props: ISelect) => {
  const { selected, setSelected, options } = props;

  const handleDropdownClick = (event: JQuery.ClickEvent) => {
    const selectDom = $(event.currentTarget);

    if (selectDom.hasClass("active")) {
      selectDom.removeClass("active");
      selectDom.find(".dropdown-menu").slideUp(300);
    } else {
      selectDom.addClass("active");
      selectDom.find(".dropdown-menu").slideDown(300);
    }
  };

  const onSelect = (e: IOption) => {
    setSelected(e);
  };

  useEffect(() => {
    $(".selection").on("click", handleDropdownClick);

    return () => {
      $(".selection").off("click", handleDropdownClick);
    };
  }, []);

  return (
    <>
      <div className="selection">
        <div className="select">
          <p className="select">{selected.key}</p>
        </div>
        <div className="space" />
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li
              key={index}
              id={option.key}
              onClick={() => {
                onSelect(option);
              }}
            >
              <p className="select">{option.key}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
