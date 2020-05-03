/*
 * @Author: your name
 * @Date: 2020-05-03 08:52:41
 * @LastEditTime: 2020-05-03 10:19:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /frontend-daily-learning/loveHeart/honeyed-words-generator/src/App.js
 */
import React, { lazy, Suspense, useState } from 'react';

import { getQueryValue } from './utils';
import Loading from './components/Loading';
import LoadingWords from './components/LoadingWords';
import RefreshButton from './components/RefreshButton';
import SaveButton from './components/SaveButton';
import ImgPreview from './components/ImgPreview';
import Card from './components/Card';

const Header = lazy(() => import('./components/Header'));

const wordsIdx = getQueryValue('idx');
const hasWords = wordsIdx !== '';
const App = () => {
  const [ start, setStart ] = useState(hasWords);
  const [ loading, setLoading ] = useState(!hasWords);
  const [ imgLoading, seImgLoading ] = useState(false);
  const handleStart = () => {
    setStart(true);
    setLoading(true);
  };
  const handleDone = () => {
    setLoading(false);
  };
  const handleUpdate = () => {
    setLoading(true);
  };
  const handleImgLoading = (type = true) => {
    seImgLoading(type);
  };
  return (
    <Suspense fallback={ <Loading/> }>
      { !start && <Header handleStart={ handleStart }/> }
      <LoadingWords visible={ start && loading } handleDone={ handleDone }/>
      <Card wordsIdx={ wordsIdx } visible={ start && !loading }/>

      <ImgPreview visible={ start && !loading } imgLoading={ imgLoading }/>
      <RefreshButton visible={ start && !loading && !hasWords } handleUpdate={ handleUpdate }/>
      <SaveButton visible={ start && !loading && !hasWords } handleImgLoading={ handleImgLoading }/>
    </Suspense>
  );
};
export default App;
