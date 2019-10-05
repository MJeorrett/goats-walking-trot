import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  paddingMask: {
    height: p => p.stopMarginTop,
    backgroundColor: 'white',
    border: '1px solid white',
    position: 'sticky',
    top: '0',
    zIndex: '3',
  },
  header: {
    backgroundColor: 'white',
    borderTop: p => p.borderStyle || 'none',
    borderLeft: p => p.borderStyle || 'none',
    borderRight: p => p.borderStyle || 'none',
    borderRadius: p => p.borderRadius ? `${p.borderRadius} ${p.borderRadius} 0 0` : 0,
    position: 'sticky',
    top: p => p.stopMarginTop,
    zIndex: '3',
  },
  body: {
    borderLeft: p => p.borderStyle || 'none',
    borderRight: p => p.borderStyle || 'none',
    overflow: 'auto',
  },
  footer: {
    borderLeft: p => p.borderStyle || 'none',
    borderRight: p => p.borderStyle || 'none',
    borderBottom: p => p.borderStyle || 'none',
    borderRadius: p => p.borderRadius ? `${p.borderRadius} ${p.borderRadius} 0 0` : 0,
  }
});

export default useStyles;