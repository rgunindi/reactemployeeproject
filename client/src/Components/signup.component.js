import React, { Component } from 'react'
import AccountPage from './AccountPage';
import LoginPage from './login.component';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      tc: '',
      department: '',
      password: '',
      flag: false,
      login: false,
      isAdmin: false,
    };
  }
  componentDidMount() {
    try {
      this.setState({
        isAdmin: localStorage.length > 0 ? localStorage.getItem('isAdmin').replace(/\"/g, "") ? true : false : false
      });
    }
    catch (err) { console.log(err) }
    try {
      this.setState({
        login: localStorage.length > 0 ? localStorage.getItem('login').replace(/\"/g, "") ? true : false : false
      });
    }
    catch (err) { console.log(err) }

  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, tc, department, password } = this.state;
    if (!name || !lastName || !tc || !password || !department) {
      this.setState({
        flag: true,
      });
    } else {
      /*Saved In Local Storage*/ 
      localStorage.setItem('employeTc', JSON.stringify(tc));
      localStorage.setItem('password', JSON.stringify(password));
      localStorage.setItem('department', JSON.stringify(department));
      this.setState({
        flag: false,
        login: true
      });
    }
  }
  render() {
    return (
      <>
        {this.state.isAdmin ? (<AccountPage isAdmin={true} />) : (
          this.state.login ? (< LoginPage />) : (
            <form >
              <h3>Sign Up</h3>
              <div className="mb-3">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name"
                  onChange={(e) => this.setState({ lastName: e.target.value })} />
              </div>
              <div className="mb-3">
                <label>TC</label>
                <input type="number" className="form-control" placeholder="Tc for employe"
                  onChange={(e) => this.setState({ tc: e.target.value })} />
              </div>

              <div className="form-group">
                <label htmlFor="sel1"> Select your department:</label>
                <select className="form-control" id="sel1"
                  value={this.state.department}
                  onChange={(e) => this.setState({ department: e.target.value })} >
                  <option value={null}>-------</option>
                  <option value="1">IT</option>
                  <option value="2">Front-End</option>
                  <option value="3">Back-End</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary"
                  onClick={(e) => this.handleSubmit(e)}>
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right"
                onClick={() => this.state.login({ login: true })}>
                Already registered <a href="/sign-in">sign in?</a>
              </p>
              {this.state.flag && (
                <div className="alert alert-danger" role="alert">
                  Please fill all fields
                </div>
              )}
            </form>
          ))}
      </>
    )
  }
}