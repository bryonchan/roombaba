import React, { Component } from 'react';
import './App.css';
import RoomView from './components/RoomView';
import Settings from './components/Settings';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import {setTabValue, setTime} from './actions';
import styled from 'styled-components';
import {} from './actions';

// viewheight seems to be calculated differently on safari
const tabHeight = () => {
  const isSafari = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined" && !window.chrome;
  if(isSafari){
    return `height: calc(100vh - 112px);`  
  }  
  return `height: calc(100vh - 48px);`
}

const TabContent = styled.div`
  ${tabHeight()}
  min-height: 350px;
  display: flex;
  box-sizing: border-box;

`;

const mapStateToProps = ({tabs, room}) => {
    return {
      tabValue: tabs.value,
      time: room.time,
      dirt: room.dirt
    };
};

class App extends Component {
  constructor(props){
    super(props);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);

    this.state ={
      focusOnRoom: true
    }
  }

  componentWillMount() {
    injectTapEventPlugin();      
  }

  componentDidMount() {
      this.startTimer();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.dirt.length === 0 && this.timer){
      clearInterval(this.timer);
    }
  }

  handleSettingsSave() {
    this.props.dispatch(setTabValue('vacuum'));
    this.setState({
      focusOnRoom: true
    });
    this.resetTimer();
  }

  handleTabChange(value){
    this.props.dispatch(setTabValue(value));
    this.setState({
      focusOnRoom: (value === 'vacuum')
    });

  }

  handleRestart(){
    this.resetTimer();
  }

  startTimer(){
      this.props.dispatch(setTime(0));
    let time = 0;
      this.timer = setInterval(() => {
        time += 1000;
      this.props.dispatch(setTime(time));
    }, 1000);
  }

  resetTimer(){
    if(this.timer){
      clearInterval(this.timer);
      this.startTimer();
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <a className="githubLink" href="https://github.com/bryonchan/roombaba" target="_blank"><img alt="Github logo" src="/GitHub-Mark-32px.png"/></a>
          <Tabs value={this.props.tabValue} onChange={this.handleTabChange.bind(this)}>
            <Tab label="Roombaba" value="vacuum">
              <TabContent className="tab">
                <RoomView focus={this.state.focusOnRoom} onRestart={this.handleRestart.bind(this)} />
              </TabContent>
            </Tab>
            <Tab label="Settings" value="settings">
              <TabContent className="tab">
                <Settings onSave={this.handleSettingsSave.bind(this)} />
              </TabContent>
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(App);
