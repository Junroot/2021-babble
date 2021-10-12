import './SliderManagement.scss';

import { Headline2 } from '../../core/Typography';
import React from 'react';

const SliderManagement = () => {
  const limitLines = () => {};
  return (
    <section className='slider-management-container'>
      <Headline2>메인 배너 관리</Headline2>
      <div className='banner-image-editor'>
        <div className='control'>
          <button>배경 이미지</button>
          <button>Bold</button>
        </div>
        <div className='preview'>
          <input
            type='text'
            className='alert register'
            placeholder='NEW SEASON'
          />
          <input type='text' className='tag register' placeholder='태그 입력' />
          <textarea
            className='main-text-register'
            rows='2'
            onKeyDown={limitLines}
            placeholder='카트라이더 러쉬플러스 &#13;&#10;프로 리그 개막'
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default SliderManagement;
