import React, { useState } from 'react'
import {  Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { closeAlert } from './Redux/Alert/alertActions';
import { Modal, Button } from 'react-bootstrap';

function AlertEditSuccess(props) {

    
  const [show, setShow] = useState(true);


  const handleClose = (e) => {
   console.log("handle close" , props)
   setShow(false)
   props.onCloseAlertModal(false);
  // window.location.reload(false);
   }
  
 

  return (
    <Modal
      show={show}
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header >
        <Modal.Title> {props.message}</Modal.Title>
      </Modal.Header>
  
      <Button size="sm" variant="secondary" onClick={handleClose }>
        Close
      </Button>
    </Modal>
  )
}

 


export default AlertEditSuccess
