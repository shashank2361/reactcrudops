import React from 'react'
import { Spinner, Modal } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import './spinner.css';

function spinner(props) {
  return (
    <React.Fragment>
      { props.isLoading ? (<>
      
        
        <div id="spinner-fade">
          <div className="default-spinner spinner-border" role="status"></div>
          <Loader type="Puff" color="#00BFFF" height={100}
          width={100} />
          
        
        </div>
      </>

      ) : null}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  console.log(state.loading)
  return {
    isLoading: state.loading,
    emps: state.emps,
    login: state.login
  }
};


export default connect(mapStateToProps)(spinner);


// <Modal   size="sm" show={true} dialogClassName={"SpinnerModal"}
// backdrop="static"
// keyboard={false}>

// <Modal.Body bsPrefix ="spinnerTop">
//     <div>
//     <Loader type="Puff" color="#00BFFF" height={100}
//     width={100} />
// </div>
// </Modal.Body>

// </Modal>