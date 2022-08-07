import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Toast() {
  return (
    <div>
        <ToastContainer position='top-right'
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}>
        </ToastContainer>
    </div>
  )
}

export default Toast