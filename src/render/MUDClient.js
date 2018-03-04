import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {submitUserInput, setMapPosition} from '../state/actions'
import MudOutputDecoder from './lib/MudOutputDecoder'
import UserInputBar from './UserInputBar'

class HistoryEntry extends Component {
  constructor(props) {
    super(props) 
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.id !== nextProps.entry.id) {
      return true
    } else {
      return false
    }
  }    
  render() {
    return (
      <li
        data-id={this.props.id}
        data-type={this.props.entry.type}
        dangerouslySetInnerHTML={createMarkup(this.props.entry)}
      ></li>        
    )
  }
}
function createMarkup(entry) {
  if (entry.type === 'MUD_OUTPUT_MSG') {
    return {__html: MudOutputDecoder.mudOutputToHtml(entry.data)}
  } else {
    return {__html: entry.data}
  }
}

class HistoryWindow extends Component {
  constructor(props) {
    super(props)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }
  componentDidUpdate() {
    this.$HistoryWindow.scrollTop = 99999999999
  }
  componentDidMount() {
    this.$HistoryWindow.scrollTop = 99999999999
  }
  shouldComponentUpdate(nextProps, nextState) {
    if( this.props.historyEntries !== nextProps.historyEntries ) {
      return true
    } else {
      return false
    }
  }  
  handleDoubleClick(event) {
    this.props.handleHistoryWindowDoubleClick()
  }
  render() {
    const entries = this.props.historyEntries
    const listEntries = entries.map( function(entry, i) {
      return (
        <HistoryEntry 
          key={entry.id}
          id={entry.id}
          entry={entry}
        />
      )
    } 

    )
    return (
      <ul className='HistoryWindow'
        ref={ (ul) => {this.$HistoryWindow = ul} }
        onDoubleClick={this.handleDoubleClick}
      >
        {listEntries}
      </ul> 
    )
  }
}

class MUDClient extends Component {
  constructor(props) {
    super(props)
    this.handleHistoryWindowDoubleClick = this.handleHistoryWindowDoubleClick.bind(this)
    this.handleUserInputSubmit = this.handleUserInputSubmit.bind(this)
    this.handleMapRoomDoubleClick = this.handleMapRoomDoubleClick.bind(this)
  }
  componentDidUpdate() {
    // console.log('MUDClient ... componentDidUpdate()')
  }
  handleHistoryWindowDoubleClick() {
    this.refs.$UserInputBar.selectInputText()
  }
  handleUserInputSubmit(value) {
    this.props.dispatch(submitUserInput( value ))
  }
  handleMapRoomDoubleClick(x, y) {
    // console.log('running handleMapRoomDoubleClick()')
    // this.props.dispatch(setMapPosition( x, y ))
  }
  render() {
    return (
      <div className='MUDClient'>
        <div className='leftColumn'>
          <HistoryWindow 
            historyEntries={this.props.historyEntries}
            handleHistoryWindowDoubleClick={this.handleHistoryWindowDoubleClick}
          />
          <UserInputBar
            ref="$UserInputBar"
            handleUserInputSubmit={this.handleUserInputSubmit}
          />
        </div>
      </div>
    )    
  }  
}

export default MUDClient