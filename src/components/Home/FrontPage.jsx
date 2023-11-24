import React from 'react';
import './FrontPage.css'
import Left from './Left.jsx'
import Form from './Form.jsx'
function FrontPage() {
  return (
    <div className='container'>
    <Left/>
    <Form/>
    </div>
  )
}

export default FrontPage;