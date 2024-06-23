import { useState, useEffect } from 'react';
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
  Select,
  SelectItem,
  Tab,
  Tabs,
} from '@nextui-org/react';
import {
  PAGINATION_LIMIT,
  RouterQuery,
  CARD_RENDER_TYPES,
} from '../../utils/constants';
import {
  ClearBtn,
  ClearScroll,
  ClearWrap,
  TraitBtn,
} from '../../components/FilterTab/FilterTab.styled';
import { FilterTab } from '../../components/FilterTab/FilterTab';
import Banner from '../../components/Banner';
import PageHeader from '../../components/PageHeader';
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

const CollectionPage: FC<Props> = ({
  templateId,
  error,
  activeTab,
  currentAsset,
}): JSX.Element => {
  const router = useRouter();
  const { isLoadingUser, currentUser } = useAuthContext();
  const { setModalProps } = useModalContext();
  const { isDesktop } = useNavigatorUserAgent();
  const { collectionsBlacklist, isLoadingBlacklist } = useBlacklistContext();
  const { collection: caseSensitiveCollection } = router.query as RouterQuery;
  const [collectionStats, setStats] = useState();
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
  const [isBuy, setBuy] = useState(true);
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
    if (isBuy) {
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
    } else {
      const renderTem = renderedTemplates;
      const newArr = selectedValues;
      const dupLength = newArr.filter((obj) => obj[key] == value).length;
      const dupIndex = newArr.findIndex((obj) => obj[key] == value);

      if (newArr.length == 0) {
        const newObj = {};
        newObj[key] = value;
        newArr.push(newObj);
        setRenderedTemplates([
          ...originTemplates.filter((it) => it['immutable_data'][key] == value),
        ]);
      } else {
        if (dupLength == 0) {
          const newObj = {};
          newObj[key] = value;
          newArr.push(newObj);
          setRenderedTemplates([
            ...renderTem,
            ...originTemplates.filter(
              (it) => it['immutable_data'][key] == value,
            ),
          ]);
          setSelected(newArr);
        } else {
          let delArr = [];
          newArr.splice(dupIndex, 1);
          if (newArr.length == 0) {
            delArr = [...originTemplates];
          } else {
            newArr.map((item) => {
              const index = filterKeys.findIndex((key) => item[key]);
              delArr = [
                ...delArr,
                ...originTemplates.filter(
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
      await setBuy(false);
    }
    await setLowestPrices(lowestPricesResult);
    await setOriginTemplates(allTemplatesWithLowestPrice);
    await setRenderedTemplates(allTemplatesWithLowestPrice);
  };

  const filterBuy = async (status) => {
    await setLoading(true);
    await setBuy(status);
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
    await setBuy(true);
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
      // const lowestPricesResult = await getLowestPricesForAllCollectionTemplates(
      //   {
      //     type: collection,
      //   }
      // );
      // setLowestPrices(lowestPricesResult);
      // const templatesWithLowestPrice = formatTemplatesWithPriceData(
      //   templates,
      //   lowestPricesResult
      // );

      if (templates.length !== 0) {
        setRenderedTemplates(templates);
      } else {
        const newArr = templates.sort((a, b) => {
          return parseInt(a['listing_price']) - parseInt(b['listing_price']);
        });
        // await setSaleTemplates([...newArr]);
        await setRenderedTemplates([...newArr]);
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

    const {
      name,
      collection_name,
      img,
      author,
      data: { description, url },
    } = collectionData;

    return (
      <>
        <PageHeader
          image={img}
          name={name || collection}
          description={description}
          type="collection"
          hasEditFunctionality={isEditButtonVisible}
          author={author}
          url={url}
          collectionName={collection_name}
          stats={collectionStats} setRenderTemplates={undefined} setLoading={undefined} setOrigin={undefined} />
        {/* <SalesHistoryTable
          activeTab={activeTab}
          error={error}
          asset={currentAsset}
          collectionName={collection_name}
        /> */}
        <Tab key={'/the-den?tab=overview'} title="Overview">
          <div className="flex lg:flex-nowrap flex-wrap gap-4 my-14">
            <div
              className={`lg:block hidden ${isFixed
                ? 'fixed xl:w-60 lg:w-52 top-[210px] w-full pt-3 bg-[#fffdf7] min-h-screen z-30'
                : ''
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
                  if (isBuy) {
                    setRenderedTemplates(
                      originSaleTemplates
                        .filter(
                          (it) =>
                            -1 <
                            it['data']['name'].toLowerCase().indexOf(value),
                        )
                        .reverse(),
                    );
                  } else {
                    setRenderedTemplates(
                      originTemplates
                        .filter(
                          (it) =>
                            -1 <
                            it['immutable_data']['name']
                              .toLowerCase()
                              .indexOf(value),
                        )
                        .reverse(),
                    );
                  }
                }}
                setLoading={setLoading}
                setOrigin={() => {
                  if (isBuy) {
                    setRenderedTemplates(originSaleTemplates);
                  } else {
                    setRenderedTemplates(originTemplates);
                  }
                }}
                onRefresh={fetchFilterData}
              />

              <div
                style={{
                  display: 'flex',
                  minHeight: '800px',
                  paddingBottom: '100px',
                  flexDirection: 'column',
                }}>
                {hideFilter ? null : (
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
                )}
                {selectedValues.length < 1 ? (
                  <div style={{ height: '20px' }} />
                ) : (
                  <ClearScroll>
                    <ClearWrap>
                      {0 < selectedValues.length ? (
                        <ClearBtn
                          onClick={() => {
                            setSelected([]);
                            if (isBuy) {
                              setRenderedTemplates(originSaleTemplates);
                            } else {
                              setRenderedTemplates(originTemplates);
                            }
                          }}>
                          <span>Clear All</span>
                        </ClearBtn>
                      ) : null}
                      {selectedValues.map((it) =>
                        Object.keys(it).map((key) => (
                          // eslint-disable-next-line react/jsx-key
                          <TraitBtn onClick={() => selectValue(it[key], key)}>
                            {key} : {it[key]}
                          </TraitBtn>
                        )),
                      )}
                    </ClearWrap>
                  </ClearScroll>
                )}

                <div style={{ width: '100%' }}>
                  {gridLoading ? (
                    <div style={{ paddingTop: '100px' }}>
                      <Spinner size={50} />
                    </div>
                  ) : 0 < originSaleTemplates.length ? (
                    <SelectGrid
                      items={renderedTemplates}
                      isFilter={!hideFilter}
                      selectedCards={selectedCards}
                      setCard={setCard}
                      isBulk={0 < selectedCards.length && !hideBulk}
                      setBulkHide={setBulkHide}
                    />
                  ) : null}
                </div>
                {/* {0 < selectedCards.length && !hideBulk ? 
             <div style={{ marginTop: '50px' }}>
             <BulkTab selectedCards={selectedCards} setCard={setCard} totalPrice={totalPrice} bulkBuy={bulkBuy} />
              </div> : null} */}
              </div>
            </div>

            <div className=" block">
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
          </div>
        </Tab>
      </>
    );
  };

  return (
    <PageLayout title="Collection">
      <Banner modalType={MODAL_TYPES.CLAIM} />
      {getContent()}
    </PageLayout>
  );
};

export default CollectionPage;
