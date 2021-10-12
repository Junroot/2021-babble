import './Button.scss';

import PropTypes from 'prop-types';
import React from 'react';

const SquareButton = ({
  size = 'medium',
  type = 'button',
  colored = true,
  children,
  onClickButton = () => {},
}) => {
  return (
    <button
      type={type}
      className={`square-button ${size} ${colored ? 'colored' : 'line'}`}
      onClick={onClickButton}
    >
      {children}
    </button>
  );
};

SquareButton.propTypes = {
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'block']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  colored: PropTypes.bool,
  onClickButton: PropTypes.func,
  children: PropTypes.node,
};

export default SquareButton;
