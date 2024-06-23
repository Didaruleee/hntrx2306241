import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
type ContainerProps = {
  columns: number;
  mobileBulk?: boolean;
};
export const Container = styled.section<ContainerProps>`
  width: 100%;
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  // grid-template-columns: ${(props) =>
    `repeat(${props.columns}, minmax(0,1fr) )`};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
  grid-auto-rows: minmax(0px, 1fr);
  @media (max-width: 598px) {
    padding-left: 10px;
    padding-right: 10px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    padding-bottom: 20px;
    // grid-template-columns: ${(props) =>
      props.mobileBulk
        ? `repeat(1, minmax(0,1fr))`
        : `repeat(2, minmax(0,1fr))`};
  }
`;
