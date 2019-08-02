import React, {useState} from 'react';
import logo from './assets/Logo.png'
import './App.css';
import Button from 'react-bootstrap/Button'
import { WithContext as ReactTags } from 'react-tag-input';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import NewsCard from './components/NewsCard'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const data = [
    {name: 'Jan', DB: 400, JPM: 600, TES: 200},
    {name: 'Feb', DB: 300, JPM: 200, TES: 300},
    {name: 'Mar', DB: 300, JPM: 300, TES: 350},
    {name: 'Apr', DB: 200, JPM: 400, TES: 250},
    {name: 'May', DB: 278, JPM: 800, TES: 150},
    {name: 'Jun', DB: 400, JPM: 600, TES: 200},
    {name: 'Jul', DB: 300, JPM: 200, TES: 300},
    {name: 'Aug', DB: 300, JPM: 300, TES: 350},
    {name: 'Sept', DB: 200, JPM: 400, TES: 250},
    {name: 'Oct', DB: 278, JPM: 800, TES: 150},
    {name: 'Nov', DB: 200, JPM: 400, TES: 250},
    {name: 'Dec', DB: 278, JPM: 800, TES: 150}
];

const articleQuantdata = [
    {name: 'Week 1', quant: 100},
    {name: 'Week 2', quant: 150},
    {name: 'Week 3', quant: 80},
    {name: 'Week 4', quant: 50},
    {name: 'Week 5', quant: 300},
    {name: 'Week 1', quant: 100},
    {name: 'Week 2', quant: 150},
    {name: 'Week 3', quant: 80},
    {name: 'Week 4', quant: 50},
    {name: 'Week 5', quant: 300},
    {name: 'Week 4', quant: 50},
    {name: 'Week 5', quant: 300}

];

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
                { id: 'DB', text: 'Deutsche Bank', color:'#15598A'}
             ],
            suggestions: [
                { id: 'DB', text: 'Deutsche Bank', color:'#15598A'},
                { id: 'JPM', text: 'JP Morgan', color:'#4E342E'},
                { id: 'TES', text: 'Tesla', color:'#e82127'}
             ],
             newsData: [
                {title:'Title 1', subtitle:'This is a subtitle', text:'<p className="senti-green">The banks were accused of manipulating futures markets in precious metals through a process known as "spoofing," the US Justice Department and Commodity Futures Trading Commission (CFTC) announced</p>', link:'www.google.com'},
                {title:'Title 2', subtitle:'This is a subtitle', text:'Some quick example text to build on the card title and make up the bulk of the cards content', link:'www.google.com'},
                {title:'Title 3', subtitle:'This is a subtitle', text:'Some quick example text to build on the card title and make up the bulk of the cards content', link:'www.google.com'},
                {title:'Title 4', subtitle:'This is a subtitle', text:'Some quick example text to build on the card title and make up the bulk of the cards content', link:'www.google.com'},
                {title:'Title 5', subtitle:'This is a subtitle', text:'Some quick example text to build on the card title and make up the bulk of the cards content', link:'www.google.com'}
            ],
            showModal: false
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
        const { tags, suggestions, newsData, showModal } = this.state;

        //Set Company IDs
        const companyIds = [];
        tags.forEach((tag) => {
            companyIds.push([tag.id, tag.color]);
        });

        //Set the Years filter
        const filterYears = [];
        const setYearsFilter = (currentYear) => {
            let i = 0;
            while(i<8){
                filterYears.push(currentYear--);
                i++;
            }
        }
        setYearsFilter(new Date().getFullYear());

        return (
            <div className="App">
                <div className="Navbar">
                    <nav>
                        <div className="nav-wrapper">
                        {/* <a href={logo} class="brand-logo">Logo</a> */}
                        <img src={logo} className="App-logo" alt="logo" />
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Button className="App-Button" variant="primary">Log Out</Button></li>
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
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select">
                            {
                                filterYears.map((year) => {
                                    return (<option>{year}</option>)
                                })
                            }
                            </Form.Control>
                        </Form.Group>
                    </Form>

                </div>
                <div className="results-body">
                    <div className="graph-view">
                        <LineChart width={850} height={450} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Legend />
                            {
                                companyIds.map((company) => {
                                    return (<Line type='monotone' dataKey={`${company[0]}`} stroke={`${company[1]}`}/>)
                                })
                            }
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </div>
                    <div className="news-view">
                        <h4>{newsData.length} articles parsed</h4>
                        {
                            newsData.map((news, index) => {
                                if(index<2){
                                    return (<NewsCard 
                                        title={`${news.title}`}
                                        subtitle={`${news.subtitle}`}
                                        text={`${news.text}`}
                                        link={`${news.link}`}
                                    />)
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
};

export default App;
