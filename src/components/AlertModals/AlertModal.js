import React, { useState } from 'react'
import { connect } from 'react-redux'
import { CloseAlert } from '../Redux/Alert/alertActions';
import { Modal, Button, Alert } from 'react-bootstrap';
 

function AlertModal(props ) {
    const { open , message } = props.alert;
    const { error } = props.emps;

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        props.CloseAlert()
    }
     return (
        <React.Fragment>
            {   open   ? (
                <Modal
                    show={open}
                    size="lg"
                    backdrop="static"
                    keyboard={false}
                    dialogClassName =  { error  ? "bg-warning" : "bg-success"} 
                >
                   
                    {/* <Modal.Header >
                        <Modal.Title> </Modal.Title>
                    </Modal.Header>
                    */}
                    <Modal.Body>
                    <Alert  variant={ error  ? "danger" : "success"}>{message} </Alert>
                        <div> </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button size="sm" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {props.children}

                    </Modal.Footer>
                    

                </Modal>) : null}
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => ({  CloseAlert: (state) => dispatch(CloseAlert(state))})
const mapStateToProps = (state) =>  ({  alert: state.alert , emps : state.emps})
export default connect(mapStateToProps, mapDispatchToProps)(AlertModal)
