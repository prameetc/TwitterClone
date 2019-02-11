import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import material from '../../native-base-theme/variables/material';
import {NavigationActions} from 'react-navigation';
import UserActions from '../reducers/userstore';
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
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  submit() {
    this.props.login(this.state.email,
      this.state.password,
      this.props.navigation);
  }
  render() {
    if (this.props.isLoggedIn === true) {
      () => this.props.navigation.navigate('HomeScreen')
    }
    const {navigation} = this.props;
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={styles.topMargin}>
          <Header noShadow style={{backgroundColor: 'white'}}>
            <Left style={{flex: 1}} />
            <Body style={{flex: 1}}>
              <Icon
                name="logo-twitter"
                style={{alignSelf: 'center', color: '#4286f4'}}
              />
            </Body>
            <Right style={{flex: 1}}>
              <Button
                transparent
                onPress={() => navigation.navigate('SignUpScreen')}
              >
                <Text style={{color: '#4286f4'}}>Sign up</Text>
              </Button>
            </Right>
          </Header>
          <Content style={styles.content}>
            <Text style={styles.heading}>Login to Twitter</Text>
            <Form>
              <Item stackedLabel last>
                <Label>Email address</Label>
                <Input onChangeText={email => this.setState({ email })} autoCapitalize='none' />
              </Item>
              <Item stackedLabel last>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  autoCapitalize='none'
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
            </Form>
            {/* <Button
              transparent
              style={{
                margin: 15,
                marginTop: 25,
                width: "50%",
                alignSelf: "center"
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 14, color: "#AAA" }}
              >
                Forgot password?
              </Text>
            </Button> */}
          </Content>
          <Footer style={styles.footer}>
            <Button
              rounded
              style={{backgroundColor: '#4286f4', marginLeft: 20}}
              onPress={() => this.submit()}
            >
              <Text>Log in</Text>
            </Button>
          </Footer>
        </Container>
      </StyleProvider>
    );
  }
}

function bindActions(dispatch) {
  return {
    login: (email, password, navigation) =>
      dispatch(
        UserActions.login(email, password, navigation)
      ),
  };
}

function mapStateToProps(state) {
  return {
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(LoginScreen);
