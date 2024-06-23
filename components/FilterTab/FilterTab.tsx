/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Checkbox } from '@mui/material';
import Image from 'next/legacy/image';
import { Input } from '../InputField/InputField.styled';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '../accordion';
import { AddIcon } from '../../icons/add-icon';
import { RemoveIcon } from '../../icons/remove-icon';
import { overviewSidebar } from '../../json/the-den';
// import {Checkbox, CheckboxGroup} from "@nextui-org/react";
// import Image from "next/image";
import { useState } from 'react';

import {
  Wrap,
  TraitWrap,
  TraitTop,
  TraitTitle,
  TraitCnt,
  TraitValue,
  RightWrap,
  ValueWrap,
  Title,
  MainBtn,
  StatusWrap,
  PriceWrap,
  PriceInputWrap,
  CloseIcon,
} from './FilterTab.styled';
import Toggle from 'react-toggle';

export const FilterTab = ({
  isDesktop,
  setFilterHide,
  filterKeys,
  filterValues,
  selectValue,
  selectedValues,
  active,
  setActive,
  isBuy,
  setBuy,
  saleLength,
  minValue,
  minChange,
  maxValue,
  maxChange,
  priceApply,
}): JSX.Element => (
  <div>
    {!isDesktop ? <CloseIcon onClick={() => setFilterHide(true)} /> : null}
    

    {filterKeys.map((key, index) => {
      const [selected, setSelected] = useState(['']);
      const [activeIndex, setActiveIndex] = useState<number | null>(null);
      const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
      };
      return (
        <TraitWrap>
          <TraitTop 
            onClick={() => {
              const newArr = active;
              newArr[index] = !newArr[index];
              setActive([...newArr]);
            }}>
            <div >


              <AccordionHeader
                icon={<AddIcon />}
                activeIcon={<RemoveIcon />}
                className="p-2.5  bg-[#ffffff]"
              >
                <button
                  className="flex items-center gap-8 lg:w-[160px] h-[15px]  xs:w-[160px]" 
                 
                  onClick={() => toggleAccordion(index)}>
                  {/* <Image src={img} alt="" /> */}
                  <TraitTitle>{key}</TraitTitle>
                  {/* <TraitCnt>{filterValues[key].length}</TraitCnt> */}
                </button>
              </AccordionHeader>
            </div>

         
          </TraitTop>
          {active[index]
            ? filterValues[key].map((value) => (
              <ValueWrap>
                <Checkbox
                  checked={
                    0 <
                    selectedValues.filter((obj) => obj[key] == value).length
                  }
                  onClick={() => selectValue(value, key)}
                  style={{
                    padding: 0,
                    marginRight: '8px',
                    color: '#D4D4D8',
                    borderRadius: '98px',
                  }}
                />
                <p className="text-sm font-medium flex items-center gap-2.5">
                  {value == '' ? 'NONE' : value}
                </p>
              </ValueWrap>
            ))
            : null}
        </TraitWrap>
      );
    })}
  </div>
);
