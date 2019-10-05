import React from 'react';

import './Concertina.css';

const Concertina = ({
  headerContent,
  mainContent,
  footerContent,
}) => {
  return (
    <div className="concertina">
      <div>
        <div className="padding-mask"></div>
        <div className="header">
          {headerContent()}
        </div>
        <div className="body">
          {mainContent()}
        </div>
      </div>
      <div className="footer">
        {footerContent()}
      </div>
    </div>
  )
}

export default Concertina;