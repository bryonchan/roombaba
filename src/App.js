import React, { Component } from 'react';
import './App.css';
import RoomView from './components/RoomView';
import Settings from './components/Settings';
import {Tabs, Tab} from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import {setTabValue} from './actions';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import styled from 'styled-components';

const tabHeight = () => {
  const isSafari = !!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined" && !window.chrome;
  if(isSafari){
    return `height: calc(100vh - 112px);`  
  }  
  return `height: calc(100vh - 48px);`
}

const TabContent = styled.div`
  
  ${tabHeight()}
  /*height: 400px;*/
  /*min-height: 400px;*/
  display: flex;
  box-sizing: border-box;

`;

const mapStateToProps = ({tabs}) => {
    return {
      tabValue: tabs.value
    };
};

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      focusOnRoom: true
    }
  }

  componentWillMount() {
    injectTapEventPlugin();      
  }

  handleSettingsSave() {
    this.props.dispatch(setTabValue('vacuum'));
    this.setState({
      focusOnRoom: true
    });
  }

  handleTabChange(value){
    this.props.dispatch(setTabValue(value));
    this.setState({
      focusOnRoom: (value === 'vacuum')
    });

  }

  handleGithubClick(ev) {
    console.log('github')
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">

          <a className="githubLink" href="https://github.com/bryonchan/roombaba" target="_blank"><img src="/GitHub-Mark-32px.png"/></a>
          <Tabs value={this.props.tabValue} onChange={this.handleTabChange.bind(this)}>
            <Tab label="Roombaba" value="vacuum">
              <TabContent className="tab">
                <RoomView focus={this.state.focusOnRoom} />
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
