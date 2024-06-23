import { ChangeEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  InputContainer,
  Input,
  MagnifyingIconButton,
  ClearTextButton,
} from './TemplateSearch.styled';
import { SearchCollection, SearchAuthor } from '../../services/search';
import { Template } from '../../services/templates';
// import {  as MagnifyingIcon } from '../../public/new/search-normal.svg';
// import { ReactComponent as CloseIcon } from '../../public/icon-light-close-16-px.svg';
import { useClickAway } from '../../hooks';

type Props = {
  isMobileSearchOpen: boolean;
  closeMobileSearch: () => void;
  placeholder: string;
  setRenderTemplates: any;
  setLoading: any;
  setOrigin: any;
};

type SearchResponse = {
  index: string;
  keys: string[];
  result: (SearchCollection | SearchAuthor | Template)[];
};

let debounceTimer;

const TemplateSearch = ({
  isMobileSearchOpen,
  closeMobileSearch,
  placeholder,
  setRenderTemplates,
  setLoading,
  setOrigin,
}: Props): JSX.Element => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>();
  const clearTextButtonRef = useRef<HTMLButtonElement>();
  const resultsListRef = useRef<HTMLDivElement>();
  const [input, setInput] = useState<string>('');
  const [isSearchInputActive, setIsSearchInputActive] = useState<boolean>(
    false
  );
  const [searchCollections, setSearchCollections] = useState<
    SearchCollection[]
  >([]);
  const [searchTemplates, setSearchTemplates] = useState<Template[]>([]);
  const [searchAuthors, setSearchAuthors] = useState<SearchAuthor[]>([]);

  useClickAway(resultsListRef, () => {
    setInput('');
    setIsSearchInputActive(false);
    closeMobileSearch();
  });

  useEffect(() => {
    (async () => {
      if (isSearchInputActive && input) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          getSearchResults();
        }, 300);
      } else if (!input) {
        clearSearchResults();
      }
    })();

    return () => clearTimeout(debounceTimer);
  }, [input, isSearchInputActive]);

  const clearSearchResults = () => {
    setSearchCollections([]);
    setSearchAuthors([]);
    setSearchTemplates([]);
  };

  const getSearchResults = async (): Promise<void> => {
    try {
      await setLoading(true);
      await setRenderTemplates(input);
      await setLoading(false);
    } catch (e) {
      setLoading(false);
      clearSearchResults();
    }
  };

  const updateText = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setInput(e.target.value);
      setOrigin();
    } else {
      setInput(e.target.value);
    }
  };

  const clearText = () => {
    if (input) {
      setOrigin();
      setInput('');
    } else {
      closeMobileSearch();
    }
  };

  const handleClearTextButtonKeyDown = (e: KeyboardEvent) => {
    const isDownArrow = e.key === 'ArrowDown';
    const isTab = e.key === 'Tab' && !e.shiftKey;
    if (resultsListRef.current && (isDownArrow || isTab)) {
      e.preventDefault();
      const firstResultItem = resultsListRef.current
        .childNodes[1] as HTMLElement;
      firstResultItem.focus();
    }
    1;
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
    if (!input) return;

    const isDownArrow = e.key === 'ArrowDown';
    const hasResults =
      searchCollections.length ||
      searchTemplates.length ||
      searchAuthors.length;

    if (isDownArrow && hasResults) {
      e.preventDefault();
      const firstResultItem = resultsListRef.current
        .childNodes[1] as HTMLElement;
      firstResultItem.focus();
      return;
    }

    const isTab = e.key === 'Tab' && !e.shiftKey;
    if (isTab) {
      e.preventDefault();
      clearTextButtonRef.current.focus();
    }
  };

  return (
    <div>
      <InputContainer
       
        isMobileSearchOpen={isMobileSearchOpen}
        isSearchInputActive={isSearchInputActive}>
        {/* <MagnifyingIconButton onClick={() => { }}>
         
        </MagnifyingIconButton> */}
        <div >
        <img
          src="/new/search.png" // Replace with your image URL
          alt="icon"
          style={{
            height: 30,
            width: 30,

            //            zIndex: 999,
          }}
        />
        </div>
        <div>
        <Input
         
          ref={inputRef}
          required
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={updateText}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setIsSearchInputActive(true)}
        />
        </div>

        <ClearTextButton
          ref={clearTextButtonRef}
          onClick={clearText}
          isVisibleOnDesktop={input.length !== 0}
          onKeyDown={handleClearTextButtonKeyDown}>
          {/* <CloseIcon /> */}
        </ClearTextButton>
        
      </InputContainer>
    </div>
  );
};

export default TemplateSearch;
