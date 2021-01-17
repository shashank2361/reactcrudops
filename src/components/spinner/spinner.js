import React from 'react'
import { Spinner, Modal } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

import './spinner.css';

function spinner({ isLoading }) {
    return (
        <React.Fragment>
          { isLoading ?      (  <>
         <h1>Spinner</h1>
         <Loader type="Puff" color="#00BFFF" height={100}
 width={100} />
       <div id="spinner-fade">
             <div className="default-spinner spinner-border" role="status"></div>
         </div> 
         </>
         
         )          : null}   
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    console.log(state)
 return {
    isLoading : state.loading,
    emps: state.emps,
    login: state.login
}};


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