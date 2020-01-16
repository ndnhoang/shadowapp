import { NavigationActions, DrawerActions, StackActions } from 'react-navigation'

let _navigator

function setTopLevelNavigator(r) {
  _navigator = r
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer())
}
function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer())
}

function back() {
  _navigator.dispatch(NavigationActions.back())
}

function pop() {
  _navigator.dispatch(StackActions.pop());
}

function resetTop(stackTop) {
  _navigator.dispatch(StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: stackTop })]
  }))
}

export default {
  navigate,
  setTopLevelNavigator,
  openDrawer,
  closeDrawer,
  back,
  pop,
  resetTop
}