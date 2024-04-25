import React, { useRef, useState, useEffect, useMemo } from 'react';
import WaffleChart from './waffle_chart/WaffleChart.js';
import ProgressBar from './ProgressBar';
import BubbleChart from './bubble_chart/BubbleChart.js';
import TitleText from './TitleText';
import TextSection from './TextSection';
import ImageAnimation from './ImageAnimation';
import data from './texts.json';
import AlonsoTimeline from './AlonsoTimeline';
import processRaces from './bubble_chart/bubble_preprocess/accident_preprocess.js';
import './App.css';
import ParallaxText from './ParallaxText';
import { useInView } from 'framer-motion';
import Square from './Square.js';
import preprocessDrivers from './wafflechart_preprocess/waffle_preprocess.js';
import driversData from './wafflechart_preprocess/drivers.json';
import HeatMap from './heat_map/HeatMap.js';
import processResults from './heat_map/heatmap_preprocess/preprocessResult.js';
import circuit from './bubble_chart/bubble_preprocess/circuits.json';
import results from './bubble_chart/bubble_preprocess/results.json';
import races from './bubble_chart/bubble_preprocess/races.json';
import countriesByContinent from './bubble_chart/bubble_preprocess/country_by_continent.json';
import BubbleChartTimeline from './bubble_chart/timelineAdvancement.js';
import BubbleLegend from './bubble_chart/BubbleLegend.js';
import Barchart from './bar_chart/Barchart.js';
import barchartPreprocess from './barchart_preprocess/barchart_preprocess.js';
import preprocessF1Teams from './rankflow/preprocess.js';
import standingsData from './wafflechart_preprocess/results.json';
import f1TeamsData from './rankflow/data/f1_teams.json';
import RankFlowChart from './rankflow/RankFlowChart.js';

const columnsToDropDrivers = ['driverRef', 'number', 'code', 'dob', 'url'];
const { waffle_data, winner_data } = preprocessDrivers(
    driversData,
    columnsToDropDrivers,
    standingsData,
);

const processedResults = processResults(results);
const f1_teams_data = preprocessF1Teams(f1TeamsData)

