import React, {useState, useEffect} from 'react';
import logo from './assets/Logo.png'
import './App.css';
import Button from 'react-bootstrap/Button'
import { WithContext as ReactTags } from 'react-tag-input';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import NewsCard from './components/NewsCard'
import Form from 'react-bootstrap/Form'
import { Modal } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import axios from 'axios';

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

//Set the Years filter
const yearsFilter = [];
const setYearsFilter = (currentYear) => {
    let i = 0;
    while(i<8){
        yearsFilter.push(currentYear--);
        i++;
    }
}
setYearsFilter(new Date().getFullYear());

const App = () => {

    const [data, setData] = useState([]);

    const [tags, setTags] = useState([
        { id: 'DB', text: 'Deutsche Bank', color:'#15598A'}
    ]);

    const [suggestions, setSuggestions] = useState([
        { id: 'DB', text: 'Deutsche Bank', color:'#15598A'},
        { id: 'JPM', text: 'JP Morgan', color:'#4E342E'},
        { id: 'TES', text: 'Tesla', color:'#e82127'},
        { id: 'SPO', text: 'Spotify', color:'#84bd00'}
    ]);

    const [newsData, setNewsData] = useState([
        {title:'Title 1', subtitle:'This is a subtitle', text:'<p className="senti-green">The banks were accused of manipulating futures markets in precious metals through a process known as "spoofing," the US Justice Department and Commodity Futures Trading Commission (CFTC) announced</p>', link:'www.google.com'},
        {title:'Title 2', subtitle:'This is a subtitle', text:'Some quick example text to build on the card title and make up the bulk of the cards content', link:'www.google.com'},
        {title:'Title 3', subtitle:'This is a subtitle', text:'Some quick example text to build on the card title and make up the bulk of the cards content', link:'www.google.com'},
        {title:'Title 4', subtitle:'This is a subtitle', text:'Some quick example text to build on the card title and make up the bulk of the cards content', link:'www.google.com'},
        {title:'Title 5', subtitle:'This is a subtitle', text:'Some quick example text to build on the card title and make up the bulk of the cards content', link:'www.google.com'}
    ]);

    const [lgShow, setLgShow] = useState(false);
    const [companyIds, updateCompanyIds] = useState(tags);
    const [filterYears, setFilterYear] = useState(yearsFilter);
    const [selectedNews, updateSelectedNews] = useState(null);

    //GET SCORES DATA FROM SERVER
    const fetchData = async (selectedYear) => {
        const result = await axios(
            'http://52.17.50.92/api/getScores/'+selectedYear,
        );
    
        setData(result.data);
    };

    const handleDelete = (i) => {
        setTags(tags => 
            (tags.filter((tag, index) => index !== i))
        );
    }
 
    const handleAddition = (tag) => {
        setTags(tags => ([...tags, tag]));
    }


    const handleDrag = (tag, currPos, newPos) => {

        const newTags = [...tags].slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        setTags(newTags);
    }

    const handleYearSelect = (e) => {
        fetchData(e.target.value);
    }

    useEffect(() => {
        updateCompanyIds(tags);
    });

    useEffect(() => {
        fetchData(filterYears[0]);
    }, []);

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
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        delimiters={delimiters}
                />
                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Control as="select" defaultValue={filterYears[0]} onChange={handleYearSelect}>
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
                                return (<Line type='monotone' dataKey={`${company.id}`} stroke={`${company.color}`}/>)
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
                                    postId={index}
                                    title={`${news.title}`}
                                    subtitle={`${news.subtitle}`}
                                    text={`${news.text}`}
                                    link={`${news.link}`}
                                    setLgShow={setLgShow}
                                    lgShow={lgShow}
                                    updateSelectedNews={updateSelectedNews}
                                />)
                            }
                        })
                    }
                </div>
            </div>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => {
                    setLgShow(false);
                    updateSelectedNews(null);
                }}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {newsData[selectedNews]?newsData[selectedNews].title:" "}
                    </Modal.Title>
                </Modal.Header>
                {renderHTML(newsData[selectedNews]?newsData[selectedNews].text:" ")}
            </Modal>
        </div>
    );
};

export default App;
