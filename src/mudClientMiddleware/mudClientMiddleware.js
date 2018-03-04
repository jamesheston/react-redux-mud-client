/*
mudClientMiddleware in our app is roughly equivalent to a game engine
loop in a typical videogame. However, instead of the engine being driven by 
a timer, the MUD Client engine is driven by incoming websockets data events 
from the remote MUD server or the user's browser input.
*/

import { writeToMudServer } from '../state/actions'
import ClientCommandManager from './managers/ClientCommandManager'
import AliasManager from './managers/AliasManager'
import TriggerManager from './managers/TriggerManager'
  
/* 
Managers are substantial modules responsible for at least:
1. passing data events like user input or MUD server output 
  from mudClientMiddleware off to whatever function might
  dispatch actions or generate side effects in response to
  that data
2. managing primary responsibilities and side effects related to
  that manager's concept. For example, if the AliasManager and the
  AliasClientCommand start having a lot of similiar code, keep the
  logic in AliasManager, trim the redundant code out of 
  AliasClientCommand, and add methods which AliasClientCommand
  can access (getters, maybe setters) EVENTUALLY. For now let's 
  just get things working again.
*/
let clientCommandManager // just passes incoming data to command modules
let aliasManager // holds logic for generating alias responses based on user input
let triggerManager // 


export const mudClientMiddleware = store => next => action => {
  // pass incoming messages from the stream down to handlers
  if (action.type === 'USER_INPUT_MSG') {
    handleUserInput(action, store)
  } else if (action.type === 'MUD_OUTPUT_MSG') {
    handleMudOutput(action, store)  

  // give managers access to the store during init 
  } else if (action.type === 'INIT_CLIENT_MIDDLEWARE') {
    clientCommandManager = new ClientCommandManager(store)
    triggerManager = new TriggerManager(store)
    aliasManager = new AliasManager(store)
  }
  next(action)
}



// "the flying v"
// the structure below is a pretty good balance
// between speed and flexibility, while not the prettiest
function handleUserInput(action, store) {
  const userInputString = action.data
  // split original submitted user input string into array of substrings
  // by ';'. this allows user to sequentially stack multiple 'commands' 
  // using the semicolon character
  const commands = userInputString.split(';')  

  // for every user substring 'command'. 
  // if no semicolons, this will be an array of len 1
  for( let i = 0; i < commands.length; i++ ) {
    let commandString = commands[i]
    let responses = []

    // for each substring command, we build a list of responses to be 
    // executed by the client. If there is an alias match, responses
    // can have length 1-x
    responses = aliasManager.getResponses( commandString )

    // if no alias matches were found, responses should have length of 1
    // b/c  we're just reflecting ith user substring 'command'  
    if(! responses) {
      responses = [commandString]
    }

    // for every aggregated response to current (i) user 'command' substring
    for (let j = 0; j < responses.length; j++) {
      let response = responses[j]

      if( typeof(response) === 'string' ) {
        // first, check if string is a Client Command, like #alias, #trigger 
        // for performance, any string whose first character is '#' is handled by 
        // the ClientCommands module
        const looksLikeClientCommand = (response[0] === '#' ) ? true : false
        if( looksLikeClientCommand ) {
          clientCommandManager.handleUserInput(response, action)
        } else {
          // if response string isn't a ClientCommand, write it as user input
          // to the MUD server
          console.log(  'running store.dispatch( writeToMudServer() )' )
          store.dispatch( writeToMudServer(response) )      
        }
      // if response is a callback function, run it
      } else if( typeof(response) === 'function' ) {
        response(response, action, store)

      // no handler found for response  
      } else {
        // could not process response. throw an error
      }
    }
  }
}

function handleMudOutput(action) {
  triggerManager.handleMudOutput(action)
}