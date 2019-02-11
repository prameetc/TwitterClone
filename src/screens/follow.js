import React, {Component} from 'react';
import Modal from 'react-native-modalbox';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Platform
} from 'react-native';
import {
  Container,
  Header,
  Body,
  Content,
  Left,
  Title,
  Thumbnail,
  Col,
  Row,
  Grid,
  Icon,
  Spinner,
  Fab,
  Button,
  Footer,
  Input,
  Right
} from 'native-base';
import firebase from 'react-native-firebase';
import _ from 'lodash';
import {connect} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import UserActions, {userTweets} from '../reducers/userstore';

const styles = StyleSheet.create({
  topMargin: {
    marginTop: Platform.OS === 'ios' ? 0 : 5,
    backgroundColor: 'white',
    zIndex: -1
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
  tweet: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column'
  },
  tweetText: {
    marginTop: 10,
    padding: 15,
    fontSize: 18,
    color: '#555'
  },
  tweetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 0
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalFooter: {
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 54,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5
  },
  modal: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 4,
    elevation: 4,
    height: Dimensions.get('window').height,
    marginTop: 10
  }
});

// @connect(store => {
//   return {
//     tweets: store.tweets.tweets,
//     fetchingTweets: store.tweets.fetchingTweets,
//     fetchedTweets: store.tweets.fetchedTweets,
//     errorTweets: store.tweets.error,
//     user: store.login.user,
//     tweetPosted: store.tweets.tweetPosted,
//     newTweetModalOpen: store.tweets.newTweetModalOpen
//   };
// })
class FollowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    var users = [];
    var followers = [];
    firebase
      .firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.data().email !== this.props.email) {
            users.push(doc.data());
          }
          this.props.allUsers(users);
        });
      })
      .catch(err => console.log(err));
    
    firebase
      .firestore()
      .collection('users')
      .doc(this.props.email)
      .collection('followers')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          followers.push(doc.data());
          this.props.allFollowers(followers);
        });
      });
  }

  _keyExtractor = (item, index) => item.id;

  addFollower(email) {
    firebase
      .firestore()
      .collection('users')
      .doc(this.props.email)
      .collection('followers')
      .doc()
      .set(
        {
          email: email,
        },
        {
          merge: true,
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    const {navigation, followers, users} = this.props;
    var followersArr = [];
    if (this.props.followers) {
      this.props.followers.map(index => {
        let obj = this.props.followers.find(o => o.email === index.email);
        followersArr.push(obj.email);
      });
    }
    return (
      <Container>
        <Header style={styles.topMargin}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" style={{color: '#4286f4'}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color: '#121212'}}>People You may Know</Title>
          </Body>
        </Header>
        <Content style={{backgroundColor: 'white'}}>
          {/* {this.props.fetchingTweets ? (
            <View
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Spinner color="blue" />
            </View>
          ) : ( */}
          <View style={{justifyContent: 'flex-start'}}>
            <FlatList
              data={this.props.users}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => (
                <View style={styles.tweet}>
                  <TouchableHighlight
                    // onPress={() => navigation.navigate('ProfileScreen')}
                    underlayColor="white"
                    activeOpacity={0.75}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}
                    >
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <Thumbnail
                          source={{
                            uri:
                              'https://facebook.github.io/react-native/docs/assets/favicon.png'
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start'
                          }}
                        >
                          <Text
                            style={{
                              paddingLeft: 15,
                              fontWeight: 'bold',
                              fontSize: 20
                            }}
                          >
                            {item.name}
                          </Text>

                          <Text
                            style={{
                              paddingLeft: 15,
                              color: '#aaa',
                              fontSize: 16
                            }}
                          >
                            {'@' + item.username}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          paddingTop: 5
                        }}
                      >
                        <Button
                          bordered={!followersArr.includes(item.email)}
                          rounded
                          disabled={followersArr.includes(item.email)}
                          primary
                          style={StyleSheet.flatten([
                            styles.headerButton,
                            {paddingLeft: 15, paddingTop: 5, paddingRight: 15}
                          ])}
                          onPress={() => this.addFollower(item.email)}
                        >
                          {followersArr.includes(item.email) ? (
                            <Text style={{color: 'white'}}>Following</Text>
                          ) : (
                            <Text style={{color: '#4286f4'}}>Follow</Text>
                          )}
                        </Button>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
            />
          </View>
        </Content>

        {/* <View tabLabel="Search">
          <Text>Search</Text>
        </View>
        <View tabLabel="Messages">
          <Text>Messages</Text>
        </View> */}
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    allUsers: users => dispatch(UserActions.allUsers(users)),
    allFollowers: followers => dispatch(UserActions.allFollowers(followers))
  };
}

function mapStateToProps(state) {
  return {
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
    email: state.user.email,
    name: state.user.name,
    username: state.user.username,
    users: state.user.users,
    followers: state.user.followers
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(FollowScreen);
