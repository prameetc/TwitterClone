import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import material from '../../native-base-theme/variables/material';
import {NavigationActions} from 'react-navigation';
import {
  Container,
  Button,
  Text,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  StyleProvider,
  Content,
  Grid,
  Col,
  Row,
  Input,
  Item,
  Form,
  Label,
  Footer,
  FooterTab,
  Spinner
} from 'native-base';
import UserActions from '../reducers/userstore';
// import { setUsername } from "../actions/loginActions";
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  topMargin: {
    // marginTop: 25
  },
  content: {
    padding: 10,
    backgroundColor: 'white'
  },
  heading: {
    fontSize: 32,
    fontWeight: '400',
    marginBottom: 30
  },
  footer: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 60,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

// @connect(store => {
//   return {
//     username: store.login.username,
//     password: store.login.password,
//     loginStatus: store.login.loginStatus
//   };
// })
class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      Name: '',
      username: ''
    };
  }
  // login() {
  //   this.props.dispatch({
  //     type: "DO_LOGIN",
  //     payload: { username: this.props.username, password: this.props.password }
  //   });
  // }

  // componentWillMount() {
  //   console.log("component will mount");
  // }
  submit() {
    this.props.signUp(
      this.state.email,
      this.state.password,
      this.state.Name,
      this.state.username,
      this.props.navigation
    );
  }
  render() {
    // if (this.props.loginStatus === "success") {
    //   console.log(this.props.navigation);
    //   this.props.navigation.dispatch(
    //     NavigationActions.reset({
    //       index: 0,
    //       actions: [NavigationActions.navigate({ routeName: "Home" })]
    //     })
    //   );
    // }
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={styles.topMargin}>
          <Header noShadow style={{backgroundColor: 'white'}}>
            {/* <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="ios-arrow-back" style={{ color: '#4286f4' }} />
              </Button>
            </Left> */}
          </Header>
          <Content style={styles.content}>
            <Text style={styles.heading}>Sign Up For Twitter</Text>
            <Form>
              <Item stackedLabel last>
                <Label>Email address</Label>
                <Input autoCapitalize='none' onChangeText={email => this.setState({email})} />
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  autoCapitalize='none'
                  onChangeText={password => this.setState({password})}
                />
              </Item>
              <Item stackedLabel last>
                <Label>Name</Label>
                <Input autoCapitalize='none' onChangeText={Name => this.setState({Name})} />
              </Item>
              <Item stackedLabel last>
                <Label>Username</Label>
                <Input autoCapitalize='none' onChangeText={username => this.setState({username})} />
              </Item>
            </Form>
          </Content>
          <Footer style={styles.footer}>
            <Button
              rounded
              style={{backgroundColor: '#4286f4', marginLeft: 20}}
              onPress={() => this.submit()}
            >
              <Text>Sign Up</Text>
            </Button>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

function bindActions(dispatch) {
  return {
    signUp: (email, password, name, username, navigation) =>
      dispatch(UserActions.signUp(email, password, name, username, navigation))
  };
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  bindActions
)(SignUpScreen);
