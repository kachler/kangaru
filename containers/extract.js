import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import Connect from '../components/Connect';
import ExtractImport from '../components/ExtractImport';
import 'react-dropdown/style.css';
const remote = require('electron').remote;
const { dialog } = remote;

const DROPDOWN_OPTIONS = [
  'Import', 'Connect'
];
class Extract extends Component {     
  constructor(props) {
    super(props);
    this.state = {
      extractImport: false,
      extractConnect: false,
      dropdownValue: '',
      username: '',
      password: '',
      host: '',
      port: null,
      database: '',
      filePath: '',
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleHostChange = this.handleHostChange.bind(this);
    this.handlePortChange = this.handlePortChange.bind(this);
    this.handleDatabaseChange = this.handleDatabaseChange.bind(this);
    // this.handleFilePathChange = this.handleFilePathChange.bind(this);
    this.browseFiles = this.browseFiles.bind(this);
}

  handleDropdownChange(e) {
    if (e.value === 'Import') {
      this.setState({
        extractConnect: false,
        extractImport: true,
        dropdownValue: 'Import',
      });
    } else if (e.value === 'Connect') {
      this.setState({
        extractImport: false,
        extractConnect: true,
        dropdownValue: 'Connect',
      });
    }
    console.log('extractImport is ', this.state.extractImport)
    console.log('extractConnect is ', this.state.extractConnect)
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleHostChange(e) {
    this.setState({
      host: e.target.value,
    });
  }

  handlePortChange(e) {
    console.log('port is ', e.target.value);
    this.setState({
      port: e.target.value,
    });
  }

  handleDatabaseChange(e) {
    this.setState({
      database: e.target.value,
    });
  }

  browseFiles() {
    dialog.showOpenDialog({ 
      properties: ['openFile'] 
    },
    (file) => {
    //   console.log('file is ', file[0])
      this.setState({
        filePath: file[0],
      });
    //   console.log('filePath is ', this.state.filePath)
    });
  }

    
    // const { extractImport, extractConnect } = tprops;

  render() {
    const { extractImport, extractConnect, filePath, dropdownValue } = this.state;
    const importComp = extractImport ? 
      <ExtractImport
        //   handleFilePathChange = {this.handleFilePathChange}
          browseFiles = {this.browseFiles}
          filePath = {filePath}
          dropdownValue = {dropdownValue}
      />
      : null
    const connectComp = extractConnect ? 
      <Connect 
        handleUsernameChange = {this.handleUsernameChange}
        handlePasswordChange = {this.handlePasswordChange}
        handleHostChange = {this.handleHostChange}
        handlePortChange = {this.handlePortChange}
        handleDatabaseChange = {this.handleDatabaseChange}
        dropdownValue = {dropdownValue}
      />
      : null
    return (      
      <div>
        <h1>Extract</h1>
        <Dropdown
          options={DROPDOWN_OPTIONS} 
          onChange={this.handleDropdownChange} 
          placeholder="Select extraction method"
          value={dropdownValue}
        />
        {importComp}
        {connectComp}
      </div>
    );
  }
}

export default Extract;