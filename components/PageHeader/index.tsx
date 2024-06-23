import { useState, useRef, memo, useEffect } from 'react';
import { Imagea } from '../../styles/index.styled';
import { addPrecisionDecimal } from '../../utils';
import { MenuIcon } from '../../icons/menu-icon';
import { motion } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import Attributes from '../../pages/container/the-den/attributes';
import LeaderBoardTable from '../../pages/container/the-den/leaderboard-table';
import LeaderBoardTablenew from '../../pages/container/the-den/leaderboard-table copy';
import Overview from '../../pages/container/the-den/overview';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import OverviewSidebar from '../../pages/container/the-den/overview-sidebar';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import PageLayout from '../../components/PageLayout';
import Grid from '../../components/Grid';
import PaginationButton from '../../components/PaginationButton';
import ErrorComponent from '../../components/Error';
import LoadingPage from '../../components/LoadingPage';
import EmptySectionContent from '../../components/EmptySectionContent';
import { SortTab } from '../../components/SortTab/SortTab';
import SalesHistoryTable from '../../components/SalesHistoryTable_collection';
import { Dispatch, SetStateAction, ReactNode, FC } from 'react';
import { Asset } from '../../services/assets';
import { SaleAsset } from '../../services/sales';
import TemplateSearch from '../TemplateSearch';
import Link from 'next/link';
import { DesktopNavLink, DesktopOnlySection } from '../NavBar/NavBar.styled';
import {
  leaderBoardSelect,
  leaderBoardTable,
  theDenTopContent,
} from '../../json/the-den';
import { leader } from '../../json/leader';
import User from '../../pages/user/[chainAccount]';

import {
  Template,
  getTemplatesByCollection,
  formatTemplatesWithPriceData,
  getLowestPricesForAllCollectionTemplates,
  getAllTemplatesByCollection,
  getSaleTemplatesByCollection,
} from '../../services/templates';
import {
  getCollection,
  Collection,
  CollectionStats,
  emptyCollection,
} from '../../services/collections';
import {
  Button,
  Divider,
  Modal,
  ModalContent,
  Select,
  SelectItem,
  Tab,
  Tabs,
  button,
} from '@nextui-org/react';
import { ClearBtn } from '../../components/FilterTab/FilterTab.styled';
import {
  PAGINATION_LIMIT,
  RouterQuery,
  CARD_RENDER_TYPES,
  TAB_TYPES,
} from '../../utils/constants';

import {
  // ClearBtn,
  ClearScroll,
  ClearWrap,
  TraitBtn,
} from '../../components/FilterTab/FilterTab.styled';

import { FilterTab } from '../../components/FilterTab/FilterTab';
import Banner from '../../components/Banner';

import {
  MODAL_TYPES,
  useAuthContext,
  useModalContext,
  useBlacklistContext,
} from '../../components/Provider';
import { useNavigatorUserAgent, usePrevious } from '../../hooks';
import Spinner from '../../components/Spinner';
import SelectGrid from '../../components/SelectGrid';
type Props = {
  children: ReactNode;
  image?: string;
  video?: string;
  model?: string;
  stage?: string;
  skybox?: string;
  templateId: string;
  templateName: string;
  collectionDisplayName?: string;
  collectionName: string;
  collectionAuthor: string;
  collectionImage: string;
  error?: string;
  currentAsset?: Partial<SaleAsset> & Partial<Asset>;
  assetIds?: string[];
  saleIds?: string[];
  activeTab: string;
  isRefetchingAssets?: boolean;
  createdAtTime: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setCurrentAssetAsModalProps?: () => void;
};
interface AuthContext {
  currentUser: string;
  currentUserBalance: string;
  currentUserXprBalance: string;
  atomicMarketBalance: string;
  authError: string;
  isLoadingUser: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateCurrentUserBalance: (chainAccount: string) => Promise<void>;
  updateAtomicBalance: (chainAccount: string) => Promise<void>;
}
import TopContent from '../../pages/container/the-den/top-content';
import {
  PageHeaderContainer,
  ImageContainer,
  RoundButton,
  Name,
  SubName,
  ButtonContainer,
  VerifiedIconContainer,
  PageHeaderAvatarContainer,
  StatsWrap,
  StatsBox,
  GreyText,
  Price,
  RatingBox,
  ColBox,
  RightBox,
  BoxWrap,
  Section,
} from './PageHeader.styled';
import MoreIcon from '../../public/more.svg';
import VerifiedIcon from '../../public/icon-light-verified-24-px.svg';
import ShareOnSocial from '../ShareOnSocial';
import { useClickAway } from '../../hooks';
import { IPFS_RESOLVER_IMAGE, RESIZER_IMAGE_SM } from '../../utils/constants';
import ReadMoreDescription from '../ReadMoreDescription';
import ReportIcon from '../../public/report.svg';
import { REPORT_TYPE } from '../../utils/constants';
import {
  TabSectionUserProfileCreations,
  TabSectionUserProfileItems,
} from 'components/TabSection';

