import React, { Component } from 'react';
import randomName from 'node-random-name';
import { auth } from 'config/firebase';
const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    isAuth: false,
    user: null
  };

  componentDidMount() {
    auth.signInAnonymously().catch(err => {
      console.error(err);
    });

    auth.onAuthStateChanged(user => {
      if (user) {
        const userData = { ...user };
        // user is logined
        if (!userData.displayName) {
          userData.displayName = randomName();
        }

        this.setState({
          isAuth: true,
          user: userData
        });
      } else {
      }
    });
  }

  render() {
    const { isAuth, user } = this.state;

    return (
      <AuthContext.Provider value={{ isAuth, user }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
