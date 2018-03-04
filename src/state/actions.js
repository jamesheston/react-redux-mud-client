import { v4 } from 'node-uuid' // all MSG action ids should be generated using `v4()`

export const addAlias = (aliasObject) => {
  return {
    type: 'ADD_ALIAS',
    alias: aliasObject
  }
}

export const removeAlias = (conditionString) => {
  return {
    type: 'REMOVE_ALIAS',
    condition: conditionString
  }
}

export const addTrigger = (triggerObject) => {
  return {
    type: 'ADD_TRIGGER',
    trigger: triggerObject
  }
}

export const removeTrigger = (conditionString) => {
  return {
    type: 'REMOVE_TRIGGER',
    condition: conditionString
  }
}

export const submitUserInput = (data) => {
  return {
    type: 'USER_INPUT_MSG',
    id: v4(),
    data
  }
}
export const writeToMudServer = (data) => {
  return {
    type: 'MUD_WRITE_MSG',
    id: v4(),
    data
  }
}
export const writeAppMessage = (data) => {
  return {
    type: 'APP_MSG',
    id: v4(),
    data
  }
}
export const writeClientMessage = (data) => {
  return {
    type: 'APP_MSG',
    id: v4(),
    data: '[CLIENT]: ' + data
  }
}

export const runClearCommand = (data) => {
  return {
    type: 'RUN_CLEAR_COMMAND'
  }
}

