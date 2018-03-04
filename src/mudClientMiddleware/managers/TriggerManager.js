export class Trigger {
  constructor(condition, response) {
    this.condition = condition
    this.response = response
  }
}

export default class TriggerManager {
  constructor(store) {
    this.store = store
  }

  // Inside the checkMudOutput() method is where dispatch should be called, if a trigger 
  // match was found. 
  handleMudOutput(action) {
    const mudOutput = action.data
    const store = this.store
    const triggers = this.store.getState().triggers

    // check every trigger's response prop to see if its a substring match for mudOutput string
    for (let i = 0; i < triggers.length; i++) {
      let trigger = triggers[i]

      // if a matching trigger is found, run its responses immediately
      if( mudOutput.indexOf(trigger.condition) !== -1) {
        if( typeof(trigger.response) === 'string' ) {
          // if r is string type, just write it to server
          store.dispatch(Object.assign(
            {}, {type:'MUD_WRITE_MSG', data:trigger.response}
          ))  
        } else if( typeof(trigger.response) === 'function' ) {
          // if r is callback function type, call it and pass action, store
          trigger.response(action, store)
        } else if( trigger.response.constructor === 'Array' ) {
          // if response in an array we loop thru it and process each subresponse 
          // as string or function, same as above
          for (let j = 0; j < trigger.response.length; j++) {
            let r = trigger.response[i]
            if( typeof(r) === 'string' ) {
              store.dispatch(Object.assign(
                {}, {type:'MUD_WRITE_MSG', data:r}
              ))               
            } else if( typeof(r) === 'function' ) {
              r(action, store)
            }
          }
        } else {
          // do nothing/throw error
        }        
      }
    }
  }// runOnMudOutput(){
}