function App() {
    const bubbleChartRef = useRef(null);
    const [currentYear, setCurrentYear] = useState(1950);
    const [maxRadius, setMaxRadius] = useState(null);
    const [maxCrash, setMaxCrash] = useState(null);
    const accidents_by_circuit = processRaces(
        circuit,
        results,
        races,
        countriesByContinent,
        driversData,
    );
    useEffect(() => {
        const handleScroll = (e) => {
            const setUpScroll = (e) => {
                e.preventDefault();
                const yOffset = bubbleChartContainer.offsetTop;

                window.scrollTo({
                    top: yOffset,
                    behavior: 'smooth',
                });
            };
            const direction = e.deltaY < 0 ? 'down' : 'up';
            if (direction === 'down' && currentYear > 1950) {
                setUpScroll(e);
                setCurrentYear((year) => Math.max(1950, year - 1));
            } else if (direction === 'up' && currentYear < 2023) {
                setUpScroll(e);
                setCurrentYear((year) => Math.min(2023, year + 1));
            }
        };

        const bubbleChartContainer = bubbleChartRef.current;
        if (bubbleChartContainer) {
            bubbleChartContainer.addEventListener('wheel', handleScroll);
        }
        return () => {
            if (bubbleChartContainer) {
                bubbleChartContainer.removeEventListener('wheel', handleScroll);
            }
        };
    }, [currentYear]);
    const { currentYearData, previousYearData, nextYearData } = useMemo(() => {
        const filterDataByYear = (year) => {
            return Object.entries(accidents_by_circuit)
                .filter(([key]) => key.startsWith(`${year}-`))
                .map(([key, value]) => ({
                    name: value.details.name,
                    value: value.count,
                    continent: value.details.continent,
                    year: value.year,
                }));
        };
        const currentYearData = filterDataByYear(currentYear);
        const previousYearData = filterDataByYear(currentYear - 1);
        const nextYearData = filterDataByYear(currentYear + 1);

        return { currentYearData, previousYearData, nextYearData };
    }, [accidents_by_circuit, currentYear]);

    const items = data.texts;

    const waffleWinnersRef = useRef();
    const waffleWinnersInView = useInView(waffleWinnersRef);

    const waffleEmptyRef = useRef(null);
    const [waffleEmptyInView, setwaffleEmptyInView] = useState(false);

    const waffleBarsRef = useRef(null);
    const [waffleBarsInView, setWaffleBarsInView] = useState(false);

    const waffleHoverRef = useRef(null);
    const [waffleHoverInView, setWaffleHoverInView] = useState(false);

    useEffect(() => {
        if (waffleEmptyRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        setwaffleEmptyInView(entry.isIntersecting);
                    });
                },
                { threshold: 0.5 },
            );

            observer.observe(waffleEmptyRef.current);
            const currentRef = waffleEmptyRef.current;

            return () => {
                observer.unobserve(currentRef);
            };
        }
    }, [waffleEmptyRef]);

    useEffect(() => {
        if (waffleBarsRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        setWaffleBarsInView(entry.isIntersecting);
                    });
                },
                { threshold: 0.5 },
            );

            observer.observe(waffleBarsRef.current);
            const currentRef = waffleBarsRef.current;

            return () => {
                observer.unobserve(currentRef);
            };
        }
    }, [waffleBarsRef]);

    useEffect(() => {
        if (waffleHoverRef.current) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        setWaffleHoverInView(entry.isIntersecting);
                    });
                },
                { threshold: 0.5 },
            );

            observer.observe(waffleHoverRef.current);
            const currentRef = waffleHoverRef.current;

            return () => {
                observer.unobserve(currentRef);
            };
        }
    }, [waffleHoverRef]);

  const [barchartData, setBarchartData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const barchartRef = useRef();

  useEffect(() => {
    async function loadData() {
      const processedData = await barchartPreprocess();
      setBarchartData(processedData);
    }

    loadData();
  }, []); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          obs.disconnect(); 
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(barchartRef.current);

    return () => observer.disconnect();
  }, []);

    return (
        <>
            <ProgressBar />
            <div className='App'>
                <h1 className='title-text'>
                    Speed Through Time: The Evolution of Formula 1
                </h1>
            </div>

            <TitleText
                title={'The Era of Dominance: Powerhouses of Formula 1'}
            />
            <div className='text-section'>
                <TextSection text={items[0]} />
            </div>

            <div className='images-box'>
                <ImageAnimation
                    img={
                        'https://cdn-4.motorsport.com/images/amp/0qAWQR80/s1000/formula-1-argentinian-gp-1981--2.jpg'
                    }
                    description={
                        'Gilles Villeneuve in his Ferrari 126C at the 1981 Argentinian Grand Prix'
                    }
                    delay={0.5}
                    duration={0.8}
                    height={'307px'}
                    width={'500px'}
                ></ImageAnimation>
                <ImageAnimation
                    img={
                        'https://cdn.ferrari.com/cms/network/media/img/resize/5e33f7f70bd18308db1a854b-ferrari-scuderia-1991-alesi-prost-cover-mob?width=768&height=1024'
                    }
                    description={
                        'Scuderia Ferrari 1981, Jean Alesi and Alain Prost'
                    }
                    delay={1.5}
                    duration={1.5}
                    height={'500px'}
                    width={'350px'}
                ></ImageAnimation>
                <ImageAnimation
                    img={
                        'https://www.creditplus.co.uk/media/6839/history-of-ferrari-in-f1-pit-stop.jpg'
                    }
                    delay={2.5}
                    duration={2.5}
                    height={'307px'}
                    width={'500px'}
                ></ImageAnimation>
            </div>
            <div className="rankflow-container">
                <RankFlowChart data={f1_teams_data}></RankFlowChart>
            </div>

            <TitleText
                title={'Racing Giants: The Dominant Nations of the Sport'}
            />
            <div className='text-section'>
                <TextSection text={items[1]} />
            </div>
            <div className='text-section presentation'>
                The following visualization will show the nationalities with
                the most drivers throughout history.
            </div>
            <div className='container'>
                <div
                    className={`text-container ${
                        waffleWinnersInView ? 'in-view' : ''
                    }`}
                    ref={waffleWinnersRef}
                >
                    <div className='subtext' ref={waffleEmptyRef}>
                        <b>858</b> drivers across <b>42</b> nationalities
                    </div>
                    <div className='subtext square' ref={waffleBarsRef}>
                        Every cube is an F1 driver.
                        <div>
                            <Square />
                        </div>
                    </div>
                    <div className='subtext hover-text' ref={waffleHoverRef}>
                        Hover on the bars to see the exact driver count.
                    </div>
                    <div className='subtext'>
                    You can now hover to see the percentage of race winners.<br></br>Not as many as you would think...
                    </div>
                </div>
                {waffleEmptyInView && !waffleBarsInView && (
                    <div className='chart-container'>
                        <WaffleChart
                            data={waffle_data}
                            colors={false}
                            hover={false}
                            animate={false}
                        />
                    </div>
                )}
                {waffleBarsInView && !waffleHoverInView && (
                    <div className='chart-container'>
                        <WaffleChart data={waffle_data} hover={false} />
                    </div>
                )}
                {waffleHoverInView && (
                    <div className='chart-container'>
                        <WaffleChart data={waffle_data} animate={false} />
                    </div>
                )}
                {waffleWinnersInView &&
                    !waffleEmptyInView &&
                    !waffleBarsInView &&
                    !waffleHoverInView && (
                        <div className='chart-container'>
                            <WaffleChart
                                data={waffle_data}
                                winner_data={winner_data}
                                animate={false}
                            />
                        </div>
                    )}
            </div>

            <ParallaxText baseVelocity={-5}>
                <img src='f1car.png' alt='F1 car' width='300' height='200' />
            </ParallaxText>

            <TitleText
                title={
                    'Aging like Fine Wine: The Timeless Veterans of the Sport'
                }
            />
            <div className='text-section'>
                <TextSection text={items[3]} />
            </div>            
            <AlonsoTimeline></AlonsoTimeline>
            <div ref={barchartRef}>
                <div className="barchart-container">
                    <div id="tooltip" className="tooltip" style={{ opacity: 0 }}></div>  
                    <Barchart data={barchartData} isVisible={isVisible}  /> 
                </div>
            </div>


            <TitleText
                title={
                    'The Dynamics of Competition: Analyzing Position Shifts in Races'
                }
            />
            <div className='text-section'>
                <TextSection text={items[4]} />
            </div>
            <HeatMap width={1000} height={800} data={processedResults}  />
            <div className='text-section'>
                <TextSection text={items[6]} />
            </div>
            <TitleText
                title={'Unleashed Chaos: The Dark Side of Formula 1 Accidents'}
            />
            
            <div className='text-section'>
                <TextSection text={items[5]} />
            </div>
            <div ref={bubbleChartRef} className='bubble-container'>
                <TextSection text={currentYear - 1} className='grid-item' />
                <TextSection text={currentYear} className='grid-item' />
                <TextSection text={currentYear + 1} className='grid-item' />
                {currentYear - 1 >= 1950 ? (
                    <div className='grid-item'>
                        <BubbleChart
                            className='grid-item'
                            data={previousYearData}
                            setBubbleScale={null}
                        />
                    </div>
                ) : (
                    <TextSection
                        text={'F1 did not start'}
                        className='grid-item'
                    />
                )}
                <BubbleChart
                    className='grid-item'
                    data={currentYearData}
                    setMaxRadius={setMaxRadius}
                    setMaxCrashes={setMaxCrash}
                />
                {currentYear + 1 <= 2023 ? (
                    <div className='grid-item'>
                        <BubbleChart
                            data={nextYearData}
                            setBubbleScale={null}
                        />
                    </div>
                ) : (
                    <TextSection
                        text={'Come back next year for the data'}
                        className='grid-item'
                    />
                )}
            </div>
            <div className='legend-container'>
                <BubbleLegend maxRadius={maxRadius} maxCrash={maxCrash} />
            </div>
            <div style={{ paddingBottom: '100px' }}>
                <BubbleChartTimeline currentYear={currentYear} />
            </div>

        </>
    );
}

export default App;
