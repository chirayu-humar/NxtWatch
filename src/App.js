import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import SpecialContext from './context/SpecialContext'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import SavedVideosRoute from './components/SavedVideosRoute'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedVideosList: []}

  changeTheMode = () => {
    this.setState(prevState => ({
      isDark: !prevState.isDark,
    }))
  }

  addToSavedVideos = object => {
    console.log(object)
  }

  removeFromSavedVideos = object => {
    console.log(object)
  }

  render() {
    const {isDark, savedVideosList} = this.state
    return (
      <SpecialContext.Provider
        value={{
          isDark,
          savedVideosList,
          changeTheMode: this.changeTheMode,
          addToSavedVideos: this.addToSavedVideos,
          removeFromSavedVideos: this.removeFromSavedVideos,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
        </Switch>
      </SpecialContext.Provider>
    )
  }
}

export default App
