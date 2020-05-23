import React, { Component } from "react";
import { register } from "./UserFunctions";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      level: "manager",
      fields: {},
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  //fields and errors also added. up
  //newly add start
  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }

    if(typeof fields["password"] !== "undefined"){
      if(!fields["password"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["password"] = "Only letters";
      }
    }

    //Email
    if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
      alert("Form submitted");
    }else{
      alert("Form has errors.")
    }

  }

  handleChange(field, e){
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  //newly add finished
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      level: this.state.level,
    };
    register(user).then((res) => {
      if (res) {
        this.props.history.push(`/user-list`);
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-2 mx-auto">
            <div className="uk-card uk-card-default uk-card-body ">
              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3">
                  <p align="center">User Register</p>
                  <div>
                    <input
                      type="email"
                      className="form-control mb-2"
                      name="email"
                      placeholder="Enter email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    <input
                      type="password"
                      className="form-control mb-2"
                      name="password"
                      placeholder="Enter password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    
                  </div>
                  <button className="btn btn-primary btn-block">Add</button>
                </h1>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
