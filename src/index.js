// 3rd-party
import React from 'react'
import {connect, Provider} from 'react-redux'
import ReactDOM, {render} from 'react-dom'
// custom
import serverConfig   from './config/serverConfig.json'
import { userConfig } from './config/userConfig'
import configureStore from './state/configureStore'
import MUDClient from './render/MUDClient'
// styles
import './render/styles/reset.css'
import './render/styles/MUDClient.css'
import './render/styles/ANSIColors.css'

let store = configureStore()
// I'm dispatching init here to pass the store down to my mudClientMiddleware 
// Managers' constructors
store.dispatch({type:'INIT_CLIENT_MIDDLEWARE'})

const mapStateToMudClientProps = (state) => ({
  historyEntries: state.historyEntries,
  aliases: state.aliases,
  triggers: state.triggers
  // expand state here...
})

let App = connect(mapStateToMudClientProps, null)(MUDClient)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)