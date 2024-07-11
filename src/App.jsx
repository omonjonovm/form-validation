import { useState, useEffect } from 'react'

const App = () => {


  const initialValues = { username: '', email: '', password: '' };
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value });
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formValues));
    setIsSubmit(true)
  }
  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formError])

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!'
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 6) {
      errors.password = 'Password must be more than 8 characters!'
    } else if (values.password.length > 8) {
      errors.password = 'Password cannot exteceed more than 10 characters!'
    }
    return errors;
  }
  return (
    <div className='container'>
      {Object.keys(formError).length === 0 && isSubmit ? (<div className='ui message success'>Signed in Succesfully</div>) : (
        <pre>{JSON.stringify(formValues,undefined,2)}</pre>
      )}
      <form onSubmit={handleSubmit}>
        <h1>Register form</h1>
        <div className='ui divider'></div>
        <div className='ui form'>
          <div className="field">
            <label>Username</label>
            <input type="text" name='username' placeholder='Username' value={formValues.username} onChange={handleChange} />
          </div>
          <p>{formError.username}</p>
          <div className="field">
            <label>Email</label>
            <input type="email" name='email' placeholder='Email' value={formValues.email} onChange={handleChange} />
          </div>
          <p>{formError.email}</p>
          <div className="field">
            <label>Password</label>
            <input type="password" name='password' placeholder='Password' value={formValues.password} onChange={handleChange} />
          </div>
          <p>{formError.password}</p>
          <button className='fluid ui button blue'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default App