import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { formUrl, mainUrl } from '../Data/Data';

const WinnerForm = () => {

    const [mainArray, setMainArray] = useState([]);
    const [puans, setPuans] = useState([]);
    const [btnClass, setBtnClass] = useState('');
    const [waitClass, setWaitClass] = useState('');
    const [puansClass, setPuansClass] = useState('')
    const [showenPuans, setShowenPuans] = useState([])
    const [showenUnderLine, setShowenUnderLine] = useState([])

    let count = 0;


    const callData = async () => {
        const data = (await axios.get(`${mainUrl}edition9`)).data
        setMainArray(data.final);
    }

    useEffect(() => {
        callData()
    }, [])

    const createPuan = async (countryName) => {

        if (!localStorage.getItem('formVote')) {
            setWaitClass('wait-vote-adding')
            const element = {
                "id": countryName + Math.floor(Math.random() * 99999999),
                "countryName": countryName,
                "countryPuan": 1,
            }

            await axios.post(`${formUrl}createFormPuan`, element);

            setWaitClass('')
            setBtnClass('create-vote-adding');
        }
        else {
            alert('You have voted')
            const voteSystem = async () => {
                const formData = (await axios.get(`${formUrl}readFormPuan`)).data;
                const data = [];

                mainArray.forEach((f) => {
                    let sumOfPuan = 0;
                    formData && formData.forEach((e) => {
                        if (f.countryName === e.countryName) {
                            sumOfPuan += e.countryPuan;
                        }
                    });

                    puans.push(sumOfPuan);
                    setPuans(puans);
                    data.push(f);
                })

                callSort(data, puans);
            }

            voteSystem();
        }
    }

    const callSort = (data, puans) => {
        let amount = 0, mainIndex = 0, n = puans.length, leader;
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

            let changeElement2 = data[n - 1]
            data[n - 1] = data[mainIndex]
            data[mainIndex] = changeElement2;

            n--;
            mainIndex = 0
            amount = 0
        };


        data.reverse();
        puans.reverse();

        dateOfMainArray(data, puans)
    }

    const vote = async () => {
        const formData = (await axios.get(`${formUrl}readFormPuan`)).data;
        const data = [];

        mainArray.forEach((f) => {
            let sumOfPuan = 0;
            formData && formData.forEach((e) => {
                if (f.countryName === e.countryName) {
                    sumOfPuan += e.countryPuan;
                }
            });

            puans.push(sumOfPuan);
            setPuans(puans);
            data.push(f);
        })

        callSort(data, puans);
    }

    const dateOfMainArray = (data, puans) => {
        setMainArray(data);
        setPuans(puans);

        setBtnClass('');
        setPuansClass('form-puans-adding');
        let sumOfAllPuans = 0;
        puans.forEach((e) => {
            sumOfAllPuans += e;
        });

        let forPercentage = []
        for (let i = 0; i < data.length; i++) {
            forPercentage.push(((puans[i] / sumOfAllPuans) * 100).toFixed(0));
        }
        forPercentage.sort((a, b) => a - b);
        forPercentage.reverse()
        console.log(forPercentage)

        for (let i = 0; i < data.length; i++) {
            showenPuans.push(((puans[i] / sumOfAllPuans) * 100).toFixed(0) + '%')
            setShowenPuans(showenPuans);
            showenUnderLine.push(`calc(${((((puans[i] / sumOfAllPuans) * 100) / forPercentage[0]) * 100).toFixed(0) + '%'} - 20px)`)
            setShowenUnderLine(showenUnderLine);
        }

        localStorage.setItem('formVote', 'formVote')
    }


    return (
        <div className="winner-form" id='goChoose'>
            <div className={`create-vote ${btnClass}`}>
                <button onClick={vote}>vote</button>
            </div>

            <div className={`wait-vote ${waitClass}`}>
                <button >please wait ...</button>
            </div>
            <div className='list-order'>
                <h1>Choose Your Winner</h1>
                {
                    mainArray && mainArray.map((e) => {
                        { count++ }
                        return <div key={e.id}>
                            <span>{count}</span>
                            <span className='country-name' onClick={(f) => createPuan(f.target.textContent)}>{e.countryName}</span>
                            <span className={`form-puans ${puansClass}`}>{showenPuans[count - 1]}</span>
                            <span className='under-line' style={{ width: `${showenUnderLine[count - 1]}` }}></span>
                        </div>
                    })
                }
            </div>
        </div >
    )
}

export default WinnerForm