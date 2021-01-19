import React from 'react'

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { confirmAlert } from 'react-confirm-alert'; // Import


const ConfirmModal = (handleClickDelete , id ) =>  confirmAlert({
    customUI: ({ onClose }) => {
       return (
        <div className='custom-ui'>
          <h1>Are you sure?</h1>
          <p>You want to delete this record?</p>
          <button onClick={onClose}>No</button>
          <button
            onClick={() => {
               handleClickDelete(id);
              onClose();
            }}
          >
            Yes, Delete it!
          </button>
        </div>
      );
    }
  });



export default ConfirmModal
