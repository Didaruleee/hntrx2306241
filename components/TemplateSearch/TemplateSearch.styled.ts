import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type InputContainerProps = {
  isSearchInputActive: boolean;
  isMobileSearchOpen: boolean;
};

type ClearTextButtonProps = {
  isVisibleOnDesktop: boolean;
};

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  
`;

export const MagnifyingIconButton = styled(IconButton)`
  margin-left: 16px;
  ${breakpoint.tablet`
    margin-left: 18px;
  `}
`;

export const ClearTextButton = styled(IconButton)<ClearTextButtonProps>`
  display: ${({ isVisibleOnDesktop }) =>
    isVisibleOnDesktop ? 'flex' : 'none'};
  margin-right: 12px;
  border-radius: 100%;
  transition: 0.3s;
  border: 1px solid white;

  :hover,
  :focus-visible {
    transform: scale(1.3);
    background: #f2f2f2;
    border: 1px solid #7b0a75;
  }

  ${breakpoint.tablet`
    display: flex;
  `}
`;

export const InputContainer = styled.div<InputContainerProps>`
  border-radius: 6px;
  transition: 0.2s;
  display: flex;
  padding: 0px 0px 0px 10px;
  align-items: center;
  justify-content: center;
  width:200px;
  
  height:40px;
  background: white;
  border: 1px solid black;
  gap-20px;
 
 
 

  :focus,
  :focus-visible {
    
  }
  @media only screen and (max-width: 640px) {
  img {
    display:none;
  }
  }
   @media only screen and (max-width: 770px) {
   width: 170px;
     height:40px;
      img {
    height: 20,
            width: 20,
  }
  }

   @media only screen and (max-width: 640px) {
   width: 160px;
     height:40px;
  }


    ${breakpoint.sMobile`
     ${({ isMobileSearchOpen }) => !isMobileSearchOpen && `display: visible;`}
     
     width: 110px;
     height:30px;
    
   
   `}
`;

export const Input = styled.input`
  width:150px;
  height: 20px;
  font-size: 16px;
  color: black;
 z-index:40000;
  border-radius: 8px;
  border: none;
  outline: none;
  line-height: 24px;
  background: none;
  
 
  :focus {
    outline: none;
    border: none;
    --tw-ring-shadow: none;
  }

  ${breakpoint.tablet`
   font-size: 14px;
    width:100%;
  height: 70%;

    
  `}
`;
