import React from 'react';

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
}

export default Concertina;