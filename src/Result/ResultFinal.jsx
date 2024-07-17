import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { mainUrl } from '../Data/Data';
import './Result.css';
import Result from './Result';
import { LuMoveDown } from "react-icons/lu";

const ResultFinal = () => {
    const [mainArray, setMainArray] = useState([]);
    const [mainArrayTele, setMainArrayTele] = useState([]);
    const [changedArray, setChangedArray] = useState([]);
    const [secondArray, setSecondArray] = useState([]);
    const [countryName, setCountryName] = useState([]);
    const [points, setPoints] = useState([]);
    const [finalCountry, setfinalCountry] = useState([]);
    const [changeNumber, setChangeNumber] = useState(0);
    const [changeNumber2, setChangeNumber2] = useState(0);
    const [waitClass, setWaitClass] = useState('');
    const [itemPuanTele, setItemPuanTele] = useState('')
    const [b, setb] = useState([]);

    const callData = async () => {
        setWaitClass('wait-vote-adding');

        const data = (await axios.get(`https://us-central1-api-tvef-vote.cloudfunctions.net/app/readPuans`)).data;
        setMainArray(data);

        const data1 = (await axios.get(`https://us-central1-api-tvef-vote.cloudfunctions.net/app/readTelePuans`)).data;
        setMainArrayTele(data1);

        const updatedCountryNames = Array.from(new Set(data.map((element) => element.givinCountry)));

        const finalData = (await axios.get(`${mainUrl}edition9`)).data;
        setSecondArray(finalData.final);

        const updatedfinalCountry = Array.from(new Set(finalData.final.map((element) => element.countryName)));

        setfinalCountry(updatedfinalCountry);
        setCountryName(updatedCountryNames);

        createPoints(data, data1, updatedCountryNames);

        setChangedArray(data);
        setWaitClass('');
    };

    const order = (countryName, points) => {
        const sorted = countryName.map((cn, index) => ({ cn, pt: points[index] }))
            .sort((a, b) => b.pt - a.pt);

        setCountryName(sorted.map(item => item.cn));
        setPoints(sorted.map(item => item.pt));
    };

    const createPoints = (data, data1, updatedCountryNames) => {
        const updatedPoints = updatedCountryNames.map((e) => {
            const totalPoints = [];
            data1.forEach((element) => {
                totalPoints.push(element);
            });
            data.forEach((element) => {
                totalPoints.push(element);
            });
            return totalPoints.filter(j => e === j.getingCountry).reduce((sum, j) => sum + j.puan, 0);
        });

        setPoints(updatedPoints);
        order(updatedCountryNames, updatedPoints);
    };

    const changeElement = (e) => {
        const selectedCountry = e.getAttribute('alt') || e.textContent;

        if (countryName.includes(selectedCountry)) {
            localStorage.setItem('ed-9-result', selectedCountry);
            localStorage.setItem('choosenCountryForResult', selectedCountry);
            setChangeNumber(prev => prev + 1);

            const filtered = changedArray.filter(j => j.getingCountry === selectedCountry)
                .map(j => ({
                    ...secondArray.find(f => j.givinCountry === f.countryName),
                    puan: j.puan
                }));

            setb(filtered.sort((a, b) => a.puan - b.puan));
            setChangeNumber2(1);
        }
    };

    const showCountryPoints = (e) => {
        const selectedCountry = localStorage.getItem('choosenCountryForResult');

        const filtered = changedArray.filter(j => j.givinCountry === selectedCountry)
            .map(j => ({
                ...secondArray.find(f => j.getingCountry === f.countryName),
                puan: j.puan
            }));

        setb(filtered.sort((a, b) => a.puan - b.puan));
        setChangeNumber2(0);
        setChangeNumber(0);
    };

    useEffect(() => {
        callData();
        const showAllPuansElement = document.getElementsByClassName('show-all-puans')[0];
        showAllPuansElement.style.height = showAllPuansElement.offsetWidth + 80 + 'px';
    }, []);

    useEffect(() => {
        if (countryName.length > 0) {
            const defaultCountry = countryName[0];
            localStorage.setItem('choosenCountryForResult', defaultCountry);

            const filtered = changedArray.filter(j => j.givinCountry === defaultCountry)
                .map(j => ({
                    ...secondArray.find(f => j.getingCountry === f.countryName),
                    puan: j.puan
                }));

            setb(filtered.sort((a, b) => a.puan - b.puan));
            setChangeNumber2(0);
            setChangeNumber(0);
        }
    }, [countryName]);

    useEffect(() => {
        const selectedCountry = localStorage.getItem('choosenCountryForResult');
        const filtered = changedArray.filter(j => j.givinCountry === selectedCountry)
            .map(j => ({
                ...secondArray.find(f => j.getingCountry === f.countryName),
                puan: j.puan
            }));
        setb(filtered.sort((a, b) => a.puan - b.puan));
    }, [changedArray]);

    const showJury = () => {
        setChangedArray(mainArray);
        setItemPuanTele('');
        setChangeNumber2(0);
    };

    const showTele = () => {
        setChangedArray(mainArrayTele);
        setItemPuanTele('item-puan-tele');
        setChangeNumber2(0);
    };

    const renderCountryPoints = (startIndex, endIndex) => {
        return b.slice(startIndex, endIndex).map((item, index) => {
            return (
                <div key={index} className={`${itemPuanTele}`} style={{ width: '35px', height: '35px' }}>
                    <img src={item.flag} alt={item.countryName} />
                    <span style={{ width: '18px', height: '18px', fontSize: '.7rem' }}>{item.puan}</span>
                </div>
            );
        });
    };

    return (
        <>
         <div className='result'>
            <div className={`wait-vote ${waitClass}`}>
                <button>please wait ...</button>
            </div>
            <Result />
            <div className='show-all-puans show-all-final'>
                <div className='points-system'>
                    <span onClick={showJury}>Jury</span>
                    <span onClick={showTele}>Tele</span>
                </div>
                <div className='score score-final'>
                    <div className='c1' onClick={(e) => changeElement(e.target)}>
                        {renderCountryPoints(0, Math.floor(b.length / 4))}
                    </div>
                    <div className='center'>
                        <div className='c2' onClick={(e) => changeElement(e.target)}>
                            {renderCountryPoints(Math.floor((b.length * 3) / 4), b.length)}
                        </div>
                        <div className='c3'>
                            {secondArray.map((e) => {
                                if (localStorage.getItem('choosenCountryForResult') === e.countryName) {
                                    return (
                                        <div key={e.countryName} className={`${itemPuanTele}`}>
                                            <img src={e.flag} alt={e.countryName} onClick={(l) => changeNumber2 % 2 !== 0 ? showCountryPoints(l.target) : changeElement(l.target)} />
                                            <div>
                                                <span>{e.result != false ? `Total: ${points[countryName.indexOf(e.countryName)]}` : 'Not Q'}</span>
                                                <span>{e.result == true ? countryName.indexOf(e.countryName) == 0 ? `${countryName.indexOf(e.countryName) + 1}st place` : countryName.indexOf(e.countryName) == 1 ? `${countryName.indexOf(e.countryName) + 1}nd place` : countryName.indexOf(e.countryName) == 2 ? `${countryName.indexOf(e.countryName) + 1}rd place` : `${countryName.indexOf(e.countryName) + 1}th place` : ''}</span>
                                            </div>
                                            {[...Array(8)].map((_, i) => (
                                                <LuMoveDown key={i} className={`${changeNumber2 % 2 === 0 ? 'arrow' : 'arrow arrow-change'}`} />
                                            ))}
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div className='c4' onClick={(e) => changeElement(e.target)}>
                            {renderCountryPoints(Math.floor(b.length / 4), Math.floor(b.length / 2))}
                        </div>
                    </div>
                    <div className='c5' onClick={(e) => changeElement(e.target)}>
                        {renderCountryPoints(Math.floor(b.length / 2), Math.floor((b.length * 3) / 4))}
                    </div>
                </div>
            </div>

            <div className='show-result'>
                {countryName.map((j, index) => {
                    return secondArray.map((e) => {
                        if (e.result !== false && j === e.countryName) {
                            return (
                                <div key={e.countryName} onClick={(f) => changeElement(f.target)}>
                                    <span style={{ backgroundColor: `${(index + 1) <= 1 ? '#FE339C' : '#445565'}` }}>{index + 1}</span>
                                    <img src={e.flag} alt="" />
                                    <span style={{ backgroundColor: `${(index + 1) <= 1 ? '#6359E3' : '#445565'}` }}>{e.countryName}</span>
                                    <span>{points[countryName.indexOf(e.countryName)]}<span style={{ backgroundColor: `${(index + 1) <= 1 ? '#6359E3' : '#445565'}` }}></span></span>
                                </div>
                            );
                        }
                        return null;
                    });
                })}
            </div>
        </div> 

        </>
    );
};

export default ResultFinal;