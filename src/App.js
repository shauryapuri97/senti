import React, {useState} from 'react';
import logo from './assets/Logo.png'
import './App.css';
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class App extends React.Component {
    constructor(props) {
        super(props);
 
        this.state = {
            tags: [
                { id: 'DeutscheBank', text: 'Deutsche Bank' }
             ],
            suggestions: [
                { id: 'DeutscheBank', text: 'Deutsche Bank' },
                { id: 'JPMorgan', text: 'JP Morgan' },
                { id: 'Tesla', text: 'Tesla' }
             ]
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }
 
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }
    render() {
        const { tags, suggestions } = this.state;
        return (
            <div className="App">
                <div className="Navbar">
                    <nav>
                        <div class="nav-wrapper">
                        {/* <a href={logo} class="brand-logo">Logo</a> */}
                        <img src={logo} className="App-logo" alt="logo" />
                        <ul id="nav-mobile" class="right hide-on-med-and-down">
                            <li><Button variant="primary">Dashboard</Button></li>
                            <li><Button variant="secondary">Compare</Button></li>
                        </ul>
                        </div>
                    </nav>
                </div>
                <div className="filters">
                    <ReactTags tags={tags}
                            suggestions={suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            delimiters={delimiters}
                    />
                </div>
                <div className="results-body">
                </div>
            </div>
        )
    }
};

export default App;
