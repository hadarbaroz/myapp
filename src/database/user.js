import React from 'react';

const GlobalContext = React.createContext({});

export class UserContextProvider extends React.Component {
  state = {
    user: null,
    students: {},
    currentStudent: null
  };
    navigation: null;

  setUser = (user) => {
    console.log('user', user)
    this.setState({...this.state, user });
  }
  setCurrentStudent= (currentStudent) => {
    console.log('user', currentStudent)
    this.setState({...this.state, currentStudent });
  }

  setNavigation = (navigation) => {
    console.log('navigation', navigation)
    this.navigation= navigation;
  }

  setStudents = (students) => {
    console.log('students', students)
    this.setState({...this.state, students });
  }

  render () {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          navigation: this.navigation,
          setUser: this.setUser,
          setStudents: this.setStudents,
          setCurrentStudent: this.setCurrentStudent,
          setNavigation: this.setNavigation
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

// create the consumer as higher order component
export const withGlobalContext = ChildComponent => props => (
  <GlobalContext.Consumer>
    {
      context => <ChildComponent {...props} global={context}  />
    }
  </GlobalContext.Consumer>
);