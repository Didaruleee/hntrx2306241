import Image from "next/legacy/image";
import TemplateSearch from '../TemplateSearch';
import {
  MainBtn,
  Wrap,
  RefreshBox,
  SelectBox,
  SelectWrap,
  WrapDiv,
  FilterIcon,
  ZIndex,
} from './SortTab.styled';
import { useState } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core';
import { Autorenew } from '@material-ui/icons';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Background } from "components/NavBar/NavBar.styled";

// const useStyles = makeStyles((theme) => ({
//   refresh: {
//     cursor: 'pointer',
//     margin: 'auto',
//     '&.spin': {
//       animation: '$spin 1s 1',
//       pointerEvents: 'none',
//     },
//   },
//   '@keyframes spin': {
//     '0%': {
//       transform: 'rotate(0deg)',
//     },
//     '100%': {
//       transform: 'rotate(360deg)',
//     },
//   },
// }));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SortTab = ({
  hideFilter,
  hideBulk,
  setFilterHide,
  setBulkHide,
  setRenderTemplates,
  setLoading,
  setOrigin,
  onRefresh,
  setSort,
  sortValue,
  isSort,
  
}): JSX.Element => {
  const [spin, setSpin] = useState(false);
  // const classes = useStyles();
  const refreshCanvas = () => {
    onRefresh();
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 1000);
  };

  return (
    <>
      
        <TemplateSearch
          isMobileSearchOpen={false}
          closeMobileSearch={() => { }}
          placeholder="Search NFTs …"
          setRenderTemplates={setRenderTemplates}
          setLoading={setLoading}
          setOrigin={setOrigin}
        />
      
    


    </>
  );
};
