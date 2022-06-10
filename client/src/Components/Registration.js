import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './login.component'
import AdminLogin from './admin.login.component'
import SignUp from './signup.component'
import AddEmployee from './add.component'

function Registration() {
  const [name, setName] = React.useState('');
  const [login, setLogin] = React.useState(false);
  const [isAdmin, setAdmin] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      setLogin(true);
      const emp = localStorage.getItem('employeTc').replace(/\"/g, "");
      setName(emp);
    } else {
      if (localStorage.getItem('isAdmin') === 'true') {
        setAdmin(true);
      }
      setLogin(false);
    }
  }, [])
  function checkLogin() {
    localStorage.clear();
  }
  const addEmployee = () => {
    setLoggedIn((prev) => !prev);
  }
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          {isAdmin ? (
            <div className="container">

              <a style={{ 'cursor': 'pointer'}} className="navbar-brand"
                onClick={() => addEmployee()} href={'/'}>
                Root User
              </a>
              <a style={{ 'cursor': 'pointer' }} className="navbar-brand"
                onClick={() => addEmployee()} href={'/add-employee'}>
                Add Employee
              </a>
              <a style={{ 'cursor': 'pointer' }} className="navbar-brand"
                onClick={() => checkLogin()} href={'/'}>
                Sign Out
              </a>
            </div>
          ) : login ? (
            <div className="container">
              <a style={{ 'cursor': 'pointer' }} className="navbar-brand"
                onClick={() => addEmployee()} href={'/'}>
                Welcome {name} kimlik numarasi ile islem yapiyorsunuz!
              </a>

              <a style={{ 'cursor': 'pointer' }} className="navbar-brand"
                onClick={() => checkLogin()} href={'/'}>
                Sign Out
              </a>
            </div>
          ) :
            <div className="container">
              <Link className="navbar-brand" to={'/sign-in'}>
                Welcome!
              </Link>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'}>
                      User Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={'/admin-sign-in'}>
                      Admin Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={'/sign-up'}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>}
        </nav>

        <div className="auth-wrapper">
          <div className={login | isAdmin ? 'auth-inner-table' : 'auth-inner'}>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/admin-sign-in" element={<AdminLogin />} />
              <Route path="/sign-up" element={<SignUp />} />
              {isAdmin ? <Route path="/add-employee" element={<AddEmployee />} /> : null}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default Registration