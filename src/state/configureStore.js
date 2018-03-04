import { createStore, applyMiddleware } from 'redux'
import io from 'socket.io-client'
import createSocketIoMiddleware from 'redux-socket.io'
import throttle from 'lodash/throttle'

import { mudClientMiddleware } from '../mudClientMiddleware/mudClientMiddleware'
import mudClientApp from './reducers'
import { loadLocalState, saveLocalState } from './localStorage'
import { userConfig } from '../config/userConfig'
import serverConfig from '../config/serverConfig.json'




const configureStore = () => {
  // start websockets Middleware - pipes http requests between the remote MUD server 
  // and the user's browser in a data stream that JavaScript can use
  const localHostProxyAddress = 'http://localhost:' + serverConfig.websocketsPort // 3002
  let socket = io(localHostProxyAddress)
  let socketIoMiddleware = createSocketIoMiddleware(socket, 'MUD_WRITE_MSG')


  // Configure initial state by combining userConfig and localSaveState.
  // If localSaveState values exist, they should overwrite any state values from userConfig.
  // NOTE: Because of this clobbering of userConfig values, we must make
  // sure a '#clear' command is available to the user to delete all
  // aliases, triggers, vars, etc from local storage 
  let localSaveState = ( loadLocalState() ) ? loadLocalState() : {} 
  const initialState = {
    ...{
      aliases: userConfig.aliases, 
      triggers: userConfig.triggers,
    },
    ...localSaveState
  }


  const store = applyMiddleware(socketIoMiddleware, mudClientMiddleware)(createStore)(mudClientApp, initialState)

  // save state changes to local storage, but limit saving to once per second
  store.subscribe(throttle(() => {
    saveLocalState({
      historyEntries: store.getState().historyEntries,
      aliases: store.getState().aliases,
      triggers: store.getState().triggers
    })
  }, 1000))

  return store
}

export default configureStore