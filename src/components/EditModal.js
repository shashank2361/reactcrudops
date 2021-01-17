import React from 'react';
import ReactDOM from 'react-dom'



function EditModal(props) {
  // console.log(props.children.props.employee)

  return (props.open ?
    ReactDOM.createPortal(<div className="editModal">

      <div className="modal-header">
        <h2 className="modal-title">Edit Employee</h2>
        <button onClick={props.close}>x</button>
      </div>
      {props.children}
    </div>,
      document.getElementById('portal-root')
    ) : null)
}

export default EditModal


{/* <span aria-hidden="true">&times;</span> */ }
