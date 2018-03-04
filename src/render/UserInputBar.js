import React, {Component, PropTypes} from 'react'

// Local Storage Functions
//------------------------
export const loadLocalStorage = (localStorageKey) => {
  try {
    const serializedState = localStorage.getItem(localStorageKey)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}
export const saveLocalStorage = (localStorageKey, state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(localStorageKey, serializedState)
  } catch (err) {
    // Ignore write errors.
  }
}


// In this UserInputBar component design, user input history
// state is stored within the component and NOT in the store.
// also, add autosave/load to localStorage
// DO NOT USE SET STATE for managing history data...
// using setState() tells React that Component needs to be rerendered
export default class UserInputBar extends Component {
  constructor(props) {
    super(props)
    // load component's internal state data from localstorage
    const localStorageState = loadLocalStorage('userInputBarState')

    this.state = {
      // value:   (localStorageState && localStorageState.value )  ? localStorageState.value   : '',
      history: (localStorageState && localStorageState.history) ? localStorageState.history : [],
      historyPointer: 0,
      // layout: (localStorageState && localStorageState.layout) ? localStorageState.layout : 'a'
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
  }
  componentDidMount() {
    // this.selectInputText()
    this.input.select()
    // let $e = document.querySelector('body')
    // $e.setAttribute('data-layout', this.state.layout)
  }
  componentDidUpdate() {
    // console.log('UserInputBar ... componentDidUpdate()')
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }
  handleKeyUp(event) {
    if (event.keyCode == 13) { // "Return" key
      this.props.handleUserInputSubmit(this.input.value)
      this.historyAddMessage(this.input.value)
      this.input.select()
    } else if (event.keyCode == 38) { // up arrow key
      // scroll back in user input history
      const msg = this.historyGetPrevMessage() 
      this.input.value = msg  
      this.input.select()   
    } else if (event.keyCode == 40) { // down arrow key
      // scroll foward in user input history
      const msg = this.historyGetNextMessage()      
      this.input.value = msg
    } else if (event.keyCode == 27) { // "Esc" key
      // set window to default view
      // this.changeWindowLayout()
    }
  }
  render() {
    return (
      <div className='UserInputBar'>
        <input type='text' 
          ref={ (input) => {this.input = input} }
          onKeyUp={this.handleKeyUp}
        />
      </div>
    )
  }
  selectInputText() {
    this.input.select()
  }  
  //---------------------------
  // User input history methods
  //---------------------------
  historyAddMessage(inputStr) {
    const historyMaxLen = 20
    let h = this.state.history.concat([inputStr])
    this.state.history = h.slice(-historyMaxLen)
    this.state.historyPointer = this.state.history.length - 1
    saveLocalStorage('userInputBarState', this.state)
  }
  historyGetPrevMessage() {
    let msg = ''
    let requestedIndex = this.state.historyPointer - 1
    // if requested index in range, replace input_bar text with previous entry in history
    if (requestedIndex >= 0 && requestedIndex <= this.state.history.length -1 ) {
      this.state.historyPointer = requestedIndex
      msg = this.state.history[requestedIndex]
    } // else do nothing
    return msg
  }
  historyGetNextMessage() {
    let msg = ''
    let requestedIndex = this.state.historyPointer + 1
    // if requested index in range, replace input_bar text with next entry in history
    if (requestedIndex  >= 0 && requestedIndex <= this.state.history.length -1) {
      this.state.historyPointer = requestedIndex
      msg = this.state.history[requestedIndex]    
    }  
    return msg
  }
  //---------------------
  // Change window layout
  //---------------------
  changeWindowLayout(layoutId) {
    var layouts = ['a', 'b', 'c']
    var lastLayout = this.state.layout
    var i = layouts.indexOf(lastLayout)
    var nextLayout
    i++

    if( i >= layouts.length ) {
      i = 0
    }
    nextLayout = layouts[i]
    this.state.layout = nextLayout
    saveLocalStorage('userInputBarState', this.state)
    // $('body').attr('data-layout', nextLayout)
    let $e = document.querySelector('body')
    $e.setAttribute('data-layout', nextLayout)
  }
}