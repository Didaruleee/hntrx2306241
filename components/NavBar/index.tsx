import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../Button';
import SearchInput from '../SearchInput';
import { Imagea } from '../../styles/index.styled';
import Image from 'next/image';
import { addPrecisionDecimal } from '../../utils';

import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import { MenuIcon } from '../../icons/menu-icon';
import { navigationData, navigationMoreData } from '../../json/navbar';
import { motion } from 'framer-motion';
// import image from 'next/image';
import images from '../images';
import NavLink from '../nav-link';
import {
  Background,
  Nav,
  NavLeftContainer,
  Section,
  AvatarContainer,
  ImageLink,
  DropdownLink,
  GradientBackground,
  DropdownList,
  MobileIcon,
  DesktopIcon,
  DesktopNavLink,
  DesktopOnlySection,
  Name,
  Subtitle,
  Balance,
  OpenSearchButton,
  UserMenuButton,
  UserMenuText,
  CloseIconButton,
  WalletButton,
  WalletButtonnew,
  ColorCircle,
  DropDownItem,
  DropBalanceWrap,
  DropBalanceCol,
  DropdownProfile,
  ViewProfileText,
  WalletImg,
  ArrowDownIcon,

  DropdownListnavnew,
} from './NavBar.styled';
import {
  useScrollLock,
  useEscapeKeyClose,
  useWindowSize,
  useNavigatorUserAgent,
} from '../../hooks';
import { useAuthContext } from '../Provider';
import MagnifyingIcon from '../../public/icon-light-search-24-px.svg';
import CloseIcon from '../../public/icon-light-close-16-px.svg';
import { TOKEN_SYMBOL } from '../../utils/constants';

type DropdownProps = {
  isOpen: boolean;
  closeNavDropdown: () => void;
};

