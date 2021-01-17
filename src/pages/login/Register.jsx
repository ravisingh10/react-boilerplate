import React from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,

} from 'reactstrap';
import userService from '../../services/user.service';

class Register extends React.Component {

    state = { details: {} }

    updateValueInDetails = (key, value) => {
        let { details } = this.state;
        this.setState({
            details: {
                ...details,
                [key]: value
            }
        });
    }


    register = async () => {
        const { details = {} } = this.state;
        let newDetails = this.validateDetails(details);
        if (!newDetails)
            return;
        try {
            let createdUser = await userService.register(newDetails);
            this.setState({ login: !this.state.login })
        } catch (error) {
            window.alert(`User creation failed, please check details and if you have registered earlier`)
        }
    }

    getRegisterForm() {
        return <Form>
            <FormGroup>
                <Label for="firstname">Firstname*</Label>
                <Input type="text" name="firstname" id="firstname" placeholder="your firstname"
                    onChange={(evt) => this.updateValueInDetails('firstname', evt.target.value)}
                />
                <Label for="lastname">Lastname</Label>
                <Input type="text" name="lastname" id="lastname" placeholder="your lastname"
                    onChange={(evt) => this.updateValueInDetails('lastname', evt.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="userEmail">Email*</Label>
                <Input type="email" name="email" id="userEmail" placeholder="your email"
                    onChange={(evt) => this.updateValueInDetails('email', evt.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password*</Label>
                <Input type="password" minLength={5} name="password" id="examplePassword" placeholder="your password here"
                    onChange={(evt) => this.updateValueInDetails('password', evt.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="confirm_password">Confirm password*</Label>
                <Input type="password" name="confirm_password" id="confirm_password" placeholder="confirm password"
                    onChange={(evt) => this.updateValueInDetails('confirmPassword', evt.target.value)}
                />
            </FormGroup>
            <br></br>
            <Link onClick={this.props.switchForm} >Already have an account?</Link>
        </Form>
    }

    render() {
        return this.getRegisterForm()
    }
}

export default Register;