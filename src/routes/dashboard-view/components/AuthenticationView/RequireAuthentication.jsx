import { isEqual } from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import { getUserProfile } from '../../action-creators/dashboard-view';
import setLocalStorage from '../../../../utils/local-storage-factory';
import deleteAllCookies from '../../../../utils/cookie-factory';

export default function RequireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    static propTypes = {
      availableUserProfile: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        email: PropTypes.string,
        name: PropTypes.string,
        avatar_url: PropTypes.string,
        cover_url: PropTypes.string,
        birthday: PropTypes.string,
        isAuthenticated: PropTypes.bool
      }).isRequired,
      dispatch: PropTypes.func.isRequired
    }

    static defaultProps = {
      isAuthenticated: false
    }

    componentWillMount() {
      setLocalStorage();
      deleteAllCookies();
    }

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(getUserProfile());
    }

    componentWillReceiveProps(nextProps) {
      return !isEqual(this.props.availableUserProfile, nextProps.availableUserProfile);
    }

    render() {
      const { availableUserProfile } = this.props;

      if (!availableUserProfile.isAuthenticated) {
        return (<Loading type="bubbles" color="#ff8d3f" />);
      }

      return (<Component {...this.props} />);
    }
  }

  const mapStateToProps = (state) => {
    const availableUserProfile = state['dashboard-view/dashboard-view'].availableUserProfile ||
      {
        data: [],
        loading: true,
        message: '',
        isAuthenticated: false
      };

    return {
      availableUserProfile
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
