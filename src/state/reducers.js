import {combineReducers} from 'redux'
import {userConfig} from '../config/userConfig'

const historyEntries = (state = [], action) => {
  if (action.type==='APP_MSG' || action.type==='MUD_OUTPUT_MSG' || action.type==='USER_INPUT_MSG' || action.type==='DEBUG_MSG') {
    const nState = [...state, {
      type: action.type,
      id:  action.id,
      data: action.data
    }]
    // limit historyEntries size to keep DOM from exploding
    const maxLen = 300
    const truncatedState = nState.slice(-maxLen)
    return truncatedState
  } else {
    return state
  }  
}

const aliases = (state = [], action) => {
  switch(action.type) {
    case 'ADD_ALIAS': // add and edit are the same
      // in case alias already exists, filter first
      let nextState = state.filter( alias => alias.condition !== action.alias.condition )
      // now add new alias
      nextState.push(action.alias)
      return nextState
    case 'REMOVE_ALIAS': 
      return state.filter( alias => alias.condition !== action.condition )
    // #CLEAR command resets values to default, which, atm, is userConfig 
    case 'RUN_CLEAR_COMMAND':
      return [...userConfig.aliases]
    default: 
      return state
  }
}

const triggers = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TRIGGER': // add and edit are the same
      // in case trigger already exists, filter first
      let nextState = state.filter( trigger => trigger.condition !== action.trigger.condition )
      // now add new trigger
      nextState.push(action.trigger)
      return nextState
    case 'REMOVE_TRIGGER': // filter
      return state.filter( trigger => trigger.condition !== action.condition )
    case 'RUN_CLEAR_COMMAND':
      return [...userConfig.triggers]
    default:
      return state
  }
}



const mudClientApp = combineReducers({
  historyEntries,
  aliases,
  triggers,
})

export default mudClientApp

