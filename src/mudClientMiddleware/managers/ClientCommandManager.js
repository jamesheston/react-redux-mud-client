import AliasClientCommand from '../clientCommands/AliasClientCommand'
import TriggerClientCommand from '../clientCommands/TriggerClientCommand'
import ClearClientCommand from '../clientCommands/ClearClientCommand'
import { writeClientMessage } from '../../state/actions'

export default class ClientCommandManager {
  constructor(store) {
    this.store = store
    this.aliasClientCommand = new AliasClientCommand(store)
    this.triggerClientCommand = new TriggerClientCommand(store)
    this.clearClientCommand = new ClearClientCommand(store)
  }
  handleUserInput(commandString, action) {
    // pass commandString+action off to appropriate submodule,
    // depending on which Command the 'commandString' value looks like
    if( false ) { // hurr durr for easy edits below
   
    // #ALIAS - shortmatching for '#alias' and '#unalias'
    } else if (commandString.indexOf('#a') === 0 || commandString.indexOf('#una') === 0) {
      this.aliasClientCommand.handleUserInput(commandString, action)

    // #TRIGGER - shortmatching for '#trigger' and '#untrigger'
    } else if (commandString.indexOf('#t') === 0 || commandString.indexOf('#unt') === 0) {
      this.triggerClientCommand.handleUserInput(commandString, action)

    // #CLEAR
    } else if (commandString.indexOf('#clear') === 0 ) {
      this.clearClientCommand.run()


    // no match
    } else {
      this.store.dispatch( writeClientMessage('Invalid command entry. No matching commands found.') )
    }

  }
}