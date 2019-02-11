// NavigationService.js

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}
/**
 * All deep routing through the app across multiple navigators and actions.
 * For example:  NavigationService.deepNavigate(["Main", "ManageTab", StackActions.popToTop()]);
 * @param  {[type]} routes An array of route names or Action object.
 * @return {[type]}        undefined
 */
function deepNavigate(routes) {
  let head = null;
  let tail = null;
  for (const routeAction of routes) {
    let action = routeAction;
    if (typeof routeAction === 'string') {
      action = NavigationActions.navigate({
        routeName: routeAction,
        params: {},
        // action: NavigationActions.navigate({ routeName: 'SubProfileRoute' }),
      });
    }
    if (!head) {
      head = action;
      tail = head;
    } else {
      tail.action = action;
      tail = action;
    }
  }
  _navigator.dispatch(head);
  //
  // navigate("Signup", {});
  // _navigator.dispatch(NavigationActions.navigate({
  //   routeName: "Main",
  //   params: {},
  // }));
}

/**
 * continue to navigate with original navigation parameters inherited unless it is overwritten
 * @param  {[type]} navigation [description]
 * @param  {[type]} name       [description]
 * @param  {[type]} params     [description]
 * @return {[type]}            [description]
 */
function continueNavigate(navigation, name, params) {
  navigation.navigate(name, { ...navigation.state.params, ...params });
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  deepNavigate,
  continueNavigate,
};
