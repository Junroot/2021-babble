import './SearchInput.scss';

import React, { useRef } from 'react';

import PropTypes from 'prop-types';

const TextInput = ({ name, placeholder = '닉네임을 입력해주세요.' }) => {
  const containerRef = useRef(null);

  const onFocusInput = () => {
    containerRef.current.classList.add('focused');
  };

  const onBlurInput = () => {
    containerRef.current.classList.remove('focused');
  };

  return (
    <div
      className='input-container'
      onFocus={onFocusInput}
      onBlur={onBlurInput}
      ref={containerRef}
    >
      <input
        type='text'
        className='input-inner'
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default TextInput;
