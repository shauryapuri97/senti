import React, {useState, useEffect} from 'react';
import logo from './assets/Logo.png'
import './App.css';
import Button from 'react-bootstrap/Button'
import { WithContext as ReactTags } from 'react-tag-input';
import { ComposedChart, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import NewsCard from './components/NewsCard'
import Form from 'react-bootstrap/Form'
import { Modal } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import axios from 'axios';
import AvgScoreCard from './components/AvgScoreCard'
import Toggle from 'react-bootstrap-toggle';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const apiKey = '64V2GZ0TDHT7A8XJ';
const delimiters = [KeyCodes.comma, KeyCodes.enter];

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

const App = () => {

    const [tags, setTags] = useState([
        { id: 'JPM', text: 'JP Morgan', color:'#4E342E', avgScore: 0.32}, //brown
    ]);

    const [suggestions, setSuggestions] = useState([
        { id: 'DB', text: 'Deutsche Bank', color:'#15598A', avgScore: 0.21}, //DBX
        { id: 'JPM', text: 'JP Morgan', color:'#4E342E', avgScore: 0.32}, //JPM
        { id: 'TES', text: 'Tesla', color:'#e82127', avgScore: 0.43}, //TSLA
        { id: 'SPO', text: 'Spotify', color:'#84bd00', avgScore: 0.57}, //SPOT
        { id: 'CS', text: 'Credit Suisse', color:'#2c3e50', avgScore: 0.66}, //CS
        { id: 'ASO', text: 'ASOS', color:'#ffbfcf', avgScore: 0.92}, //pink
        { id: 'ABC', text: 'Alphabet', color:'#f39c12', avgScore: -0.54}, //orange
        { id: 'AMZ', text: 'Amazon', color:'#f1c40f', avgScore: -0.25}, //yellow
        {id: 'MS', text: 'Morgan Stanley', color:'#7f8c8d', avgScore: -0.91}, //grey
        { id: 'FB', text: 'Facebook', color:'#4a69bd', avgScore: 0.22}, //navy blue
        { id: 'GMS', text: 'Goldman Sachs', color:'#f8c291', avgScore: 0.25}, //skin
        { id: 'BAR', text: 'Barclays', color:'#82ccdd', avgScore: 0.32}, //sky blue
    ]);

    const [selectedYear, setSelectedYear] = useState(filterYears[0]);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [data, setData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [lgShow, setLgShow] = useState(false);
    const [selectedNews, updateSelectedNews] = useState(null);
    const [newsView, setNewsView] = useState([]);
    const [toggle, setToggle] = useState(false);

    const fetchData = async (selectedYear) => {
        const result = await axios(
            'http://52.17.50.92/api/getScores/'+selectedYear,
        );
    
        setData(result.data);
    };

    const fetchNewsData = async (selectedYear) => {
        const result = await axios(
            'http://52.17.50.92/api/articles/'+selectedYear,
        );
    
        setNewsData(result.data);
    };

    const fetchStockData = async (symbol) => {
        const result = await axios(
            'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+symbol+'&apikey='+apiKey+'&datatype=json'
        );
        
        let sData = result.data['Monthly Time Series'];

        setStockData(sData);
    }
    //seperate useeffect for tags
    useEffect(()=>{
        fetchData(selectedYear);
        fetchNewsData(selectedYear);
    },[selectedYear]);

    useEffect(()=>{
        fetchStockData(tags[0].id);
        setTimeout(function() { togglePrep(); }, 2000);
    },[tags])

    
    useEffect(()=>{

        let arr = [];
        if(selectedMonth===null){
            if(selectedYear!==new Date().getFullYear()){
                newsData.forEach(news=>{
                    if(12 === news.month){
                        arr.push(news);
                    }
                });
            } else {
                newsData.forEach(news=>{
                    if(new Date().getMonth()+1 === news.month){
                        arr.push(news);
                    }
                });
            }
            
        } else {
            newsData.forEach(news=>{
                if((selectedMonth === news.month)){
                    arr.push(news);
                }
            });
        }

        setNewsView(arr);
    },[newsData, selectedYear, selectedMonth, tags])

    const togglePrep = () => {
        
        const keyName = tags[0].id+'StockPrice';
        data.forEach((monthData,index)=>{
            if (index===0){
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf([selectedYear-1]+'-12')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);

            } else if (index===1) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-01')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);

            } else if (index===2) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-02')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            } else if (index===3) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-03')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            } else if (index===4) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-04')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            } else if (index===5) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-05')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            } else if (index===6) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-06')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            } else if (index===7) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-07')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            } else if (index===8) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-08')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            } else if (index===9) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-09')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            } else if (index===10) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-10')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            } else if (index===11) {
                const sdata = Object.keys(stockData)
                    .filter(key => key.toString().indexOf(selectedYear+'-11')!==-1)
                    .reduce((obj,key)=>{
                        obj[key] = stockData[key];
                        return obj;
                    },{})

                    monthData[keyName] = parseInt(sdata[Object.keys(sdata)]['4. close'],10);
                
            }
        });
    }

    const onToggle = () => {
        if(toggle===false)
            togglePrep();
        setToggle(!toggle);
    }

    const handleDelete = (i) => {
        setTags(tags => 
            (tags.filter((tag, index) => index !== i))
        );
    }
 
    const handleAddition = (tag) => {
        setTags(tags => ([...tags, tag]));
        fetchStockData(tag.id);
    }


    const handleDrag = (tag, currPos, newPos) => {

        const newTags = [...tags].slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        setTags(newTags);
        if(toggle===true)
            setToggle(false);
    }

    const handleYearSelect = (e) => {
        setSelectedMonth(null);
        setSelectedYear(new Date(e.target.value).getFullYear());
        if(toggle===true)
            setToggle(false);
    }

    const handleNewsUpdate = (e) => {
        setSelectedMonth(e.activeTooltipIndex+1);
    }

    return (
        <div className="App">
            <div className="Navbar">
                <nav>
                    <div className="nav-wrapper">
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
                        <Form.Control as="select" defaultValue={selectedYear} onChange={handleYearSelect}>
                        {
                            filterYears.map((year) => {
                                return (<option>{year}</option>)
                            })
                        }
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Toggle
                    onClick={onToggle}
                    on={'Stock On'}
                    off={'Stock Off'}
                    size="xs"
                    offstyle="danger"
                    active={toggle}
                />

            </div>
            <div className="results-body">
                <div className="graph-view">
                    <h6 style={{ marginLeft:'55px' }}><strong>Average Senti Scores</strong></h6>
                    <div className="avg-company-view">
                        {
                            tags.map((company) => {
                                return (<AvgScoreCard
                                    company={company}
                                />)
                            })
                        }
                    </div>
                    <h6 style={{ marginLeft:'55px' }}><strong>Senti Scores Over Time</strong></h6>
                    <ComposedChart width={850} height={450} onClick={handleNewsUpdate} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Legend />
                        {
                            tags.map((company) => {
                                return (
                                    <Line yAxisId="left" type='monotone' dataKey={`${company.id}`} stroke={`${company.color}`}/>
                                )
                            })
                        }
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation='left' />
                        { 
                            toggle === true ? <YAxis yAxisId="right" orientation='right' /> : null
                        }
                        {
                            toggle === true ? <Line yAxisId="right" type='monotone' dataKey={[tags[0].id].toString()+'StockPrice'} stroke={`${tags[0].color}`} strokeDasharray="5 5"/> : null
                        }
                        <Tooltip />
                    </ComposedChart>
                </div>
                <div className="news-view">
                    <h6><strong>Most Recent Articles</strong></h6>
                    <div className='overflow-scrolling'>
                        {
                            tags.map(company=>{
                                return (newsView.map((news, index) => {
                                    if(company.id===news.company){
                                        return (<NewsCard
                                            url={news.url}
                                            companyID = {news.company}
                                            company = {company}
                                            title={`${news.title}`}
                                            text={`${news.body}`}
                                            HTMLtext={`${news.bodyHTML}`}
                                            link={`${news.link}`}
                                            setLgShow={setLgShow}
                                            lgShow={lgShow}
                                            updateSelectedNews={updateSelectedNews}
                                        />)
                                    }
                                }))
                            })
                        }
                    </div>
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
                {renderHTML(newsData[selectedNews]?newsData[selectedNews].HTMLtext:" ")}
            </Modal>
        </div>
    );
};

export default App;
