import React, { useState } from 'react'
import { connect } from 'react-redux'
import { CloseAlert } from './Redux/Alert/alertActions';
import { Modal, Button } from 'react-bootstrap';


function AlertSuccessModal(props) {

    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
        props.CloseAlert()
    }

    return (
        <React.Fragment>

            {  props.alert.open ? (
                <Modal
                    show={show}
                    size="lg"
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header >
                        <Modal.Title> {props.alert.message} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div></div>
                    </Modal.Body>
                    <Button size="sm" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal>) : null}
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        CloseAlert: (state) => dispatch(CloseAlert(state))
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        alert: state.alert
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AlertSuccessModal)
