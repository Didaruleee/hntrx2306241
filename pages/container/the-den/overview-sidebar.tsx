import {Accordion, AccordionHeader, AccordionItem, AccordionPanel} from "../../../components/accordion";
import {AddIcon} from "../../../icons/add-icon";
import {RemoveIcon} from "../../../icons/remove-icon";
import {overviewSidebar} from "../../../json/the-den";
import {Checkbox, CheckboxGroup} from "@nextui-org/react";
import Image from "next/image";
import {useState} from "react";

const OverviewSidebar = () => {
  const [selected, setSelected] = useState([""]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`xl:min-w-60 lg:min-w-52 lg:max-w-60 w-full`}>
      <Accordion defaultIndex={0}>
        {overviewSidebar.map(({img, name, menu}, index) => (
          <AccordionItem key={index} className="mb-3">
            <AccordionHeader
              icon={<AddIcon />}
              activeIcon={<RemoveIcon />}
              className="p-2 border rounded-xl bg-white"
            >
              <button
                className="flex items-center gap-5 w-full"
                onClick={() => toggleAccordion(index)}
              >
                <Image src={img} alt="" />
                <h1 className="font-semibold">{name}</h1>
              </button>
            </AccordionHeader>
            <AccordionPanel className="bg-[#fffdf7] pt-3">
              <CheckboxGroup onValueChange={(value) => setSelected(value)} aria-label="Checkbox">
                {menu.map(({item, menu_name, value}, index) => (
                  <Checkbox
                    key={index}
                    size="sm"
                    color="secondary"
                    icon={<p className="bg-secondary"></p>}
                    value={value}
                  >
                    <p className="text-sm font-medium flex items-center gap-2.5">
                      {menu_name} <span>({item})</span>
                    </p>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default OverviewSidebar;
