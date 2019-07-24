import React, {useState} from 'react';
import logo from './assets/Logo.png'
import './App.css';
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

function App() {

  let companies = [];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>We are Senti, literally.</h1>
        <h2>Let's begin by choosing one or more companies to compare</h2>
    
        <DropdownButton variant = "info" id="dropdown-variants-info" key="info" title="Add Company">
            <Dropdown.Item onSelect="addCompany();" href="#/action-1">Deutsche Bank</Dropdown.Item>
            <Dropdown.Item onSelect="addCompany();" href="#/action-2">JP Morgan</Dropdown.Item>
            <Dropdown.Item onSelect="addCompany();" href="#/action-3">UBS</Dropdown.Item>
            <Dropdown.Item onSelect="addCompany();" href="#/action-2">Citi</Dropdown.Item>
            <Dropdown.Item onSelect="addCompany();" href="#/action-3">Goldman Sachs</Dropdown.Item>
        </DropdownButton>

        <div className="Buttons-container">
            <Button variant="primary">Dashboard</Button>
            <Button variant="secondary">Compare</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
