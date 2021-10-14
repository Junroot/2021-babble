import './SliderManagement.scss';

import { Body1, Caption1, Headline2 } from '../../core/Typography';
import { ModalError, SquareButton } from '../../components';
import React, { useEffect, useRef, useState } from 'react';

import { TEST_URL } from '../../constants/api';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import { useDefaultModal } from '../../contexts/DefaultModalProvider';

const SliderManagement = () => {
  const logoRef = useRef(null);
  const backgroundRef = useRef(null);
  const gradientRef = useRef(null);
  const alertRef = useRef(null);
  const tagsRef = useRef(null);
  const bgFileRef = useRef(null);

  const node = document.getElementById('bg-preview');
  const [tagInput, setTagInput] = useState('');

  const [defaultColor, setDefaultColor] = useState('#4c5eff');
  const [alertColor, setAlertColor] = useState('#ff005c');

  const [sliders, setSliders] = useState([]);

  const { openModal } = useDefaultModal();

  const getSliderImages = async () => {
    try {
      // const response = await axios.post(`${TEST_URL}/api/images`, {

      // });
      const response = await axios.get(`${TEST_URL}/api/sliders`);
      console.log(response.data);
      setSliders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSliderImages();
  }, []);

  const handleFile = ({ target }, ref) => {
    const newFile = target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(newFile);
    reader.onload = () => {
      ref.current.style.backgroundColor = `transparent`;
      ref.current.style.border = `none`;
      ref.current.style.backgroundImage = `url(${reader.result})`;

      if (
        logoRef.current.style.backgroundImage !== '' &&
        logoRef.current.querySelector('.logo-file-label')
      ) {
        logoRef.current
          .querySelector('.logo-file-label')
          .classList.remove('logo-file-label');
      }
    };

    reader.onerror = () => {
      openModal(<ModalError>{reader.error}</ModalError>);
    };
  };

  const handleGradient = ({ target }, ref) => {
    ref.current.style.backgroundImage = `linear-gradient(90deg, 
      ${defaultColor} 0%,
      rgba(255, 255, 255, 0) 80%,
      rgba(255, 255, 255, 0) 100%)`;
    setDefaultColor(target.value);
  };

  const handleTagInput = ({ target }) => {
    setTagInput(target.value.trim());
  };

  const splitWhenSpaceDown = (e) => {
    if (e.key === ' ' || e.key === 'Tab') {
      if (tagInput === '') return;

      tagsRef.current.textContent += ` #${e.target.value.split(' ')[0]}`;

      setTagInput('');
    }

    if (e.key === 'Backspace' && tagInput === '') {
      const currentTags = tagsRef.current.textContent.split(' ');
      currentTags.splice(currentTags.length - 1, 1);

      tagsRef.current.textContent = currentTags.join(' ');
    }
  };

  const handleAlertColor = ({ target }, ref) => {
    ref.current.style.backgroundColor = `${alertColor}`;
    setAlertColor(target.value);
  };

  const limitLines = () => {};

  const makeImage = (e) => {
    if (
      tagsRef.current.textContent !== '' &&
      alertRef.current.value !== '' &&
      logoRef.current.style.backgroundImage !== '' &&
      backgroundRef.current.style.backgroundImage.includes('url')
    ) {
      domtoimage.toPng(node).then((dataUrl) => {
        const imagePreview = window.open(
          dataUrl,
          'popUpWindow',
          'width=930,height=285'
        );

        imagePreview.document.write(`<img src=${dataUrl} alt='preview' />`);
      });
      return;
    }

    console.log('더 써!');
  };

  return (
    <section className='slider-management-container'>
      <Headline2>메인 배너 관리</Headline2>
      <div className='sliders'>
        <div>
          {sliders.map((slider) => {
            <img src={slider.url} alt='slider-image' key={slider.id} />;
          })}
        </div>
      </div>
      <div className='banner-image-editor'>
        <Body1>👉 보이는 내용만 저장됩니다.</Body1>

        <div className='control'>
          <div className='control-items'>
            <div className='choose-background'>
              <label htmlFor='background-file' className='bg-label'>
                배경 이미지 선택
              </label>
              <input
                type='file'
                className='hidden'
                id='background-file'
                ref={bgFileRef}
                onChange={(e) => handleFile(e, backgroundRef)}
              />
            </div>

            <div className='choose-gradient-color'>
              <input
                type='color'
                value={defaultColor}
                onChange={(e) => handleGradient(e, gradientRef)}
              />
            </div>

            <div className='choose-alert-color'>
              <input
                type='color'
                value={alertColor}
                onChange={(e) => handleAlertColor(e, alertRef)}
              />
            </div>
          </div>
          <SquareButton onClickButton={makeImage}>
            <Caption1>이대로 만들기</Caption1>
          </SquareButton>
        </div>

        <div className='background-preview' id='bg-preview' ref={backgroundRef}>
          <div className='logo-preview' ref={logoRef}>
            <label className='logo-file-label' htmlFor='logo-file'></label>
            <input
              type='file'
              id='logo-file'
              className='hidden'
              onChange={(e) => handleFile(e, logoRef)}
            />
          </div>

          <input
            type='text'
            className='alert register'
            placeholder='new season'
            maxLength={12}
            spellCheck={false}
            ref={alertRef}
          />

          <div className='tags-container'>
            <span className='tags' ref={tagsRef}></span>
            <input
              type='text'
              className='tag register'
              placeholder='태그입력'
              spellCheck={false}
              onKeyDown={splitWhenSpaceDown}
              onChange={handleTagInput}
              value={tagInput}
            />
          </div>

          <textarea
            className='main-text-register'
            rows='2'
            onKeyDown={limitLines}
            placeholder='카트라이더 러쉬플러스 &#13;&#10;프로 리그 개막'
            spellCheck={false}
          ></textarea>

          <div className='gradient' ref={gradientRef}></div>
        </div>
      </div>
    </section>
  );
};

export default SliderManagement;
