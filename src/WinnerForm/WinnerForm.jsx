import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { formUrl, mainUrl } from '../Data/Data';

const WinnerForm = () => {
    const [arrayOfForm, setArrayOfForm] = useState([]);
    const [puanData, setPuanData] = useState([]);
    const [puans, setPuans] = useState([]);
    const [lastArray, setLastArray] = useState([]);
    const [createClass, setCreateClass] = useState('');
    const [formPuansClass, setFormPuansClass] = useState('');

    let counts = 0;

    const callData = async () => {
        const data = (await axios.get(`${mainUrl}final`)).data;
        setArrayOfForm(data);
        const arrayOfPuans = (await axios.get(`${formUrl}readFormPuan`)).data;
        setPuanData(arrayOfPuans);

        if (JSON.parse(localStorage.getItem('lastArray'))) {
            callForm()
        }
        else {
            setLastArray(data)
        }
    }

    const addData = async (element) => {
        await axios.post(`${formUrl}createFormPuan`, element);
        setCreateClass('create-vote-adding');
        sumPuans()
    }

    const sendPuan = (f) => {
        if (!JSON.parse(localStorage.getItem('lastArray'))) {
            const element = {
                id: f + Math.floor(Math.random() * 99999999),
                countryName: f,
                countryPuan: 3
            }
            addData(element)
        }
    }


    const sumPuans = () => {
        arrayOfForm && arrayOfForm.forEach((e) => {
            let count = 0;
            puanData && puanData.forEach((f) => {
                if (e.countryName === f.countryName) {
                    count += Number(f.countryPuan);
                }
            })
            puans.push(count);
            setPuans(puans);
        })


        callScore()
        localStorage.setItem('puansOfForm', JSON.stringify(puans));
    }

    const callScore = () => {
        let amount = 0, mainIndex = 0, n = puans.length;
        for (let j = 0; j < puans.length; j++) {
            for (let i = 0; i < n; i++) {
                if (puans[i] > amount) {
                    mainIndex = i;
                    amount = puans[i];
                }
            }

            let changeElement1 = puans[n - 1]
            puans[n - 1] = puans[mainIndex]
            puans[mainIndex] = changeElement1;

            let changeElement2 = arrayOfForm[n - 1]
            arrayOfForm[n - 1] = arrayOfForm[mainIndex]
            arrayOfForm[mainIndex] = changeElement2;

            n--;
            mainIndex = 0
            amount = 0

        };

        puans.reverse()
        arrayOfForm.reverse()

        localStorage.setItem('lastArray', JSON.stringify(arrayOfForm));
    }

    const create = () => {
        if (!JSON.parse(localStorage.getItem('lastArray'))) {
            setLastArray([])
        }
        else {
            callForm()
        }
    }


    const callForm = async () => {
        //const data = (await axios.get(`${mainUrl}final`)).data;
        // setArrayOfForm(data);
        // const arrayOfPuans = (await axios.get(`${formUrl}readFormPuan`)).data;
        // setPuanData(arrayOfPuans);

        // arrayOfForm && arrayOfForm.forEach((e) => {
        //     let count = 0;
        //     puanData && puanData.forEach((f) => {
        //         if (e.countryName === f.countryName) {
        //             count += Number(f.countryPuan);
        //         }
        //     })
        //     puans.push(count);
        //     setPuans(puans);
        // })


        // callScore();
        // localStorage.setItem('puansOfForm', JSON.stringify(puans));

        setLastArray(JSON.parse(localStorage.getItem('lastArray')))
        let newPuansArray = (JSON.parse(localStorage.getItem('puansOfForm')))
        let sumOfPuans = 0;

        newPuansArray.forEach((e) => {
            sumOfPuans += e;
        })

        for (let i = 0; i < newPuansArray.length; i++) {
            document.getElementsByClassName('form-puans')[i].textContent = ((newPuansArray[i] / sumOfPuans) * 100).toFixed(0) + '%';
            document.getElementsByClassName('under-line')[i].style.width = ((newPuansArray[i] / sumOfPuans) * 100).toFixed(0) + '%';
        }
        console.log(newPuansArray)

        setCreateClass('');
        setFormPuansClass('form-puans-adding')
    }

    useEffect(() => {
        callData();
    });

    return (
        <div className="winner-form" id='goChoose'>
            <div className={`create-vote ${createClass}`}>
                <button onClick={create}>Vote</button>
            </div>
            <div className='list-order'>
                <h1>Choose your Winner</h1>
                {

                    lastArray && lastArray.map((e) => {
                        { counts++ }
                        return <div key={e.id}>
                            <span>{counts}. </span>
                            <span onClick={(f) => sendPuan(f.target.textContent)} className='country-name'>{e.countryName}</span>
                            <span className={`form-puans ${formPuansClass}`}>{0}%</span>
                            <span className='under-line'></span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default WinnerForm