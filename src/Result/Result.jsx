import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { mainUrl, resultUrl9 } from '../Data/Data';
import './Result.css'

const Result = () => {
    // const [mainArray, setMainArray] = useState([]);
    // const [secondArray, setSecondArray] = useState([]);
    // const [countryName, setCountryName] = useState([]);
    // const [points, setPoints] = useState([]);
    // const [sf1Country, setSf1Country] = useState([]);
    // const [changeNumber, setChangeNumber] = useState(0)

    // const callData = async () => {
    //     const data = (await axios.get(`${resultUrl9}sf1`)).data;
    //     setMainArray(data);

    //     const updatedCountryNames = [];
    //     data.forEach((element) => {
    //         let pieceOfName = element.givinCountry;
    //         if (!updatedCountryNames.includes(pieceOfName)) {
    //             updatedCountryNames.push(pieceOfName);
    //         }
    //     });

    //     const sf1Data = (await axios.get(`${mainUrl}sf1`)).data;
    //     setSecondArray(sf1Data);

    //     const updatedSf1Country = [];
    //     sf1Data.forEach((element) => {
    //         let pieceOfName = element.countryName;
    //         if (!updatedSf1Country.includes(pieceOfName)) {
    //             updatedSf1Country.push(pieceOfName);
    //         }
    //     });

    //     setSf1Country(updatedSf1Country);
    //     setCountryName(updatedCountryNames);

    //     createPoints(data, updatedCountryNames);
    // };

    // const order = (countryName, points) => {
    //     let amount = 0, mainIndex = 0, n = points.length;
    //     for (let j = 0; j < points.length; j++) {
    //         for (let i = 0; i < n; i++) {
    //             if (points[i] > amount) {
    //                 mainIndex = i;
    //                 amount = points[i];
    //             }
    //         }

    //         [points[n - 1], points[mainIndex]] = [points[mainIndex], points[n - 1]];
    //         [countryName[n - 1], countryName[mainIndex]] = [countryName[mainIndex], countryName[n - 1]];

    //         n--;
    //         mainIndex = 0;
    //         amount = 0;
    //     }

    //     countryName.reverse();
    //     points.reverse();

    //     setCountryName([...countryName]);
    //     setPoints([...points]);
    // };

    // const createPoints = (data, updatedCountryNames) => {
    //     const updatedPoints = updatedCountryNames.map((e) => {
    //         let sum = 0;
    //         data.forEach((j) => {
    //             if (e === j.getingCountry) {
    //                 sum += j.puan;
    //             }
    //         });
    //         return sum;
    //     });

    //     setPoints(updatedPoints);
    //     order(updatedCountryNames, updatedPoints);
    // };

    // const changeElement = (e) => {
    //     if (countryName.includes(e.getAttribute('alt'))) {
    //         localStorage.setItem('choosenCountryForResult', e.getAttribute('alt'))
    //         setChangeNumber(changeNumber + 1);
    //     }
    //     else if (countryName.includes(e.textContent)) {
    //         localStorage.setItem('choosenCountryForResult', e.textContent)
    //         setChangeNumber(changeNumber + 1);
    //     }
    // }

    // useEffect(() => {
    //     callData();
    // }, []);


    // useEffect(() => {
    //     if (countryName.length > 0) {
    //         localStorage.setItem('choosenCountryForResult', countryName[0]);
    //     }
    // }, [countryName]);


    return (
        // <div className='result'>
        //     <div className='show-all-puans'>
        //         <div className='score' onClick={(e) => changeElement(e.target)}>
        //             <div className='c1'>
        //                 {mainArray.map((j) => {
        //                     if (j.getingCountry === localStorage.getItem('choosenCountryForResult')) {
        //                         let a = secondArray.slice(0, Math.floor(secondArray.length / 4) + 2)
        //                         return a.map((f) => {
        //                             if (j.givinCountry === f.countryName) {
        //                                 return (
        //                                     <div key={j.id}>
        //                                         <img src={f.flag} alt={f.countryName} />
        //                                         <span>{j.puan}</span>
        //                                     </div>
        //                                 );
        //                             }
        //                             return null;
        //                         });
        //                     }
        //                     return null;
        //                 })}
        //             </div>
        //             <div className='center'>
        //                 <div className='c2'>
        //                     {mainArray.map((j) => {
        //                         if (j.getingCountry === localStorage.getItem('choosenCountryForResult')) {
        //                             let a = secondArray.slice(Math.floor(secondArray.length / 4) + 2, Math.floor(secondArray.length / 2))
        //                             return a.map((f) => {
        //                                 if (j.givinCountry === f.countryName) {
        //                                     return (
        //                                         <div key={j.id}>
        //                                             <img src={f.flag} alt={f.countryName} />
        //                                             <span>{j.puan}</span>
        //                                         </div>
        //                                     );
        //                                 }
        //                                 return null;
        //                             });
        //                         }
        //                         return null;
        //                     })}
        //                 </div>
        //                 <div className='c3'>
        //                     {secondArray.map((e) => {
        //                         if (localStorage.getItem('choosenCountryForResult') === e.countryName) {
        //                             return (
        //                                 <div key={e.countryName}>
        //                                     <img src={e.flag} alt={e.countryName} />
        //                                     <span>{points[countryName.indexOf(e.countryName)]}</span>
        //                                 </div>
        //                             );
        //                         }
        //                         return null;
        //                     })}
        //                 </div>
        //                 <div className='c4'>
        //                     {mainArray.map((j) => {
        //                         if (j.getingCountry === localStorage.getItem('choosenCountryForResult')) {
        //                             let a = secondArray.slice(Math.floor(secondArray.length / 2), Math.floor((secondArray.length * 3) / 4) - 1)
        //                             return a.map((f) => {
        //                                 if (j.givinCountry === f.countryName) {
        //                                     return (
        //                                         <div key={j.id}>
        //                                             <img src={f.flag} alt={f.countryName} />
        //                                             <span>{j.puan}</span>
        //                                         </div>
        //                                     );
        //                                 }
        //                                 return null;
        //                             });
        //                         }
        //                         return null;
        //                     })}
        //                 </div>
        //             </div>
        //             <div className='c5'>
        //                 {mainArray.map((j) => {
        //                     if (j.getingCountry === localStorage.getItem('choosenCountryForResult')) {
        //                         let a = secondArray.slice(Math.floor((secondArray.length * 3) / 4) - 1, secondArray.length)
        //                         return a.map((f) => {
        //                             if (j.givinCountry === f.countryName) {
        //                                 return (
        //                                     <div key={j.id}>
        //                                         <img src={f.flag} alt={f.countryName} />
        //                                         <span>{j.puan}</span>
        //                                     </div>
        //                                 );
        //                             }
        //                             return null;
        //                         });
        //                     }
        //                     return null;
        //                 })}
        //             </div>
        //         </div>
        //     </div>

        //     <div className='show-result'>
        //         {
        //             countryName.map((j, index) => {
        //                 return secondArray.map((e) => {
        //                     if (e.result !== -2 && j === e.countryName) {
        //                         return (
        //                             <div key={e.countryName} onClick={(f) => changeElement(f.target)}>
        //                                 <span>{index + 1}</span>
        //                                 <span>{e.countryName}</span>
        //                                 <span>{points[countryName.indexOf(e.countryName)]}</span>
        //                             </div>
        //                         );
        //                     }
        //                 })
        //             })
        //         }
        //     </div>
        // </div >

        <div>
            üzərində işlənir...
        </div>
    );
};

export default Result;