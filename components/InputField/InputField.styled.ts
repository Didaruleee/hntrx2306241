import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type InputProps = {
  hasError: boolean;
  halfWidth?: boolean;
  mr?: string;
  ml?: string;
  mb?: string;
  mt?: string;
  disabled?: boolean;
};

export const InputContainer = styled.div<InputProps>`
   border: '0.1px solid  #f2f2f2';
    borderRadius: '10px';
  width: ${({ halfWidth }) => (halfWidth ? '50%' : '100%')};
  margin-right: ${({ mr }) => (mr ? mr : 0)};
  margin-left: ${({ ml }) => (ml ? ml : 0)};
  margin-top: ${({ mt }) => (mt ? mt : 0)};
  margin-bottom: ${({ mb }) => (mb ? mb : 0)};
  transition: 0.2s;
  display: flex;
  align-items: center;
  position: relative;
  
  ${breakpoint.mobile`
    border:none;
    border-radius:none;
    margin-bottom: 15px;
  `};
  :hover,
  :focus,
  :focus-visible {
    
  }

  ${({ disabled }) =>
    disabled &&
    `
    border: none;
    
    :hover,
    :focus,
    :focus-visible {
      border: none;
    }
  `}
`;

export const Input = styled.input`
  width: 100%;
  font-size: 16px;
  
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  line-height: 24px;
  
  -moz-appearance: textfield;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  ::placeholder {
   
  }

  :disabled {
    background-color: #ebebe4;
   
    ::placeholder {
      
    }
  }
`;

export const ErrorMessage = styled.p`
  position: absolute;
  
  padding: 12px 16px;
  border-radius: 8px;
  top: 60px;
  left: 0;
  font-size: 14px;
  z-index: 1;
  background: #7b0a75;

  ::before {
    position: absolute;
    content: '';
    top: -6px;
    left: 16px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #7b0a75;
  }
`;
