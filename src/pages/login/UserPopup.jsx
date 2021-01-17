import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import Login from './Login'
import Register from './Register';

class UserPopup extends React.Component {

    state = { showModal: false, login: true }

    toggle = () => this.setState({ showModal: !this.state.showModal })

    getLoginForm = () => <Login
        switchForm={this.toggleForm}
    />

    getRegisterForm = () => <Register
        switchForm={this.toggleForm}
    />

    toggleForm = () => this.setState({ login: !this.state.login })

    render() {
        return <div>
            <Button color="primary" onClick={this.toggle}>Login</Button>
            <Modal isOpen={this.state.showModal} toggle={this.toggle} className="w-100">
                <ModalHeader toggle={this.toggle}>
                    {this.state.login ? 'Login' : 'Register for a new account'}
                </ModalHeader>
                <ModalBody>
                    <div>
                        {this.state.login ? this.getLoginForm() : this.getRegisterForm()}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {this.state.login ? '' : <Button
                        onClick={(evt) => {
                            evt.preventDefault();
                            // this.props.updateUser({ name: 'Ravi' })
                            this.register();
                        }}
                        color="primary"
                    >Register</Button>}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    }
}

export default UserPopup;