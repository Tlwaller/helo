import React, { Component } from 'react'
import {getSession} from '../../Ducks/Reducers/UserReducer';
import {connect} from 'react-redux';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getSession();
    }
    render() {
        return (
            <div>
                Dashboard
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
    getSession
})(Dashboard)
