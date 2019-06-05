import React, {Component} from 'react';
import { addUser } from 'action/auth';
import { connect } from 'react-redux';
import { IAppState } from 'store';

export interface IRegistrationState{
    u_id: number
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
    fullNameError: boolean,
    emailError: boolean,
    passwordError: boolean,
    confirmPasswordError: boolean
}

class Registration extends React.Component<any,IRegistrationState> {

    state={
        u_id: this.props.Users.Users.length,
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullNameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false
    }
    //re
    stateChangeHandler = (e:any)=> {
        let self = this;
        this.setState({[e.target.name]: e.target.value} as any);
    }

    submitRegistration = async() => {
        if(!/^([a-zA-Z]*\s*[a-zA-Z]*)$/.test(this.state.fullName)){
            await this.setState({fullNameError: true});
        }
        else{
            await this.setState({fullNameError: false});
        }
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(this.state.email)){
            await this.setState({emailError: true});
        }
        else{
            await this.setState({emailError: false});
        }
        if(this.state.password.length<6){
            await this.setState({passwordError: true});
        }
        else{
            await this.setState({passwordError: false});
        }
        if(this.state.confirmPassword !== this.state.password){
            await this.setState({confirmPasswordError: true});
        }
        else{
            await this.setState({confirmPasswordError: false});
        }
        if(!this.state.passwordError && !this.state.fullNameError && !this.state.emailError && !this.state.confirmPasswordError){
            console.log(this.props);
            this.props.addUser(this.state);
            this.props.history.push('/acservice/'+this.state.u_id);
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

const mapStateToProps= (state:IAppState)=>({
    Users: state.authState
});

export default connect(mapStateToProps,{addUser})(Registration);