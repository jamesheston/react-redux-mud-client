import { writeClientMessage, addAlias, removeAlias } from '../../state/actions'
import { Alias } from '../managers/AliasManager'



export default class AliasClientCommand {
  constructor(store) {
    this.store = store
  }

  handleUserInput(commandString, action) {
    // "subcommands" to handle:
    // 1. add alias pattern: '#alias test blah blah' 
    // 2. check for alias pattern: '#alias test' 
    // 3. delete alias pattern '#unalias test'
    // 4. print all aliases '#alias'

    var printAllAliasesPattern = /^(#a|#al|#ali|#alia|#alias)$/ // '#alias' with no args
    var addAliasPattern = /^(#a|#al|#ali|#alia|#alias) ([^ ]+) (.+)$/ // '#alias' with 2 args
    var checkSingleAliasPattern = /^(#a|#al|#ali|#alia|#alias) ([a-zA-Z0-9]+)$/ // '#alias' with 1 arg
    var removeAliasPattern = /^(#una|#unal|#unali|#unalia|#unalias) ([a-zA-Z0-9]+)$/   // '#unalias' with 1 arg

    if (printAllAliasesPattern.test(commandString.trim())) { // trim has good nuanced effect here
      this.printAliases()

    } else if (addAliasPattern.test(commandString.trim())) {
      this.addAlias(commandString, action, addAliasPattern)

    } else if (checkSingleAliasPattern.test(commandString)) {
      this.addAlias(commandString, action)

    } else if (removeAliasPattern.test(commandString)) {
      this.removeAlias(commandString, removeAliasPattern)
    
    } else { // print error, no correct subpattern above matched
      this.store.dispatch( writeClientMessage('Invalid alias command input.'))
    }
  }
  printAliases() {
    let markup = ''
    let aliasObjs = this.store.getState().aliases

    if ( aliasObjs.length === 0 ) {
      markup = 'You have no aliases defined.\n'
    } else {
      markup+= `You have ${aliasObjs.length} alias(es) defined.\n`
      for (let i = 0; i < aliasObjs.length; i++) {
        const aliasObj = aliasObjs[i]
        const lineStr = '#ALIAS {' + aliasObj.condition + '} {' + JSON.stringify(aliasObj.response) + 
        '}\n'
        markup+= lineStr
      }      
    }
    this.store.dispatch( writeClientMessage(markup) )
  }
  addAlias(commandString, action, addAliasPattern) {
    const conditionString = addAliasPattern.exec(commandString)[2]
    const responseString = addAliasPattern.exec(commandString)[3]
    const alias = new Alias(conditionString, responseString)
    this.store.dispatch( writeClientMessage(
      `Adding new alias: {${conditionString}} {${responseString}}`
    ))
    this.store.dispatch( addAlias(alias) )
  }  
  removeAlias(commandString, removeAliasPattern) {
    const conditionString = removeAliasPattern.exec(commandString)[2]
    this.store.dispatch( writeClientMessage(
      `Removing alias: ${conditionString}`
    ))
    this.store.dispatch( removeAlias(conditionString) )
  }
  checkSingleAlias() {
    console.log('inside checkSingleAlias()')
  }
}