type PageHeaderProps = {
  image?: string;
  description?: string;
  name?: string;
  subName?: string;
  type: 'user' | 'collection';
  author?: string;
  hasEditFunctionality?: boolean;
  isLightKYCVerified?: boolean;
  url?: string;
  collectionName: string;
  setRenderTemplates: any;
  setLoading: any;
  setOrigin: any;
  stats?: {
    volume: string;
    total: string;
    last: string;
    floor: string;
    owners: string;
    avg: number;
    listedCnt: number;
  };
  profilestats?: {
    name: string;
    numNFTs: number;
  };
};

const PageHeader = ({
  image,
  subName,
  type,

  hasEditFunctionality,
  isLightKYCVerified,
  setRenderTemplates,
  setOrigin,
  collectionName,
  stats,
  profilestats,
}: PageHeaderProps): JSX.Element => {
  const { openModal } = useModalContext();
  const [shareActive, setShareActive] = useState<boolean>(false);
  const shareRef = useRef(null);
  useClickAway(shareRef, () => setShareActive(false));
  // const actor = currentUser ? currentUser.actor : '';
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [savedPath, setSavedPath] = useState('');
  // const [isFixed, setIsFixed] = useState(false);
  // const [selectednew, setSelectednew] = useLocalStorage(
  //   'tabs',
  //   savedPath ?? '',
  // );
  //  const [isFixed, setIsFixed] = useState(false);
  const [menubar, setMenubar] = useState<boolean>(false);

  useEffect(() => {
    setSavedPath(pathname + '?' + searchParams);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Adjust this value as needed
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = currentScrollPos > 124;

      setIsFixed(visible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const avatarImg = image
    ? `data:image/jpeg;base64,${image}`
    : '/default-avatar.png';
  const collectionImg = image
    ? `${RESIZER_IMAGE_SM}${IPFS_RESOLVER_IMAGE}${image}`
    : '/proton.svg';

  const displayImg = type === 'user' ? avatarImg : collectionImg;

  // const canReport =
  //   actor && (type === 'user' ? actor !== subName : actor !== author);

  const onImageError = (e) => {
    e.currentTarget.onerror = null;
    if (type === 'user' && image) {
      e.currentTarget.src = `${IPFS_RESOLVER_IMAGE}${image}`;
    }
  };

  const shareButton = (
    <RoundButton
      size="40px"
      ref={shareRef}
      onClick={() => setShareActive(!shareActive)}>
      {/* <MoreIcon /> */}
      <ShareOnSocial top="50px" active={shareActive} />
    </RoundButton>
  );

  const reportButton = (
    <RoundButton
      size="40px"
      margin="0 0 0 8px"
      onClick={() => {
        setModalProps({
          type: type === 'user' ? REPORT_TYPE.CREATOR : REPORT_TYPE.COLLECTION,
        });
        openModal(MODAL_TYPES.REPORT);
      }}>
      {/* <ReportIcon /> */}
    </RoundButton>
  );

  const buttons = hasEditFunctionality ? (
    <ButtonContainer>
      {shareButton}
      {/* {canReport ? reportButton : null} */}
      <RoundButton
        onClick={() => openModal(MODAL_TYPES.UPDATE_COLLECTION)}
        padding="8px 16px"
        margin="0 0 0 8px">
        Edit collection
      </RoundButton>
    </ButtonContainer>
  ) : (
    <ButtonContainer>
      {shareButton}
      {/* {canReport ? reportButton : null} */}
    </ButtonContainer>
  );

  const theDenTopContent: { name: string; value: string | number }[] = [
    {
      name: 'Listed',
      value: stats ? `${stats.listedCnt} / ${stats.total}` : '',
    },
    {
      name: 'Floor',
      value: stats
        ? `${addPrecisionDecimal(
            stats.floor.substring(0, stats.floor.length - 4),
            0,
            false,
          )} XPR`
        : '',
    },
    {
      name: 'Owners',
      value: stats ? stats.owners : '',
    },
  ];
  //overview page

  const router = useRouter();
  const { isLoadingUser, currentUser } = useAuthContext();
  const { setModalProps } = useModalContext();
  const { isDesktop } = useNavigatorUserAgent();
  const { collectionsBlacklist, isLoadingBlacklist } = useBlacklistContext();
  const { collection: caseSensitiveCollection } = router.query as RouterQuery;
  const [collectionStats, setStats] = useState();
  const [profileStats, setProfile] = useState();
  const collection = caseSensitiveCollection
    ? caseSensitiveCollection.toLowerCase()
    : '';
  const previousCollection = usePrevious(collection);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lowestPrices, setLowestPrices] = useState<{ [id: string]: string }>(
    {},
  );
  const [renderedTemplates, setRenderedTemplates] = useState<Template[]>([]);
  const [prefetchedTemplates, setPrefetchedTemplates] = useState<Template[]>(
    [],
  );
  const [hideFilter, setFilterHide] = useState(true);
  const [hideBulk, setBulkHide] = useState(true);
  const [sortValue, setSort] = useState('lowtohigh');
  const [originSaleTemplates, setSaleTemplates] = useState<Template[]>([]);
  const [originTemplates, setOriginTemplates] = useState<Template[]>([]);
  const [gridLoading, setLoading] = useState(false);
  const [active, setActive] = useState([]);
  const [filterKeys, setKeys] = useState([]);
  const [filterValues, setValues] = useState({});
  const [minValue, minChange] = useState();
  const [maxValue, maxChange] = useState();
  const [selectedValues, setSelected] = useState([]);
  const [selectedCards, setCard] = useState([]);
  const [isFixed, setIsFixed] = useState(false);

  const isBuy = false;

  const exceptList = [
    'image',
    'audio',
    'name',
    'glbthumb',
    'series',
    'video',
    'model',
    'marketplace',
    'desc',
    'categorie',
  ];

  const [prefetchPageNumber, setPrefetchPageNumber] = useState<number>(2);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [collectionData, setCollectionData] =
    useState<Collection>(emptyCollection);
  const isEditButtonVisible =
    isDesktop &&
    currentUser &&
    collectionData &&
    currentUser.actor === collectionData.author;

  const prefetchNextPage = async () => {
    const prefetchedResult = await getTemplatesByCollection({
      type: collection,
      page: prefetchPageNumber,
    });

    setPrefetchedTemplates(prefetchedResult as Template[]);

    if (!prefetchedResult.length) {
      setPrefetchPageNumber(-1);
    } else {
      setPrefetchPageNumber(prefetchPageNumber + 1);
    }

    setIsLoadingNextPage(false);
  };

  const selectValue = (value, key) => {
    setLoading(true);

    const renderTem = renderedTemplates;
    const newArr = selectedValues;
    const dupLength = newArr.filter((obj) => obj[key] == value).length;
    const dupIndex = newArr.findIndex((obj) => obj[key] == value);

    if (newArr.length == 0) {
      const newObj = {};
      newObj[key] = value;
      newArr.push(newObj);
      setRenderedTemplates([
        ...originSaleTemplates.filter(
          (it) => it['immutable_data'][key] == value,
        ),
      ]);
      setSelected(newArr);
    } else {
      if (dupLength == 0) {
        const newObj = {};
        newObj[key] = value;
        newArr.push(newObj);
        setRenderedTemplates([
          ...renderTem,
          ...originSaleTemplates.filter(
            (it) => it['immutable_data'][key] == value,
          ),
        ]);
        setSelected(newArr);
      } else {
        let delArr = [];
        newArr.splice(dupIndex, 1);
        if (newArr.length == 0) {
          delArr = [...originSaleTemplates];
        } else {
          newArr.map((item) => {
            const index = filterKeys.findIndex((key) => item[key]);
            delArr = [
              ...delArr,
              ...originSaleTemplates.filter(
                (it) =>
                  it['immutable_data'][filterKeys[index]] ==
                  item[filterKeys[index]],
              ),
            ];
          });
        }
        setRenderedTemplates([...delArr]);
        setSelected(newArr);
      }
    }

    setLoading(false);
  };

  const showNextPage = async () => {
    const allFetchedTemplates = formatTemplatesWithPriceData(
      renderedTemplates.concat(prefetchedTemplates),
      lowestPrices,
    );
    setRenderedTemplates(allFetchedTemplates);
    setIsLoadingNextPage(true);
    await prefetchNextPage();
  };
  const fetchAllTemplates = async () => {
    const allTemplates = await getAllTemplatesByCollection({
      type: collection,
    });
    const lowestPricesResult = await getLowestPricesForAllCollectionTemplates({
      type: collection,
    });
    const allTemplatesWithLowestPrice = await formatTemplatesWithPriceData(
      allTemplates,
      lowestPricesResult,
    );
    if (
      lowestPricesResult != null &&
      typeof lowestPricesResult == 'object' &&
      !Object.keys(lowestPricesResult).length
    ) {
      //      await setBuy(false);
    }
    await setLowestPrices(lowestPricesResult);
    await setOriginTemplates(allTemplatesWithLowestPrice);
    await setRenderedTemplates(allTemplatesWithLowestPrice);
  };

  const filterBuy = async (status) => {
    await setLoading(true);
    //    await setBuy(status);
    if (status) {
      await setRenderedTemplates(originSaleTemplates);
    } else {
      if (originTemplates.length == 0) {
        await fetchAllTemplates();
      } else {
        await setRenderedTemplates(originTemplates);
      }
    }
    await setLoading(false);
  };
  const priceApply = async () => {
    await setLoading(true);
    //    await setBuy(true);
    const saleTemplates = await getSaleTemplatesByCollection({
      type: collection,
      minValue,
      maxValue,
    });
    await setRenderedTemplates(saleTemplates);
    await setLoading(false);
  };

  const fetchCollection = async () => {
    try {
      setIsLoading(true);
      setRenderedTemplates([]);
      setOriginTemplates([]);
      setSaleTemplates([]);
      await fetchFilterData();

      // const collectionResult = await getCollection(collection);
      // setCollectionData(collectionResult);

      const templates = await getTemplatesByCollection({
        type: collection,
      });

      if (templates.length !== 0) {
        setSaleTemplates(templates);
        setRenderedTemplates(templates);
      } else {
        const newArr = templates.sort((a, b) => {
          return parseInt(a['listing_price']) - parseInt(b['listing_price']);
        });
        console.log(newArr);
        setSaleTemplates([...newArr]);
        setRenderedTemplates([...newArr]);
        // await setBuy(true);
      }

      const statsData = await CollectionStats(collection);
      await setStats(statsData);
      setIsLoading(false);
      await prefetchNextPage();
    } catch (e) {
      setIsLoading(false);
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    (async () => {
      if (
        collection &&
        !isLoadingBlacklist &&
        (!renderedTemplates.length || collection !== previousCollection)
      ) {
        if (collectionsBlacklist && collectionsBlacklist[collection]) {
          router.push('/');
        } else {
          fetchCollection();
        }
      }
    })();
  }, [collection, isLoadingBlacklist]);

  useEffect(() => {
    if (collectionData) {
      const {
        name,
        collection_name,
        img,
        market_fee,
        data: { description, url },
      } = collectionData;

      setModalProps({
        collectionName: collection_name,
        defaultDescription: description,
        defaultDisplayName: name,
        defaultImage: img,
        defaultRoyalties: market_fee.toString(),
        fetchPageData: fetchCollection,
        defaultUrl: url,
      });
    }
  }, [collectionData]);

  const fetchFilterData = async () => {
    const templates = await getTemplatesByCollection({
      type: collection,
    });
    const newKeys = [];
    const newObj = {};
    const newActive = [];
    await templates.map((it) =>
      Object.keys(it['immutable_data']).map((itm) => {
        if (exceptList.indexOf(itm) <= -1) {
          if (newKeys.indexOf(itm) <= -1) {
            newKeys.push(itm);
          }
          if (newObj[itm] == undefined || newObj == null) {
            newObj[itm] = [];
            newObj[itm].push(it['immutable_data'][itm]);
          } else {
            if (newObj[itm].indexOf(it['immutable_data'][itm]) <= -1) {
              newObj[itm].push(it['immutable_data'][itm]);
            }
          }
        }
      }),
    );
    await newKeys.map(() => newActive.push(false));
    await setActive(newActive);
    await setKeys(newKeys);
    await setValues(newObj);
  };

  const getContent = () => {
    if (isLoading || isLoadingUser) {
      return <LoadingPage />;
    }

    if (errorMessage) {
      return (
        <ErrorComponent
          errorMessage={errorMessage}
          buttonText="Try again"
          buttonOnClick={() => router.reload()}
        />
      );
    }
  };

  const {
    name,
    collection_name,
    img,
    author,
    data: { description, url },
  } = collectionData;

  const [selected, setSelectedi] = useLocalStorage('tabs', savedPath ?? '');
  const [selectednew, setSelectedinew] = useLocalStorage(
    'tabs',
    savedPath ?? '',
  );

  const transformedData = leaderBoardTable.map((item) => ({
    collection: item.value,
  }));

  const DesktopNavRoutes = () => {
    const { currentUser } = useAuthContext();
    const router = useRouter();
    const [alertShown, setAlertShown] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    useEffect(() => {
      // Listen to route changes to determine the active tab
      const handleRouteChange = (url) => {
        const tab = url.includes('/the-den?tab=collection')
          ? 'collection'
          : null;
        setActiveTab(tab);
      };

      // Set initial active tab when component mounts
      handleRouteChange(router.asPath);

      // Cleanup function
      return () => {
        router.events.off('routeChangeStart', handleRouteChange);
      };
    }, []);

    if (currentUser) {
      //     alert('Connect wallet');
      const path = `/user/${currentUser ? currentUser.actor : ''}`;
      // Navigate to the constructed path
      router.push(path);
    }
    if (!currentUser) {
      <h1>this is headin g</h1>;
    }
  };

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 40;

  return (
    <section>
      <section>
        <Divider />
        <div className="grid grid-cols-3 place-content-center max-w-[44rem] mx-auto">
          {theDenTopContent.map(({ name, value }, index) => (
            <div
              key={index}
              className="flex justify-center items-center w-full">
              {index > 0 && index < theDenTopContent.length - 1 && (
                <Divider
                  className="w-0.5 h-16 bg-dark my-auto"
                  orientation="vertical"
                />
              )}
              <TopContent name={name} value={value} />
              {index > 0 && index < theDenTopContent.length - 1 && (
                <Divider
                  className="w-0.5 h-16 bg-dark my-auto"
                  orientation="vertical"
                />
              )}
            </div>
          ))}
        </div>
        <Divider />
      </section>

      {/* <section className="max-w-screen-2xl mx-auto md:w-full my-10"> */}
      {/* <section className="w-full mx-auto relative"> */}
      <Modal
        isOpen={!hideFilter}
        className=" flex xs:w-5/6 sm:w-3/6 h-screen -mt-8 xs:ml-12 sm:ml-80 overflow-y-scroll z-50 "
        onClose={() => setFilterHide(true)}>
        <ModalContent>
          <div className="xs:mx-9 sm:mx-12 my-20 ">
            <FilterTab
              filterValues={filterValues}
              filterKeys={filterKeys}
              selectValue={selectValue}
              selectedValues={selectedValues}
              active={active}
              setActive={setActive}
              isBuy={isBuy}
              setBuy={filterBuy}
              saleLength={originSaleTemplates.length}
              minValue={minValue}
              minChange={minChange}
              maxValue={maxValue}
              maxChange={maxChange}
              priceApply={priceApply}
              setFilterHide={setFilterHide}
              isDesktop={false}
            />
            {selectedValues.length < 1 ? (
                <div className="h-5" />
              ) : (
                <ClearScroll>
                  <ClearWrap>
                    {selectedValues.length > 0 && (
                      <ClearBtn
                        onClick={() => {
                          setSelected([]);
                          setRenderedTemplates(originSaleTemplates);
                        }}>
                        <span>Clear All</span>
                      </ClearBtn>
                    )}
                    {selectedValues.map((it) =>
                      Object.keys(it).map((key) => (
                        <TraitBtn onClick={() => selectValue(it[key], key)}>
                          {key} : {it[key]}
                        </TraitBtn>
                      )),
                    )}
                  </ClearWrap>
                </ClearScroll>
              )}
          </div>
        </ModalContent>
      </Modal>

      <Tabs
        selectedKey={selected ?? 'leaderboard'}
        onSelectionChange={(key) => setSelectedi(key as string)}
        aria-label="Options"
        variant="light"
        color="secondary"
        size="lg"
        className={` flex  justify-center lg:justify-normal transition-all ease-in-out border py-5 ${
          isFixed ? '  flex  ' : ' '
        }`}>
        <Tab key={'/the-den?tab=leaderboard'} title="Leaderboard">
          <div className=" my-14">
            <LeaderBoardTablenew />
          </div>
        </Tab>

        <Tab key={'/the-den?tab=all'} title="Overview">
          {/* <div className={` flex justify-end mt-[-40px]   ${isFixed ? '     ' : '  '}`}>
          <div> */}

          {/* </div>  */}
          {/* <div className="  flex">
            <div
              className={`lg:w-1/6 xll:block hidden   ${isFixed ? ' fixed ' : ' '} `}> */}
          <div className="flex    ">
            <div className=" lg:w-1/4 lg:block hidden mt-16  ">
              <div className="h-screen overflow-y-scroll overflow-x-hidden   ${isScrolled ? ' fixed -mt-24' : ''}`} ">
              <FilterTab
                filterValues={filterValues}
                filterKeys={filterKeys}
                selectValue={selectValue}
                selectedValues={selectedValues}
                active={active}
                setActive={setActive}
                isBuy={isBuy}
                setBuy={filterBuy}
                saleLength={originSaleTemplates.length}
                minValue={minValue}
                minChange={minChange}
                maxValue={maxValue}
                maxChange={maxChange}
                priceApply={priceApply}
                setFilterHide={setFilterHide}
                isDesktop={isDesktop}
              />

              {selectedValues.length < 1 ? (
                <div className="h-5" />
              ) : (
                <ClearScroll>
                  <ClearWrap>
                    {selectedValues.length > 0 && (
                      <ClearBtn
                        onClick={() => {
                          setSelected([]);
                          setRenderedTemplates(originSaleTemplates);
                        }}>
                        <span>Clear All</span>
                      </ClearBtn>
                    )}
                    {selectedValues.map((it) =>
                      Object.keys(it).map((key) => (
                        <TraitBtn onClick={() => selectValue(it[key], key)}>
                          {key} : {it[key]}
                        </TraitBtn>
                      )),
                    )}
                  </ClearWrap>
                </ClearScroll>
              )}
              </div>
            </div>
            {/* </div> */}

            {/* <div className={` flex w-full ${isFixed ? '   ' : ' '} `}> */}
            <div className={`   ${isFixed ? '   ' : ' '} `}>
              <Tabs
                selectedKey={selectednew ?? 'all'}
                onSelectionChange={(key) => {
                  setSelectedinew(key as string);
                  setFilterHide(key == '/the-den?tab=collection');
                }}
                aria-label="Options"
                variant="light"
                color="secondary"
                className={` flex  justify-normal transition-all ease-in-out border  ${
                  isFixed
                    ? ' bg-[#fffdf7] fixed lg: top-20  z-40  py-2    xs:w-full  lg:pb-6 xs:pb-6  lg:w-full  '
                    : '     '
                }`}
                // className={` flex xs:justify-center   ${isFixed ? '   ' : ' lg:justify-normal '} `}
              >
                <Tab key={'/the-den?tab=all'} title="All">
                  <div className="lg:flex justify-end lg:-mt-12 xs:-mt-10   ${isFixed ? '  xs:flex  ' : '  '}  ">
                    <div
                      className={` ${
                        isFixed
                          ? 'fixed top-20  xs:py-8 lg:px-0  z-40  pb-5 lg:-mt-3 xs:-mt-6    '
                          : ' xs:relative  '
                      }`}>
                      <SortTab
                        setFilterHide={() => setFilterHide(!hideFilter)}
                        setBulkHide={() => setBulkHide(!hideBulk)}
                        hideFilter={hideFilter}
                        hideBulk={hideBulk}
                        sortValue={sortValue}
                        setSort={setSort}
                        isSort={0 < originSaleTemplates.length && isBuy}
                        setRenderTemplates={(value) => {
                          setRenderedTemplates(
                            originSaleTemplates
                              .filter(
                                (it) =>
                                  it['name']
                                    .toLowerCase()
                                    .indexOf(value.toLowerCase()) > -1,
                              )
                              .reverse(),
                          );
                        }}
                        setLoading={setLoading}
                        setOrigin={() => {
                          setRenderedTemplates(originSaleTemplates);
                        }}
                        onRefresh={fetchFilterData}
                      />
                    </div>
                    <div
                      className={` lg:hidden   ${isFixed ? '  fixed  top-20  z-40 py-7 -px-12 pb-5 -mt-4 -mr-6 ' : 'xs:relative xs:-mr-6 '}`}
                      onClick={() => setFilterHide(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className={` w-full ${isFixed ? '   ' : ' '}`}>
                    {renderedTemplates.length ? (
                      <>
                        <Grid
                          items={renderedTemplates}
                          type={CARD_RENDER_TYPES.TEMPLATE}
                        />
                        <PaginationButton
                          onClick={showNextPage}
                          isHidden={renderedTemplates.length < PAGINATION_LIMIT}
                          isLoading={isLoadingNextPage}
                          disabled={prefetchPageNumber === -1}
                          autoLoad
                        />
                      </>
                    ) : (
                      <EmptySectionContent
                        subtitle="No templates were found for this collection type."
                        hasTopBorder
                      />
                    )}
                  </div>
                </Tab>
                {currentUser && (
                  <Tab key={'/the-den?tab=collection'} title="My Collection">
                    <MyCollection chainAccount={currentUser.acc} />
                  </Tab>
                )}
              </Tabs>
            </div>
          </div>
          {/* </div> */}
          {/* </div> */}
        </Tab>
      </Tabs>
    </section>
  );
};

export default memo(PageHeader);

const MyCollection = ({ chainAccount }) => {
  const [activeTab, setActiveTab] = useState<string>(TAB_TYPES.ITEMS);

  const tabs = [{ title: '', type: TAB_TYPES.ITEMS }];

  const tabsProps = {
    tabs,
    activeTab,
    setActiveTab,
  };

  return (
    <>
      <TabSectionUserProfileItems chainAccount={chainAccount} {...tabsProps} />
    </>
  );
};
