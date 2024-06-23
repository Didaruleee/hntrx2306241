'use client';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import images from '../components/images';
// import Navigation from '../components/navbar';
// import { Title } from '../styles/Title.styled';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import PageLayout from '../components/PageLayout';
// import ExploreCard from '../components/ExploreCard';
// import Banner from '../components/Banner';
// import HomepageStatistics from '../components/HomepageStatistics';
// import { MODAL_TYPES } from '../components/Provider';
import { useFirebaseFeaturedTemplates } from '../services/firebase';
// import Grid from '../components/Grid';
// import { CARD_RENDER_TYPES } from '../utils/constants';
// import PaginationButton from '../components/PaginationButton';
import CloseIcon from '../public/icon-light-close-16-px.svg';
import { addPrecisionDecimal } from '../utils';
import Link from 'next/link';
import { TOKEN_SYMBOL } from '../utils/constants';
import {
  Template,
  // getTemplatesByCollection,
  // formatTemplatesWithPriceData,
  // getLowestPricesForAllCollectionTemplates,
} from '../services/templates';
import { getCollectionpagination } from '../services/collections';

import { PAGINATION_LIMIT, RouterQuery, Filter } from '../utils/constants';
import { useAuthContext } from '../components/Provider';
import {
  useScrollLock,
  useEscapeKeyClose,
  useWindowSize,
  useNavigatorUserAgent,
} from '../hooks';
import NavLink from "../components/nav-link";
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
  ColorCircle,
  DropDownItem,
  DropBalanceWrap,
  DropBalanceCol,
  DropdownProfile,
  ViewProfileText,
  WalletImg,
  ArrowDownIcon,
} from '../components/NavBar/NavBar.styled';
import { Imagea } from '../styles/index.styled';
// import NavBar from '../components/NavBar/index';
// import { Navbar } from '@nextui-org/react';
import Logo from '../components/NavBar/index';
import { relative } from 'path';

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
    <CloseIconButton>
      {/* <CloseIcon /> */}
    </CloseIconButton>
  ) : (
    currentUserAvatar
  );

  return (
    <>
      <DesktopIcon onClick={toggleNavDropdown} role="button">
        {currentUserAvatar}
      </DesktopIcon>
      {/* <MobileIcon onClick={toggleNavDropdown} role="button">
        {mobileNavbarIcon}
      </MobileIcon> */}
    </>
  );
};

type DropdownProps = {
  isOpen: boolean;
  closeNavDropdown: () => void;
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
    <DropdownList isOpen={isOpen} className='bg-white'>
      {currentUser && currentUser.avatar ? (
        <DropdownProfile>
          <AvatarContainer>

            <ColorCircle color={'#12B76A'} />
          </AvatarContainer>
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
        <Imagea src="new/wallet-xpr.svg" width="33px" height="33px" />
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
    </DropdownList>
  );
};

const MarketPlace = (): JSX.Element => {
  const router = useRouter();
  const featuredTemplates = useFirebaseFeaturedTemplates();
  const [renderedTemplates, setRenderedTemplates] = useState<Template[]>([]);
  const [prefetchedTemplates, setPrefetchedTemplates] = useState<Template[]>(
    [],
  );
  const [prefetchPageNumber, setPrefetchPageNumber] = useState<number>(6);
  const [lowestPrices, setLowestPrices] = useState<{ [id: string]: string }>(
    {},
  );
  const { collection: caseSensitiveCollection } = router.query as RouterQuery;
  const collection = caseSensitiveCollection
    ? caseSensitiveCollection.toLowerCase()
    : '';
  const [isLoadingNextPage, setIsLoadingNextPage] = useState<boolean>(true);

  const showNextPage = async () => {
    await getCollectionpagination();
  };

  const pathname = usePathname();
  // local state
  const [bgColor, setBgColor] = useState('');
  const [leadingImages, setLeadingImages] = useState<
    string | StaticImport | undefined
  >();

  // react hooks
  useEffect(() => {
    const colors = [
      'bg-primary',
      'bg-primary_yellow',
      'bg-primary_orange',
      'bg-primary_pink',
      'bg-primary_white',
      'bg-primary_orange_deep',
      'bg-primary_gray',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);
  useEffect(() => {
    const leadingImages = [
      images.leading_enemi,
      images.leading_enemi_1,
      images.leading_enemi_2,
      images.leading_enemi_3,
      images.leading_enemi_4,
      images.leading_enemi_5,
      images.leading_enemi_6,
    ];
    const randomImage =
      leadingImages[Math.floor(Math.random() * leadingImages.length)];
    setLeadingImages(randomImage);
  }, []);

  const [navbar, setNavbar] = useState<boolean>(false);
  const { currentUser, login } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  useScrollLock(isOpen);

  const toggleNavDropdown = () => {
    //  setMobileHide(true);
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
            <WalletImg />
            <span>Connect Wallet</span>
          </>
        </WalletButton>
      )}
    </>
  );
  if (typeof window !== "undefined") {
    if (window.location.pathname == '/') {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
  }

  return (
    <section
      className={`${bgColor} min-h-screen flex flex-col justify-between`}>
      {pathname === "/" && (
        <div>
          <Logo bgColor={bgColor} />
        </div>
      )}
      <div className="max-w-screen-xl mx-auto flex-grow relative">
        <div className="text-center flex justify-center items-center mt-36">
          <Section>
             {/* <DesktopNavRoutes />  */}
            {mobileSearchHiddenNavItems}
          </Section>
          <Dropdownnew isOpen={isOpen} closeNavDropdown={closeNavDropdown} />
          <GradientBackground isOpen={isOpen} onClick={closeNavDropdown} />
        </div>
        <div className="flex justify-center items-end w-48 sm:w-64 md:w-80 lg:w-96">
          <Image
            className="absolute bottom-2"
            src={leadingImages ?? ''}
            alt="leading-enemy"
            height={900}
            width={900}
          />
        </div>
      </div>
    </section>
  );
};

export default MarketPlace;
