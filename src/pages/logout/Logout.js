import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import actions from '../../store/actions';

const Logout = props => {
    const logout = () => props.logout();
    return <Button onClick={logout} >Logout</Button>
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch({ type: actions.USER, user: undefined })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);