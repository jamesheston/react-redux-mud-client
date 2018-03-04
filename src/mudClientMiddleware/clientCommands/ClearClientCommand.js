/*
So, at this point, I'm thinking...
#CLEAR command does the following:
- sets triggers back to userConfig file values
- sets aliases back to userConfig file values
*/

import { writeClientMessage, runClearCommand } from '../../state/actions'

export default class ClearClientCommand {
  constructor(store) {
    this.store = store
  }
  run() {
    this.store.dispatch(runClearCommand())
  }
}