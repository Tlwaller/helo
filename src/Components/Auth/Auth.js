import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../Ducks/Store';
import {loginUser, registerUser, getSession} from '../../Ducks/Reducers/UserReducer';
import {Redirect} from 'react-router-dom';
import './Auth.css';

class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }
    
    componentDidMount() {
        this.props.getSession();
    }

    handleRegister = () => {
        const {username, password} = this.state;
        this.props.registerUser({username, password});
    }
    
    handleLogin = () => {
        const {username, password} = this.state;
        this.props.loginUser({username, password});
        console.log(store.getState());
    }
    
    handleInput = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        if(this.props.userId){
            return <Redirect to='/dashboard'/>
        }
        return (
            <div id='auth'>
                <div className="auth-container">
                        <img src='data:image/png;base64,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'
                        alt="logo"/>
                        <h1 className='title'>Helo</h1>
                        <label>Username: 
                        <input name='username' onChange={this.handleInput}/>
                    </label>
                    <label>Password: 
                        <input name='password' type='password' onChange={this.handleInput}/>
                    </label>
                    <div className='auth-btns-container'>
                        <button className='auth-btns' onClick={this.handleLogin}>Login</button>
                        <button className='auth-btns' onClick={this.handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userId: reduxState.UserReducer.userId,
        username: reduxState.UserReducer.username,
        url: reduxState.UserReducer.url
    }
}

export default connect(mapStateToProps, {
    loginUser,
    registerUser,
    getSession
})(Auth)