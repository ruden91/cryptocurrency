import React, { Component } from 'react';
import { auth } from 'config/firebase';
const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    isAuth: false
  };

  componentDidMount() {
    auth.signInAnonymously().catch(err => {
      console.error(err);
    });

    auth.onAuthStateChanged(user => {
      if (user) {
        // user is logined
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;

        console.log(isAnonymous);
      }
    });
  }

  render() {
    const { isAuth } = this.state;

    return (
      <AuthContext.Provider value={{ isAuth }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