const Logo = ({ bgColor }: { bgColor?: string }): JSX.Element => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const pathname = usePathname();
  const { currentUser, login } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  useScrollLock(isOpen);

  const toggleNavDropdown = () => {
    // setMobileHide(true);
    setIsOpen(!isOpen);
  };

  const closeNavDropdown = () => setIsOpen(false);

  const connectWallet = async () => {
    setIsLoginDisabled(true);
    await login();
    closeNavDropdown();
    setIsLoginDisabled(false);
  };
  const { isDesktop } = useNavigatorUserAgent();

  const mobileSearchHiddenNavItems = isMobileSearchOpen ? null : (
    <>
      {/* <OpenSearchButton
        onClick={() => {
          setIsMobileSearchOpen(true);
           setMobileHide(true);
        }}>
        <MagnifyingIcon />
      </OpenSearchButton> */}
      {currentUser && currentUser.avatar ? (
        <UserAvatar
          isOpen={isOpen}
          avatar={currentUser.avatar}
          toggleNavDropdown={toggleNavDropdown}
          user={currentUser}
          isDesktop={isDesktop}
        />
      ) : (
        <WalletButton disabled={isLoginDisabled} onClick={connectWallet}>
          <>
            <WalletImg></WalletImg>
            {isDesktop ? (
              <span>Connect Wallet</span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </>
        </WalletButton>
      )}
    </>
  );
  const mobileSearchHiddenNavItemsnew = isMobileSearchOpen ? null : (
    <>
      {/* <OpenSearchButton
        onClick={() => {
          setIsMobileSearchOpen(true);
           setMobileHide(true);
        }}>
        <MagnifyingIcon />
      </OpenSearchButton> */}
      {currentUser && currentUser.avatar ? (
        <UserAvatar
          isOpen={isOpen}
          avatar={currentUser.avatar}
          toggleNavDropdown={toggleNavDropdown}
          user={currentUser}
          isDesktop={isDesktop}
        />
      ) : (
        <WalletButtonnew disabled={isLoginDisabled} onClick={connectWallet}>
          <>
            <WalletImg></WalletImg>
            {isDesktop ? (
              <span>Connect Wallet</span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </>
        </WalletButtonnew>
      )}
    </>
  );

  if (typeof window !== 'undefined') {
    if (window.location.pathname == '/') {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
  }
  return (
    <Navbar
      isBordered
      className={`${bgColor ?? 'bg-[#fffdf7]'} py-3`}
      style={{ zIndex: 1000 }}>
      <NavbarContent>
        <NavbarBrand>
          <Link className="font-bold text-inheri pr-8" href={'/'}>
            <div className="  flex  justify-end w-full  ">
              <Image
                src={images.logo}
                alt="logo"
                className={`${
                  (bgColor === 'bg-primary' && 'bg-[#000000]') ||
                  (bgColor === 'bg-primary_yellow' && 'bg-[#419B69]') ||
                  (bgColor === 'bg-primary_orange' && 'bg-[#D40000]') ||
                  (bgColor === 'bg-primary_pink' && 'bg-[#873392]') ||
                  (bgColor === 'bg-primary_white' && 'bg-[#036B1F]') ||
                  (bgColor === 'bg-primary_orange_deep' && 'bg-[#3f5084]') ||
                  (bgColor === 'bg-primary_gray' && 'bg-[#D43AE1]') ||
                  'bg-[#000000]'
                } rounded-full p-1 w-12 h-12 sm:w-14 sm:h-14`}
              />
              <Image
                src={images.logo_text}
                alt="logo"
                className="w-28 h-14 sm:w-36 sm:h-14  "
              />
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="lg:hidden absolute right-5 " justify="end">
        <Button onClick={() => setNavbar(!navbar)}>
          <MenuIcon />
        </Button>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex   " justify="center">
        {navigationData.map(({ link, name }, index) => (
          <NavbarItem key={index}>
            <NavLink href={link ?? ''} className="nav-link">
              {name}
            </NavLink>
          </NavbarItem>
        ))}
        <Dropdown placement="top-end">
          <NavbarItem>
            <DropdownTrigger>
              <button
                className={`${pathname === '' ? 'bg-primary text-light' : 'font-normal'}`}
                style={{
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '20px',
                }}>
                More
              </button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label={`More Data`}
            className="md:w-[380px]"
            itemClasses={{
              base: 'gap-4',
            }}>
            {navigationMoreData?.map(({ description, link, name }, key) => (
              <DropdownItem
                description={description}
                key={key}
                textValue={name}>
                <NavLink href={link ?? ''} className="nav-link text-start">
                  {name}
                </NavLink>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {pathname === '/' ? (
        <NavbarContent justify="end" className="hidden lg:flex relative">
          <NavbarItem className="hidden md:flex">
            <Imagea
              //  priority
              //  quality={100}
              className="w-8 h-8 bg-black p-2 rounded-full"
              src={images.twitter.src}
              alt="wallet"
              width="2rem"
              height="2rem"
            />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Imagea
              // priority
              // quality={100}
              className="w-8 h-8 bg-black p-2 rounded-full"
              src={images.telegram.src}
              alt="wallet"
              width="2rem"
              height="2rem"
            />
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Imagea
              // priority
              // quality={100}
              className="w-8 h-8 bg-black p-2 rounded-full"
              src={images.instagram.src}
              alt="wallet"
              width="2rem"
              height="2rem"
            />
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end" className="hidden lg:flex relative ">
          <NavbarItem className="hidden lg:flex">
            <div className="text-center   justify-center items-center ">
              <Background isMobileSearchOpen={isMobileSearchOpen || isOpen}>
                <Section>
                  {/* <DesktopNavRoutes /> */}
                  {mobileSearchHiddenNavItems}
                </Section>
              </Background>
              <Dropdownnew
                isOpen={isOpen}
                closeNavDropdown={closeNavDropdown}
              />
              <GradientBackground isOpen={isOpen} onClick={closeNavDropdown} />
            </div>
          </NavbarItem>
        </NavbarContent>
      )}
      {navbar && (
        <motion.section
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.3 }}
          className="backdrop-blur bg-black/20 w-full h-screen lg:hidden block fixed top-0 right-0 z-50 overflow-hidden ">
          <motion.section
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="bg-white  md:min-w-[400px] xs:max-w-[240px] sm:min-w-[340px]  h-screen  fixed  top-0 right-0">
            <Button onClick={() => setNavbar(!navbar)}>X</Button>
            {/* <Divider /> */}
            <div className="flex flex-col xl:hidden gap-2 ">
              <div className="flex flex-wrap relative">
                <div className="flex flex-col gap-2">
                  {navigationData.map(({ link, name }, index) => (
                    <div key={index} className="ml-6">
                      <NavLink href={link ?? ''} className="nav-link">
                        {name}
                      </NavLink>
                    </div>
                  ))}
                </div>
                {/* <Imagea
                  src={images.mobile_nav.src}
                  alt="logo"
                  className="w-32 h-fit absolute top-1 right-3"
                /> */}
              </div>
              <Dropdown placement="top-start">
                <div>
                  {/* <Divider className="mb-2" />  */}
                  <DropdownTrigger>
                    <button
                      className={`${pathname === '' ? 'bg-primary text-light' : ''} ml-9`}
                      style={{
                        fontFamily: 'Courier New, Courier, monospace',
                        fontSize: '20px',
                      }}>
                      More
                    </button>
                  </DropdownTrigger>
                </div>

                <DropdownMenu
                  aria-label={`More Data`}
                  className="h-60 overflow-y-scroll"
                  itemClasses={{
                    base: 'gap-4',
                  }}>
                  {navigationMoreData?.map(
                    ({ description, link, name }, key) => (
                      <DropdownItem
                        description={description}
                        key={key}
                        textValue={name}>
                        <NavLink
                          href={link ?? ''}
                          className="nav-link text-start">
                          {name}
                        </NavLink>
                      </DropdownItem>
                    ),
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            {/* {pathname === '/' ? null : ( */}
              <div className=" md:pt-20 pt-10 lg:hidden flex justify-center">
                <Section>
                  {/* <DesktopNavRoutes /> */}
                  {mobileSearchHiddenNavItemsnew}
                </Section>
                <Dropdownnew
                  isOpen={isOpen}
                  closeNavDropdown={closeNavDropdown}
                />
                <GradientBackground
                  isOpen={isOpen}
                  onClick={closeNavDropdown}
                />
              </div>
            {/* )} */}
            <div>
            <div className="flex justify-center ">
              <section className="  absolute bottom-10 ">
                <div className="flex space-x-8">
                  <Imagea
                    // priority
                    // quality={100}
                    className="w-8 h-8 bg-black p-2 rounded-full"
                    src={images.twitter.src}
                    alt="wallet"
                    height="2rem"
                    width="2rem"
                  />
                  <Imagea
                    // priority
                    // quality={100}
                    className="w-8 h-8 bg-black p-2 rounded-full"
                    src={images.telegram.src}
                    alt="wallet"
                    height="2rem"
                    width="2rem"
                  />
                  <Imagea
                    // priority
                    // quality={100}
                    className="w-8 h-8 bg-black p-2 rounded-full"
                    src={images.instagram.src}
                    alt="wallet"
                    height="2rem"
                    width="2rem"
                  />
                </div>
              </section>
            </div>
            <div className="flex justify-center ">
              <div className=" absolute bottom-0 text-gray-400 xs:text-xs sm:text-base md:p-4 xs:p-2 ">
                <p>© 2024 hntrx. All rights reserved.</p>
              </div>
            </div>
            </div>
          </motion.section>
        </motion.section>
      )}
    </Navbar>
  );
};

const UserAvatar = ({ isOpen, avatar, toggleNavDropdown, user, isDesktop }) => {
  const currentUserAvatar = isDesktop ? (
    <UserMenuButton>
      <AvatarContainer>
        <Imagea
          alt="chain account avatar"
          src={
            avatar == "data:image/jpeg;base64,''" || avatar == ''
              ? '/default-avatar.png'
              : avatar
          }
          width="32px"
          height="32px"
          style={{ borderRadius: '50%' }}
        />
        <ColorCircle color={'#12B76A'} />
      </AvatarContainer>
      <UserMenuText>{user.acc}</UserMenuText>
      <ArrowDownIcon />
    </UserMenuButton>
  ) : (
    <UserMenuButton>
      <AvatarContainer>
        <Imagea
          alt="chain account avatar"
          src={
            avatar == "data:image/jpeg;base64,''" || avatar == ''
              ? '/default-avatar.png'
              : avatar
          }
          width="32px"
          height="32px"
          style={{ borderRadius: '50%' }}
        />
        <ColorCircle color={'#12B76A'} />
      </AvatarContainer>
      <UserMenuText>{user.acc}</UserMenuText>
      <ArrowDownIcon />
    </UserMenuButton>
  );

  const mobileNavbarIcon = isOpen ? (
    <CloseIconButton>{/* <CloseIcon /> */}</CloseIconButton>
  ) : (
    currentUserAvatar
  );

  return (
    <>
      <DesktopIcon onClick={toggleNavDropdown} role="button">
        {currentUserAvatar}
      </DesktopIcon>
      <MobileIcon onClick={toggleNavDropdown} role="button">
        {mobileNavbarIcon}
      </MobileIcon>
    </>
  );
};

const Dropdownnew = ({
  isOpen,
  closeNavDropdown,
}: DropdownProps): JSX.Element => {
  const router = useRouter();
  const { currentUser, currentUserXprBalance, logout } = useAuthContext();
  const { isMobile, isTablet } = useWindowSize();
  useEscapeKeyClose(closeNavDropdown);

  const routes =
    isMobile || isTablet
      ? [
          // {
          //   name: 'Explore',
          //   path: '/',
          //   onClick: closeNavDropdown,
          // },
          // {
          //   name: 'My Items',
          //   path: `/user/${currentUser ? currentUser.actor : ''}`,
          //   onClick: closeNavDropdown,
          // },
          {
            name: 'Sign out',
            path: '',
            onClick: () => {
              closeNavDropdown();
              logout();
              router.push('/');
            },
            isRed: true,
          },
        ]
      : [
          {
            name: 'Sign out',
            path: '',
            onClick: () => {
              closeNavDropdown();
              logout();
              router.push('/');
            },
            isRed: true,
          },
        ];

  return (
    <DropdownListnavnew isOpen={isOpen} className="bg-white">
      {currentUser && currentUser.avatar ? (
        <DropdownProfile>
          {/* <AvatarContainer> */}
          {/* <Imagea
              alt="chain account avatar"
              src={
                currentUser.avatar == "data:image/jpeg;base64,''" ||
                currentUser.avatar == ''
                  ? '/default-avatar.png'
                  : currentUser.avatar
              }
              width="43px"
              height="43px"
              style={{ borderRadius: '50%' }}
            /> */}
          {/* <ColorCircle color={'#12B76A'} /> */}
          {/* </AvatarContainer> */}
          <DropBalanceCol>
            <UserMenuText>{currentUser.name}</UserMenuText>
          </DropBalanceCol>
          <Imagea
            src="/new/pf-arrow-down.svg"
            width="20px"
            height="20px"
            style={{
              transform: 'rotate(180deg)',
              position: 'absolute',
              right: '26px',
              cursor: 'pointer',
            }}
            onClick={closeNavDropdown}
          />
        </DropdownProfile>
      ) : null}
      <DropBalanceWrap>
        <Imagea src="/new/wallet-xpr.svg" width="33px" height="33px" />
        <DropBalanceCol>
          <Subtitle>Main Wallet:</Subtitle>
          <Balance>
            {`${addPrecisionDecimal(
              currentUserXprBalance.substring(
                0,
                currentUserXprBalance.indexOf('.'),
              ),
              0,
              false,
            )} XPR` || `0.0000 ${TOKEN_SYMBOL}`}
          </Balance>
        </DropBalanceCol>
      </DropBalanceWrap>
      {routes.map(({ name, path, onClick, isRed }) =>
        path ? (
          <Link href={path} passHref key={name}>
            <DropdownLink onClick={onClick}>{name}</DropdownLink>
          </Link>
        ) : (
          <DropDownItem>
            {/* <Imagea src={iconPath} width="16px" height="16px" /> */}
            <DropdownLink tabIndex={0} onClick={onClick} key={name} red={isRed}>
              {name}
            </DropdownLink>
          </DropDownItem>
        ),
      )}
    </DropdownListnavnew>
  );
};

const DesktopNavRoutes = () => {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  const routes = [
    // {
    //   name: 'Explore',
    //   path: '/',
    // },
    // {
    //   name: 'My Items',
    //   path: `/user/${currentUser ? currentUser.actor : ''}`,
    // },
    // {
    //   name: 'Create',
    //   path: `/create`,
    // },
    // {
    //   name: 'Bridge',
    //   path: `/bridge`,
    // },
  ];

  return (
    <DesktopOnlySection>
      {routes.map(({ name, path }) => {
        const isActive = router.pathname.split('/')[1] === path.split('/')[1];
        const shouldRefresh =
          router.pathname.includes('create') && path.includes('create');
        const isHidden = !currentUser;
        const refreshPage = () => router.reload();
        return isHidden ? null : (
          <Link href={path} passHref key={name}>
            <DesktopNavLink
              isActive={isActive}
              onClick={shouldRefresh ? refreshPage : null}>
              {name}
            </DesktopNavLink>
          </Link>
        );
      })}
    </DesktopOnlySection>
  );
};

export default Logo;
