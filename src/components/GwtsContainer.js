import React from 'react';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { selectors, actions } from '../store';
import Given from './Given';

const useStyles = createUseStyles({
  givens: {
    '&> div:not(:last-child)': {
      marginBottom: '1rem',
    },
  },
  addGiven: {
    fontSize: '1.6rem',
  },
  topButtonContainer: {
    borderBottom: p => p.givenIds.length > 0 ? '1px solid lightGrey' : 'none',
    paddingBottom: '1px',
  },
});

const GwtsContainer = ({
  addGiven,
  givenIds
}) => {
  const cns = useStyles({ givenIds });
  
  function renderAddGivenButton(clickHandler) {
    return (
      <button tabIndex="-1" className={cns.addGiven} onClick={clickHandler}>+ GIVEN </button>
    )
  }

  return (
    <div>
      <div className={cns.topButtonContainer}>
        {renderAddGivenButton(() => addGiven(true))}
      </div>
      <div className={cns.givens}>
        {givenIds.map(givenId => <Given key={givenId} givenId={givenId} />)}
      </div>
      {givenIds.length > 0 && renderAddGivenButton(() => addGiven(false))}
    </div>
  )
}

const mapStateToProps = state => ({
  givenIds: selectors.given.selectAllIds(state),
});

const mapDispatchToProps = {
  addGiven: actions.given.add
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GwtsContainer);