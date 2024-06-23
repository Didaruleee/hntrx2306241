import {AnimatePresence, motion} from "framer-motion";
import React, {ReactNode, createContext, useContext, useState} from "react";

interface AccordionContextProps {
  isActive?: boolean;
  index?: number;
  onChangeIndex?: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextProps>({});

const useAccordion = () => useContext(AccordionContext);

interface AccordionProps {
  children: ReactNode;
  multiple?: boolean;
  defaultIndex?: number;
}

function Accordion({children, multiple, defaultIndex}: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState(multiple ? [defaultIndex] : defaultIndex);

  function onChangeIndex(index: number) {
    setActiveIndex((currentActiveIndex) => {
      if (!multiple) {
        return index === activeIndex ? -1 : index;
      }

      if ((currentActiveIndex as number[])?.includes(index)) {
        return (currentActiveIndex as number[])?.filter((i) => i !== index);
      }

      return (currentActiveIndex as number[])?.concat(index) ?? [index];
    });
  }

  return React?.Children?.map(children, (child, index) => {
    const isActive =
      multiple && Array?.isArray(activeIndex)
        ? activeIndex?.includes(index)
        : activeIndex === index;

    return (
      <AccordionContext.Provider value={{isActive, index, onChangeIndex}}>
        {child}
      </AccordionContext.Provider>
    );
  });
}

interface AccordionItemProps {
  children: ReactNode;
  className?: string;
}

function AccordionItem({className, children}: AccordionItemProps) {
  return <div className={`${className} rounded-lg overflow-hidden bg-white`}>{children}</div>;
}

interface AccordionHeaderProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  activeIcon?: ReactNode;
}

function AccordionHeader({icon, activeIcon, className, children}: AccordionHeaderProps) {
  const {isActive, index, onChangeIndex} = useAccordion();

  return (
    <motion.div
      className={`${className ?? ""} cursor-pointer transition-colors duration-150 ease-in-out ${
        isActive ? "active" : ""
      }`}
      onClick={() => onChangeIndex && onChangeIndex(index as number)}
    >
      <div className="flex items-center justify-between">
        <div>{children}</div>
        <div>{isActive ? activeIcon ?? "" : icon ?? ""}</div>
      </div>
    </motion.div>
  );
}

interface AccordionPanelProps {
  children: ReactNode;
  className?: string;
}

function AccordionPanel({className, children}: AccordionPanelProps) {
  const {isActive} = useAccordion();

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{height: 0}}
          animate={{height: "auto"}}
          exit={{height: 0}}
          transition={{type: "spring", duration: 0.4, bounce: 0}}
        >
          <div className={`${className ?? ""} px-5 !mt-0`}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export {Accordion, AccordionHeader, AccordionItem, AccordionPanel};
