import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type ItemWrapProps = {
  columns: number;
};

export const Container = styled.div``;

export const ItemWrap = styled.div<ItemWrapProps>`
  margin-top: 20px;
  margin-bottom: 60px;
  display: grid;
  // grid-template-columns: ${(props) =>
    `repeat(${props.columns}, minmax(0,1fr) )`};
  gap: 20px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  ${breakpoint.mobile`
    grid-template-columns: repeat(2, minmax(0,1fr));
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 0;
    margin-top: 0px;
    padding-bottom: 50px;
  `}
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  mix-blend-mode: normal;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15));
  border-radius: 16px;
  // background: ${(props) => props.theme.colors.altbgColor};
`;

export const ItemImgWrap = styled.div`
  width: 100%;
  height: 260px;
  max-height: 312px;
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
`;

export const ColName = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  // color: ${(props) => props.theme.colors.titleColor};
  flex: none;
  order: 0;
  flex-grow: 0;
  text-align: left;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const BottomWrap = styled.div`
  display: flex;
  height: 20%;
  flex-direction: column;
  padding: 24px 19px 18px 19px;
  max-height: 138px;
  ${breakpoint.mobile`
    padding: 10px;
  `}
`;

export const BetweenWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;
export const NormalText = styled.p`
  width: 100%;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  // color: ${(props) => props.theme.colors.titleColor};
  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const PurpleText = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #7b0a75;
  display: flex;
  align-items: center;
`;

export const ItemCount = styled.div`
  position: absolute;
  top: 19.78px;
  right: 20px;
  width: 83px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(19, 12, 26, 0.15);
  mix-blend-mode: normal;
  border-radius: 23px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #ffffff;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const NoDataWrap = styled.div`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  padding: 0 47px 47px 47px;
  min-height: 500px;
  // color: ${(props) => props.theme.colors.titleColor};
  ${breakpoint.mobile`
    padding: 0;
    padding-left: 20px;
  `}
`;
