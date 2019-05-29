import React, { Component } from 'react';

class Registration extends Component {

    state={
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullNameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false
    }

    stateChangeHandler = (e:any)=> {
        this.setState({[e.target.name]: e.target.value});
    }

    submitRegistration = () => {
        if(!/^([a-zA-Z]*\s*[a-zA-Z]*)$/.test(this.state.fullName)){
            this.setState({fullNameError: true});
        }
        else{
            this.setState({fullNameError: false});
        }
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(this.state.email)){
            this.setState({emailError: true});
        }
        else{
            this.setState({emailError: false});
        }
        if(this.state.password.length<6){
            this.setState({passwordError: true});
        }
        else{
            this.setState({passwordError: false});
        }
        if(this.state.confirmPassword !== this.state.password){
            this.setState({confirmPasswordError: true});
        }
        else{
            this.setState({confirmPasswordError: false});
        }
        if(!this.state.passwordError && !this.state.fullNameError && !this.state.emailError && !this.state.confirmPasswordError){
            console.log(this.state);
        }
    }

    render() {
        
        return (
            <div>
                <article className="mx-auto jumbotron" style={{maxWidth: "600px"}}>
                    <h4 className="card-title mt-3 text-center">Create Account</h4>
                    <div>
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input name="fullName" className="form-control" onChange={this.stateChangeHandler} placeholder="Ex.-Fisrtname Lastname" type="text"/>
                        </div>
                        {
                            this.state.fullNameError && 
                                <div className="alert alert-danger">
                                    <strong>Use text only!</strong>
                                </div>
                        } 
                        
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input name="email" className="form-control" onChange={this.stateChangeHandler} placeholder="Email address" type="email"/>
                        </div> 
                        {
                            this.state.emailError && 
                                <div className="alert alert-danger">
                                    <strong>Wrong email pattern!</strong>
                                </div>
                        }
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input name="password" className="form-control" onChange={this.stateChangeHandler} placeholder="Create password" type="password"/>
                        </div> 
                        {
                            this.state.passwordError && 
                                <div className="alert alert-danger">
                                    <strong>Password should be atleast 6 character long!</strong>
                                </div>
                        }
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                            </div>
                            <input name="confirmPassword" className="form-control" onChange={this.stateChangeHandler} placeholder="Repeat password" type="password"/>
                        </div>  
                        {
                            this.state.confirmPasswordError && 
                                <div className="alert alert-danger">
                                    <strong>Confirm password should match with original password!</strong>
                                </div>    
                        }                               
                        <div className="form-group">
                            <button type="button" onClick={this.submitRegistration} className="btn btn-primary btn-block"> Create Account  </button>
                        </div>     
                        <p className="text-center">Have an account? <a href="">Log In</a> </p>                                                                 
                    </div>
                </article>
            </div>
        )
    }
}

export default Registration;