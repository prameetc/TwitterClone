import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Animated
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
  Button,
  Spinner
} from 'native-base';
import moment from 'moment';
import _ from 'lodash';
import firebase from 'react-native-firebase';
import UserActions from '../reducers/userstore';
import {connect} from 'react-redux';
// import { fetchTweets } from "../actions/tweetsActions";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  avatarbg: {
    //marginTop: -95,
    marginLeft: 20,
    padding: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 12
    // borderRadius: 180
  },
  avatar: {
    marginLeft: 26,
    marginTop: -95,
    width: 89,
    height: 89,
    borderRadius: 44,
    zIndex: 12
  },
  headerButton: {
    // alignSelf: "flex-end",
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 3,
    paddingTop: 3,
    marginRight: 8
  },
  nameText: {
    fontSize: 26,
    fontWeight: '500',
    marginLeft: 14
  },
  usernameText: {
    color: '#777',
    fontSize: 16,
    marginLeft: 14
  },
  bioText: {
    fontSize: 16,
    marginLeft: 14,
    marginTop: 10,
    maxHeight: 41
  },
  locationText: {
    fontSize: 16,
    marginLeft: 14,
    marginTop: 10,
    color: '#555'
  },
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
    fontSize: 18,
    padding: 10,
    color: '#555'
  },
  tweetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

// @connect(store => {
//   return {
//     userTweets: store.tweets.userTweets,
//     fetchingUserTweets: store.tweets.fetchingUserTweets,
//     fetchedUserTweets: store.tweets.fetchedUserTweets,
//     errorTweets: store.tweets.error,
//     username: store.login.username
//   };
// })
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {scrollY: new Animated.Value(0), tweets: {}};
  }

  componentWillMount() {
    var tweets = [];
    firebase
      .firestore()
      .collection('users')
      .doc(this.props.email)
      .collection('tweets')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tweets.push(doc.data());
          orderedTweets = _.sortBy(tweets, function(o) {
            return new moment(o.time);
          }).reverse();
          this.props.userTweets(orderedTweets);
        });
      })
      .catch(err => console.log(err));
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    var headMov = this.state.scrollY.interpolate({
      inputRange: [0, 390, 391],
      outputRange: [0, -390, -390]
    });
    var coverMov = this.state.scrollY.interpolate({
      inputRange: [0, 94, 95],
      outputRange: [0, -94, -94]
    });
    var avatarMov = this.state.scrollY.interpolate({
      inputRange: [0, 150, 151],
      outputRange: [0, -150, -150]
    });
    var avatarOp = this.state.scrollY.interpolate({
      inputRange: [0, 94, 95],
      outputRange: [1, 0, 0]
    });
    var headerOp = this.state.scrollY.interpolate({
      inputRange: [95, 180, 181],
      outputRange: [0, 0.75, 0.75]
    });
    var headerContentOp = this.state.scrollY.interpolate({
      inputRange: [0, 180, 210],
      outputRange: [0, 0, 1]
    });
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <Animated.Image
          source={{
            uri: 'https://pbs.twimg.com/media/BduTxWnIUAAKT_5.jpg'
          }}
          style={{
            marginTop: 10,
            width: '100%',
            height: 150,
            zIndex: 2,
            position: 'absolute',
            transform: [{translateY: coverMov}]
          }}
        />
        <Animated.View
          style={{
            width: '100%',
            position: 'absolute',
            backgroundColor: '#121212',
            height: 56,
            zIndex: 13,
            opacity: headerOp,
            paddingTop: 10,
            alignItems: 'center'
          }}
        >
          <Animated.View
            style={{
              opacity: headerContentOp,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Button iconLeft light onPress={this._goBack.bind(this)}>
              <Icon name="arrow-back" />
            </Button>
            <Text style={{fontSize: 24, color: 'white', flex: 1}}>Prameet</Text>
            <Button transparent iconRight light>
              <Icon name="md-more" />
            </Button>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={{
            zIndex: 4,
            position: 'absolute',
            top: 135,
            opacity: avatarOp,
            transform: [{translateY: avatarMov}]
          }}
        >
          <Thumbnail
            large
            source={{
              uri: 'https://pbs.twimg.com/media/BduTxWnIUAAKT_5.jpg'
            }}
            style={styles.avatarbg}
          />
          <Thumbnail
            large
            source={{
              uri: 'https://pbs.twimg.com/media/BduTxWnIUAAKT_5.jpg'
            }}
            style={styles.avatar}
          />
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this.state.scrollY}}
              }
            ],
            {
              useNativeDriver: true
            }
          )}
        >
          <View style={StyleSheet.flatten([styles.header, {marginTop: 150}])}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingTop: 5
              }}
            >
              {/* <Button
                bordered
                rounded
                primary
                style={StyleSheet.flatten([
                  styles.headerButton,
                  {paddingLeft: 15, paddingTop: 5, paddingRight: 15}
                ])}
              >
                <Text style={{color: '#4286f4'}}>Follow</Text>
              </Button> */}
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.nameText}>{this.props.name}</Text>
            <Text style={styles.usernameText}>{'@' + this.props.username}</Text>
          </View>
          <View style={{backgroundColor: 'white', marginTop: 8}}>
            {this.props.tweets.length === 0 ? (
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
                  Your don't have any tweets
                </Text>
              </View>
            ) : (
              <FlatList
                data={this.props.tweets}
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
                                'https://pbs.twimg.com/media/BduTxWnIUAAKT_5.jpg'
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
                              {this.props.name}
                            </Text>

                            <Text
                              style={{
                                paddingLeft: 15,
                                color: '#aaa',
                                fontSize: 16
                              }}
                            >
                              {'@' + this.props.username}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text>{moment(item.time).format('MMM D HH:mm')}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                    <Text style={styles.tweetText}>{item.title}</Text>
                    <View style={styles.tweetFooter}>
                      <View style={styles.footerIcons}>
                        <Icon name="ios-chatboxes" />
                        <Text style={styles.badgeCount}>8</Text>
                      </View>
                      <View style={styles.footerIcons}>
                        <Icon name="ios-repeat" />
                        <Text style={styles.badgeCount}>12</Text>
                      </View>
                      <View style={styles.footerIcons}>
                        <Icon name="ios-heart" />
                        <Text style={styles.badgeCount}>10</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

function bindActions(dispatch) {
  return {
    userTweets: tweets => dispatch(UserActions.userTweets(tweets)),
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
    tweets: state.user.tweets
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(ProfileScreen);
