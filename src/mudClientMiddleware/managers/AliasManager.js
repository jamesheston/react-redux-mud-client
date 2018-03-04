export class Alias {
  constructor(condition, response) {
    this.condition = condition
    this.response = response
  }
}

export default class AliasManager {
  constructor(store) {
    this.store = store
  }

  getResponses(commandStr) {
    var responses = []
    commandStr = commandStr.trim()

    const aliases = this.store.getState().aliases
    for (let i = 0; i < aliases.length; i++) {
      const alias = aliases[i]
      // if a matching alias exists
      if ( alias.condition === commandStr ) {
        if( alias.response.constructor === Array ) {
          responses = responses.concat( alias.response )
        } else if ( typeof(alias.response) === 'string' ) {
          responses.push( alias.response )
        } else if ( typeof(alias.response) === 'function' ) {
          responses.push( alias.response )
        }
        return responses // since every# alias condition should be unique, we should exit for loop upon finding a match 
      }
    }
    
    // if no matches found, return false
    return false
  }
}