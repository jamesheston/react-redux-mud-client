import { writeClientMessage, addTrigger, removeTrigger } from '../../state/actions'
import { Trigger } from '../managers/TriggerManager'
 
 export default class TriggerClientCommand {
  constructor(store) {
    this.store = store
  }

  handleUserInput(commandString, action) {
    // "subcommands" to handle:
    // 1. add trigger pattern: '#trigger {test} {blah blah}' OR '#trigger test blah blah blah' 
    // 2. check single trigger pattern: '#trigger test' 
    // 3. delete trigger pattern '#untrigger test'
    // 4. print all triggers '#trigger'

    var printAllTriggersPattern = /^(#t|#tr|#tri|#trig|#trigg|#trigge|#trigger)$/ // '#trigger' with no args
    var addTriggerPattern = /^(#t|#tr|#tri|#trig|#trigg|#trigge|#trigger) \{([^\}]+)\} \{([^\}]+)\}/ // '#trigger' with 2 args
    var checkSingleTriggerPattern = /(#t|#tr|#tri|#trig|#trigg|#trigge|#trigger) ([a-zA-Z0-9]+) ([a-zA-Z0-9]+)$/ // '#trigger' with 1 arg
    var removeTriggerPattern = /^(#unt|#untr|#untri|#untrig|#untrigg|#untrigge|#untrigger) \{([^\}]+)\}/   // '#untrigger' with 1 arg

    if (printAllTriggersPattern.test(commandString.trim())) { // trim has good nuanced effect here
      this.printTriggers()

    } else if (addTriggerPattern.test(commandString.trim())) {
      this.addTrigger(commandString, action, addTriggerPattern)

    } else if (checkSingleTriggerPattern.test(commandString)) {
      this.addTrigger(commandString, action)

    } else if (removeTriggerPattern.test(commandString)) {
      this.removeTrigger(commandString, removeTriggerPattern)
    
    } else { // print error, no correct subpattern above matched
      this.store.dispatch( writeClientMessage('Invalid trigger command input.'))
    }    
  }
  printTriggers() {
    let markup = ''
    let triggerObjs = this.store.getState().triggers

    if ( triggerObjs.length === 0 ) {
      markup = 'You have no triggers defined.\n'
    } else {
      markup+= `You have ${triggerObjs.length} trigger(es) defined.\n`
      for (let i = 0; i < triggerObjs.length; i++) {
        const triggerObj = triggerObjs[i]
        const lineStr = '#TRIGGER {' + triggerObj.condition + '} {' + JSON.stringify(triggerObj.response) + 
        '}\n'
        markup+= lineStr
      }      
    }
    this.store.dispatch( writeClientMessage(markup) )
  }
  addTrigger(commandString, action, addTriggerPattern) {
    const conditionString = addTriggerPattern.exec(commandString)[2]
    const responseString = addTriggerPattern.exec(commandString)[3]
    const trigger = new Trigger(conditionString, responseString)
    this.store.dispatch( writeClientMessage(
      `Adding new trigger: {${conditionString}} {${responseString}}`
    ))
    this.store.dispatch( addTrigger(trigger) )
  }
  removeTrigger(commandString, removeTriggerPattern) {
    const conditionString = removeTriggerPattern.exec(commandString)[2]
    this.store.dispatch( writeClientMessage(
      `Removing trigger: ${conditionString}`
    ))
    this.store.dispatch( removeTrigger(conditionString) )    
  }
  checkSingleTrigger() {

  }
 }
