import React from 'react';
import styled from 'styled-components';

import LoveHeart from './LoveHeart';

const StyledWrapper = styled.div`
  .heart {
    position:initial;
    filter:drop-shadow(0px 0px 20px #f4b0f3);
    transform: rotate(45deg);
    left:initial;
    top:initial;
    margin-top:initial;
    margin-left:initial;
    color:#fff;
  }
  .img-preview-mask,.loading-mask{
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background: rgba(0,0,0,.65);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:999;
  }
  .img-preview-mask {
     display:none;

     &.show {
      display:flex;
    }
    .tips {
      font-size: 1.2rem;
      color: #f4b0f3;
      text-align: center;
      margin-bottom: 20px;
    }
    #showImg {
      width: 100vw;
    }
  }
`;

export default function ImgPreview({ visible = false, imgLoading = false }) {
  const closeMask = async () => {
    let ele = document.querySelector('#showImgMask');
    ele.classList.remove('show');
  };
  return (
    <StyledWrapper className={ visible ? 'visible' : 'hidden' }>
      <div className={ 'loading-mask ' + (imgLoading ? 'visible' : 'hidden') }>
        <LoveHeart/>
      </div>
      <div className='img-preview-mask' id='showImgMask' onClick={ closeMask }>
        <div>
          <p className='tips'>长按下载图片</p>
          <img src="" alt='' id='showImg'/>
        </div>
      </div>
    </StyledWrapper>
  );
}
