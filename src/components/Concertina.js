import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './Concertina.styles';

const Concertina = ({
  headerContent,
  mainContent,
  footerContent,
  borderStyle,
  borderRadius,
  stopMarginTop,
}) => {
  const classNames = useStyles({ borderStyle, borderRadius, stopMarginTop });
  return (
    <div>
      <div>
        <div className={classNames.paddingMask}></div>
        <div className={classNames.header}>
          {headerContent()}
        </div>
        <div className={classNames.body}>
          {mainContent()}
        </div>
      </div>
      <div className={classNames.footer}>
        {footerContent()}
      </div>
    </div>
  )
};

Concertina.propTypes = {
  stopMarginTop: PropTypes.string.isRequired,
  headerContent: PropTypes.func.isRequired,
  mainContent: PropTypes.func.isRequired,
  footerContent: PropTypes.func.isRequired,
};

export default Concertina;