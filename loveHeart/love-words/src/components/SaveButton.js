/*
 * @Author: your name
 * @Date: 2020-05-03 08:52:41
 * @LastEditTime: 2020-05-03 09:19:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /frontend-daily-learning/loveHeart/honeyed-words-generator/src/components/SaveButton.js
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import ImageDownload from '../assets/img/download.svg';
import StyledButton from './StyledButton';

const Button = styled(StyledButton)`
  position: fixed;
  left: 20%;
  bottom: 40px;
  transform: scale(2);
  background-image: url(${ ImageDownload });
`;

export default function SaveButton({ visible, handleImgLoading }) {
  const [ generating, setGenerating ] = useState(false);
  const handleDownload = async () => {
    let ele = document.querySelector('#HONEYED_WORDS_CARD');
    await generateImage(ele);
    handleImgLoading(true);
  };
  const generateImage = async (ele) => {
    setGenerating(true);
    html2canvas(ele, {
      debug: process.env.NODE_ENV !== 'production',
      onclone: (document) => {
        let tmp = document.querySelector('#HONEYED_WORDS_CARD');
        tmp.classList.add('starting');
        tmp.style.transform = 'none';
        tmp.style.boxShadow = 'none';
      },
      scale: window.devicePixelRatio * 2,
    }).then(function (canvas) {
      let showImg = document.querySelector('#showImg');
      let showImgMask = document.querySelector('#showImgMask');
      canvas.toBlob((blob) => {
        const {
          URL: { createObjectURL }
        } = window;
        const src = createObjectURL(blob);
        showImgMask.classList.add('show');
        var img1 = new Image,
          canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d");
        img1.onload = function () {
          canvas.width = img1.width;
          canvas.height = img1.height;
          ctx.drawImage(img1, 0, 0);
          showImg.src = canvas.toDataURL("image/png");
        };
        img1.src = src;
        setTimeout(
          function () {
            handleImgLoading(false);
          },
          1000
        )
      }, 'image/jpeg');
      setGenerating(false);
      let ele = document.querySelector('#HONEYED_WORDS_CARD');
      ele.classList.remove('starting');
    });
  };
  return (
    <Button
      className={ visible ? 'visible' : 'hidden' }
      disabled={ generating }
      onClick={ handleDownload }
    >
    </Button>
  );
}
