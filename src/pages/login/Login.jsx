import React from 'react';
import { connect } from 'react-redux';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap';
import { Link } from 'react-router-dom'
// import { FaFacebook, FaGoogle } from 'react-icons/fa';

import actions from '../../store/actions';
import userService from '../../services/user.service';
// import OauthHandler from '../../controllers/oauth/OauthHandler';

class LoginPage extends React.Component {

    state = { user: {} }
    emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    iconSize = "30px";

    email = React.createRef();
    password = React.createRef();

    async login() {
        let { user } = this.state;
        let cred = this.validate(user);
        if (!cred)
            return;
        try {
            let user = await userService.login(cred.email, cred.password);
            this.props.updateUser(user);
        } catch (error) {
            window.alert(`Login failed: please check email and password`);
        }
    }

    validate(object) {
        let { email = this.email.current.value, password = this.password.current.value } = object;
        if (!email) {
            window.alert(`Please enter an email`);
            return false;
        }
        if (!password) {
            window.alert(`Please enter a password`);
            return false;
        }
        if (!email.match(this.emailRegex)) {
            window.alert(`Invalid email, please enter a valid email`);
            return false;
        }
        return { email, password }
    }

    updateValueInState = (key, value) => {
        this.setState({
            user: {
                ...this.state.user,
                [key]: value
            }
        })
    }

    checkSession = () => {
        userService.checkSession().then(user => {
            this.props.updateUser(user);
        }).catch(error => {
            console.log(`No login happened`);
        })
    }

    getLoginForm() {
        return <Form>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="enter your email"
                    onChange={(evt) => this.updateValueInState('email', evt.target.value)}
                    ref={this.email}
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="enter your password"
                    ref={this.password}
                    onChange={(evt) => this.updateValueInState('password', evt.target.value)}
                />
            </FormGroup>
            <Button
                onClick={(evt) => {
                    evt.preventDefault();
                    this.login();
                }}
                color="primary"
            >Login</Button>
            <br></br>
            <Link onClick={() => this.props.switchForm()} >Register an account</Link>
            <br></br>
            {/* <div className="d-flex w-100 flex-column align-items-center" >
                <string>Or Login With</string>
                <div className="d-flex" >
                    <OauthHandler
                        url="/api/auth/google"
                        onClose={this.checkSession}
                        onCode={this.checkSession}
                        title={<Link to="#"><FaGoogle size={this.iconSize}
                        /></Link>}
                    />
                    <OauthHandler
                        url="/api/auth/facebook"
                        onClose={this.checkSession}
                        onCode={this.checkSession}
                        title={<Link to="#"><FaFacebook size={this.iconSize} /></Link>}
                    />
                </div>
            </div> */}
        </Form>
    }

    render() {
        return this.getLoginForm()
    }
}

const mapStateToProps = (state) => {
    return {}
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: user => dispatch({ type: actions.USER, user: user }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);