import React, {Component} from 'react';
import Modal from 'react-native-modalbox';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Platform,
  Alert
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
  FooterTab,
  Input,
  Right
} from 'native-base';
import UserActions from '../reducers/userstore';
import _ from 'lodash';
import moment from 'moment';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

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
    height: 100,
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
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTweetContent: '',
      openModal: false
    };
  }

  componentDidMount() {
    var tweets = [];
    firebase
      .firestore()
      .collection('users')
      .doc(this.props.email)
      .collection('followers')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          firebase
            .firestore()
            .collection('users')
            .doc(doc.data().email)
            .collection('tweets')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(tweet => {
                console.log('lppo', tweet.data());
                tweets.push(tweet.data());
                orderedTweets = _.sortBy(tweets, function(o) {
                  return new moment(o.time);
                }).reverse();
                console.log('ordered', orderedTweets);
                this.props.feedTweets(orderedTweets);
              });
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => console.log(err));

    firebase
      .firestore()
      .collection('users')
      .doc(this.props.email)
      .get()
      .then(querySnapshot => {
        this.props.loadUser(
          querySnapshot.data().name,
          querySnapshot.data().username
        );
      });
  }

  openModal() {
    this.setState({openModal: true});
    // this.props.dispatch({ type: "NEW_TWEET_MODAL_OPEN" });
  }

  closeModal() {
    this.setState({openModal: false});
    // this.props.dispatch({ type: "NEW_TWEET_MODAL_CLOSE" });
  }

  postTweet() {
    this.closeModal();
    firebase
      .firestore()
      .collection('users')
      .doc(this.props.email)
      .collection('tweets')
      .doc()
      .set(
        {
          title: this.state.newTweetContent,
          time: new Date(),
          name: this.props.name,
          username: this.props.username
        },
        {
          merge: true
        }
      )
      .then(Alert.alert('Tweet Posted Successfully'))
      .catch(err => Alert.alert('Error', err));
    // this.props.dispatch({
    //   type: "POST_TWEET",
    //   payload: {
    //     user: this.props.user,
    //     tweetContent: this.state.newTweetContent
    //   }
    // });
  }

  _keyExtractor = (item, index) => item.id;

  profileClick() {
    this.props.navigation.navigate('Profile');
  }

  tweetDetails() {
    this.props.navigation.navigate('TweetDetails');
  }

  render() {
    const {navigation, feed} = this.props;
    return (
      <Container>
        <Header style={styles.topMargin}>
          <Left>
            <Button
              transparent
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Icon name="md-person" style={{color: '#4286f4'}} />
            </Button>
          </Left>
          <Body>
            <TouchableHighlight onPress={() => this.props.signOut(navigation)}>
              <Title style={{color: '#121212'}}>Home</Title>
            </TouchableHighlight>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => navigation.navigate('FollowScreen')}
            >
              <Icon name="md-add" style={{color: '#4286f4'}} />
            </Button>
            <Button transparent onPress={this.openModal.bind(this)}>
              <Icon name="md-create" style={{color: '#4286f4'}} />
            </Button>
          </Right>
        </Header>
        <Modal
          ref={'newTweetModal'}
          backdrop={true}
          style={styles.modal}
          isOpen={this.state.openModal}
          onClosed={this.closeModal.bind(this)}
        >
          <View
            style={{
              alignSelf: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              padding: 5,
              paddingRight: 10
            }}
          >
            <Button transparent onPress={this.closeModal.bind(this)}>
              <Icon name="close" style={{color: 'black', fontSize: 32}} />
            </Button>
            <View style={{flex: 1}} />
            <Thumbnail
              small
              source={{
                uri:
                  'https://i1.wallpaperscraft.ru/image/betmen_art_minimalizm_107658_300x240.jpg'
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%'
            }}
          >
            <Input
              style={{
                flex: 1,
                width: '100%',
                fontSize: 24,
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                textAlignVertical: 'top',
                margin: 5
              }}
              multiline
              placeholder="What's happening?"
              onChangeText={tweet => this.setState({newTweetContent: tweet})}
            />
          </View>
          <View style={styles.modalFooter}>
            <View style={{flex: 1}} />
            <Button
              rounded
              primary
              style={StyleSheet.flatten([
                styles.headerButton,
                {color: '#4286f4', paddingLeft: 15, paddingRight: 15}
              ])}
              onPress={() => this.postTweet()}
            >
              <Text style={{color: 'white'}}>Tweet</Text>
            </Button>
          </View>
        </Modal>
        <Content style={{backgroundColor: 'white'}}>
          {this.props.feed.length === 0 ? (
            <View
              contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  color: '#4286f4',
                  alignSelf: 'center',
                  padding: 25,
                  fontSize: 18
                }}
              >
                Your feed is empty
              </Text>
            </View>
          ) : (
            <View style={{justifyContent: 'flex-start'}}>
              <FlatList
                data={this.props.feed}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => (
                  <View style={styles.tweet}>
                    <TouchableHighlight
                      // onPress={this.profileClick.bind(this, item.user)}
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
                        <View>
                          <Text>
                            {moment(item.time).format('MMM D HH:mm')}
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                    <Text style={styles.tweetText}>{item.title}</Text>
                    <View style={styles.tweetFooter}>
                      <View style={styles.footerIcons}>
                        <Button
                          transparent
                          dark
                          // onPress={this._tweetDetails.bind(this, item)}
                        >
                          <Icon name="ios-chatboxes" />
                          <Text style={styles.badgeCount}>2</Text>
                        </Button>
                      </View>
                      <View style={styles.footerIcons}>
                        <Button transparent dark>
                          <Icon name="ios-repeat" />
                          <Text style={styles.badgeCount}>4</Text>
                        </Button>
                      </View>
                      <View style={styles.footerIcons}>
                        <Button transparent dark>
                          <Icon name="ios-heart" />
                          <Text style={styles.badgeCount}>8</Text>
                        </Button>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    login: (email, password, navigation) =>
      dispatch(UserActions.login(email, password, navigation)),
    feedTweets: tweets => dispatch(UserActions.feedTweets(tweets)),
    loadUser: (name, username) =>
      dispatch(UserActions.loadUser(name, username)),
    signOut: navigation => dispatch(UserActions.signOut(navigation))
  };
}

function mapStateToProps(state) {
  return {
    loading: state.user.loading,
    isLoggedIn: state.user.isLoggedIn,
    email: state.user.email,
    name: state.user.name,
    username: state.user.username,
    feed: state.user.feed
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(HomeScreen);
