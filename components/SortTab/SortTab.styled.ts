import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
type MainBtnProps = {
  isBackColor: boolean;
};
export const Wrap = styled.div`
 z-index: 400;
`;
export const ZIndex = styled.div`
  z-index: 400;
`;

export const MainBtn = styled.button<MainBtnProps>`
  width: 40px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7b0a75;
  color: #ffffff;
  border: 1.5px solid #7b0a75;
  border-radius: 8px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  text-align: center;
  ${breakpoint.mobile`
    width: 100%;
    margin-bottom: 15px;
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    text-align: center;
    letter-spacing: 0.01em;
  `}
`;

export const RefreshBox = styled.div`
  width: 48px !important;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 8px;
  margin-right: 8px;
  margin-left: 8px;
  ${breakpoint.mobile`
    margin: 0;
    margin-left: 20px;
  `}
`;

export const SelectWrap = styled.div`
 
  border-radius: 5px;
  ${breakpoint.mobile`
    width: 100%;
    .MuiInputBase-root{
      width: 100%;
    }
  `}
  .top-col-select .MuiSelect-select {
    border-radius: 8px;
    
    padding: 12px 32px 12px 20px;
  }
  .col-form-select .MuiSelect-select {
    border-radius: 8px;
  
    padding: 12px 32px 12px 20px;
  }
  .col-form-select .MuiSvgIcon-root {
   
  }
  .top-col-select .MuiSvgIcon-root {
   
`;

export const SelectBox = styled.select`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #a6a9b9;
  width: 100%;
 
    url('/new/arrow-down.svg') calc(100% - 10.5px) center no-repeat;
  background-size: 14px;
  outline: 0 none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  padding-left: 14px;
  ${breakpoint.mobile`
    width: 100%;
    margin: 0;
    margin-bottom: 15px;
    padding-left: 109px;
  `}
`;

type WrapProps = {
  width: number;
  mr?: number;
};

export const WrapDiv = styled.div<WrapProps>`

  .form-control {
    width: 100%;
  }
  ${breakpoint.mobile`
    width: 100%;
    display: flex;
    .form-control{
      width:100%;
      height:38px;
      margin-bottom:18px;
    }
  `}
`;

export const FilterIcon = styled.img`
  width: 16px;
  height: 16px;
  position: relative;
  margin-left: -12px;
  margin-right: 12px;
`;
