import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { breakpoint } from '../../styles/Breakpoints';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

type DropdownProps = {
  isOpen: boolean;
};

export type GradientBackgroundProps = {
  isOpen: boolean;
};

type DropdownLinkProps = {
  red?: boolean;
};

type NavLinkProps = {
  isActive: boolean;
};

type ColorCircleProps = {
  color: string;
};
export const WalletButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 14px 16px;
  gap: 10px;
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
  span {
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.01em;
  }
  @media (max-width: 598px) {
    width: 190px;
    border-radius: 4px;
    height: 38px;
    padding: 2px 10px;
    span {
      font-family: 'Futura';
      font-style: normal;

      font-size: 16px;
      letter-spacing: 0.01em;
    }
  }
`;

export const WalletButtonnew = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 14px 16px;
  gap: 10px;
  width: 160px;
  height: 30px;
  background-color: black;
  color: white;
  border-radius: 10px;
  flex: none;
  order: 0;
  flex-grow: 0;
  span {
    font-family: 'Futura';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.01em;
  }
  @media (max-width: 598px) {
    width: 160px;
    height: 35px;
    padding: 2px 15px;
  }
`;
type BackgroundProps = {
  isMobileSearchOpen: boolean;
};
export const Background = styled.section<BackgroundProps>`
  width: 100%;

  z-index: 101;
  top: 0;
  @media (max-width: 598px) {
    position: fixed;
  }
`;

export const Nav = styled(MaxWidth).attrs({ as: 'nav' })`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 124px;
  padding-left: 47px;
  padding-right: 47px;
  @media (max-width: 598px) {
    padding-left: 20px;
    padding-right: 20px;
    height: 80px;
  }
`;

export const NavLeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const ColorCircle = styled.div<ColorCircleProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;

  position: absolute;
  bottom: 0;
  right: 0px;
`;
export const UserMenuButton = styled.button`
  width: 180px;
  height: 40px;

  box-shadow: 0px 1px 1px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
 
  align-items: center;
  padding: 0 18px;
  background-color: black;
  color: white;
  :focus-visible {
    border: 1px solid #7b0a75;
  }
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 14px 16px;
  gap: 10px;
  width: 200px;
  height: 40px;
  background-color: black;
  color: white;
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
  span {
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 0.01em;
  }
  @media (max-width: 598px) {
    width: 160px;
    height: 35px;
    padding: 2px 10px;
    display:flex

    span {
      font-family: 'Futura';
      font-style: normal;

      font-size: 16px;
      letter-spacing: 0.01em;
    }
  }
`;

export const UserMenuText = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  display: flex;

  align-items: center;

  margin-left: 15px;
`;

export const AvatarContainer = styled(FadeInImageContainer)`
  position: relative;

  @media only screen and (max-width: 600px) {
    height: 32px !important;
    width: 32px !important;
  }
`;

export const ImageLink = styled.a`
  margin: 23px 0;
  z-index: 3;

  ${breakpoint.tablet`
    margin: 26.5px 0;
  `}
`;
export const DropDownItem = styled.div`
  display: flex;
  width: 100%;
  height: 50px;

  padding-left: 25px;
`;
export const DropdownList = styled.section<DropdownProps>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 185px;
  

  border-radius: 8px;
  box-shadow:
    0 12px 10px 0px rgba(0, 0, 0, 0.1),
    0 0 8px 0 rgba(0, 0, 0, 0.08);
  min-width: 200px;
  z-index: 403;

  ${breakpoint.sMobile`
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    right: 0;
    z-index: 103;
    width: 100%;
  
    &:before {
      content: '';
  
      width: 100%;
      height: 320px;
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
    }
  `}
`;


export const DropdownListnavnew = styled.section<DropdownProps>`
 display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: relative;
  top: 132px;
  right:30px
  border-radius: 8px;
  box-shadow:
    0 12px 10px 0px rgba(0, 0, 0, 0.1),
    0 0 8px 0 rgba(0, 0, 0, 0.08);
  min-width: 200px;
  z-index: 403;

  
`;
export const GradientBackground = styled.div<GradientBackgroundProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;

  ${breakpoint.sMobile`
    
  `}
`;

export const Name = styled.span`
  font-family: CircularStdBold;

  font-size: 14px;
  line-height: 24px;
  margin: 16px 16px 11px;

  ${breakpoint.tablet`
    margin: 16px 0 11px;
  `}
`;

export const Subtitle = styled.span`
  font-family: 'Futura';
  font-style: normal;

  font-size: 16px;
`;
export const DropdownProfile = styled.div`
  display: flex;
  padding: 2.5px 2px 2.5px 2px;
  align-items: center;
`;
export const Balance = styled(Name)`
  font-family: 'Futura';
  font-style: normal;

  font-size: 16px;
  line-height: 6px;

  padding-left: 10px;
  margin: 0;
  margin-top: 15px;
`;
export const ViewProfileText = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  color: #7b0a75;
  margin-left: 15px;
`;
export const DropBalanceWrap = styled.div`
  display: flex;
  padding-left: 15px;
  align-items: center;

  padding-bottom: 15.5px;
  padding-top: 15.5px;
`;

export const DropBalanceCol = styled.div`
  align-items: center;
`;
export const DropdownLink = styled.a<DropdownLinkProps>`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  width: 100%;
  transition: 0.2s;
  margin-left: 10px;
  :hover {
  }

  ${breakpoint.tablet`
    padding: 8px 0;
  `}
`;

export const DesktopOnlySection = styled.section`
  ${breakpoint.tablet`
    display: none;
  `}
`;

export const DesktopNavLink = styled.a<NavLinkProps>`
  color: ${({ isActive }) => (isActive ? '#1a1a1a' : '#808080')};
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  margin-right: 24px;
  transition: 0.2s;

  :hover,
  :focus-visible {
    color: #1a1a1a;
  }
`;

export const MobileIcon = styled.div`
  display: none;
  cursor: pointer;

  ${breakpoint.tablet`
    display: block;
  `}
  ${breakpoint.laptop`
    display: none;
  `}
  ${breakpoint.mobile`
    display: block;
    padding-left: 10px;
  `}
`;

export const DesktopIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${breakpoint.laptop`
    display: block;
  `}

  ${breakpoint.tablet`
    display: block;
  `}
`;
export const LaptopIcon = styled.div`
  display: none;
  cursor: pointer;

  ${breakpoint.laptop`
    display: block;
  `}
`;
export const OpenSearchButton = styled.button`
  display: none;
  width: 40px;
  height: 40px;

  border-radius: 100%;

  outline: none;
  cursor: pointer;
  margin-right: 8px;
  justify-content: center;
  align-items: center;

  :focus,
  :focus-visible {
  }

  ${breakpoint.tablet`
    display: flex;
  `}
`;

export const CloseIconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  cursor: pointer;
  border-radius: 100%;
  z-index: 3;
  width: 40px;
  height: 40px;
  background: #f2f2f2;
  outline: none;

  :focus,
  :focus-visible {
    border: 1px solid #7b0a75;
  }

  * {
    z-index: 3;
  }
`;

export const WalletImg = styled.div`
  width: 20px;
  height: 19px;
  background-image: url('/images/wallet.png');
  background-size: cover;
`;

export const ArrowDownIcon = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;

  background-size: cover;
  position: absolute;
  right: 60px;
`;
