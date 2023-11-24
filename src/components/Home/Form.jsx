import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Form.css';


function Form() {


  const [data, setdata] = useState({
    name: "",
    username: "",
    email: "",
    number: ""
  })

  const [error, setError] = useState()

  const handleChange = (e) => {

    if (e.target.name === 'number') {
      const sanitizedNumber = e.target.value.replace(/[^\d]/g, '');
      setdata({ ...data, [e.target.name]: sanitizedNumber });
    }
    else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  }
  const redirectTo = useNavigate();
  const handleSubmit = () => {
    const NameRegex = /^[A-Za-z ]{3,}$/;
    const UserNameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{6,10}$/;
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const NumberRegex = /^[0-9]{10}$/;
    const ValidationErrors = {}
    if (!NameRegex.test(data.name)) {
      ValidationErrors.name = "Name should only contain alphabets and minimum of 3 letters"
    }
    if (!UserNameRegex.test(data.username)) {
      ValidationErrors.username = "UserName should be a combination of alphabets and digits between 6 to 10 letters"
    }
    if (!EmailRegex.test(data.email)) {
      ValidationErrors.email = "Email format Invalid"
    }
    if (!NumberRegex.test(data.number)) {
      ValidationErrors.number = "Number should be of 10 digits"
    }
    if (!document.getElementById('checkbox').checked) {
      ValidationErrors.checker = "Please tick the checkbox"
    }

    setError(ValidationErrors);
    if (Object.keys(ValidationErrors).length === 0) {
      localStorage.setItem('formData', JSON.stringify(data));
      redirectTo("/category")
      setdata({
        name: "",
        username: "",
        email: "",
        number: "",
        checker: ""
      });
    }


  }

  return (
    <div className='RegisterForm'>
      <h1 id='title'>Super app</h1>
      <p>Create your new account</p>
      <input class='data' type='text' placeholder='Name' name='name' value={data.name} onChange={handleChange} />
      {error && <div className="error">{error.name}</div>}
      <input class='data' type='text' placeholder='UserName' name='username' value={data.username} onChange={handleChange} maxLength={10} />
      {error && <div className="error">{error.username}</div>}
      <input class='data' type='email' placeholder='Email' name='email' value={data.email} onChange={handleChange} />
      {error && <div className="error">{error.email}</div>}
      <input class='data' type='text' placeholder='Number' name='number' value={data.number} onChange={handleChange} maxLength={10} />
      {error && <div className="error">{error.number}</div>}
      <div id='checkboxx'><input type='checkbox' id='checkbox'></input>
        <label for='checkbox'>Share my Registration Data with Superapp</label></div>
      {error && <div className="error">{error.checker}</div>}
      <button id='btn' onClick={handleSubmit}>SIGN UP</button>
      <p>By clicking on Sign up, you agree to Superapp <span class='green'>Terms and Conditions of Use</span>.</p>
      <p id="last">To learn more about how Superapp collects, uses, shares and protects your <br /> personal data please head Superapp<span class='green'> Privacy Policy</span>.</p>
    </div>
  )
}

export default Form;