import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const Container = styled.section`
  //  width: 100%;
  display: inline-grid;
  grid-column-gap: 71px;
  grid-row-gap: 50px;
  

  grid-template-columns: repeat(4, minmax(0, 1fr));

  ${breakpoint.laptop`
    grid-template-columns: repeat(3, minmax(0, 1fr));
  `}

  ${breakpoint.tablet`
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-column-gap: 60px;
  `}

  ${breakpoint.mobile`
    
    grid-template-columns: repeat(2, minmax(0, 1fr));
  
    grid-column-gap: 20px;
    align-item:center;
      
  `}

`;
