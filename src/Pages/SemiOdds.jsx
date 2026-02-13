import React, { useEffect } from 'react'
import { FaArrowUp, FaArrowDown, FaYoutube } from "react-icons/fa"

const SemiOdds = ({ finalData, listOfDown, listOfUp, waitClass, leader1, leader2, leader3, edition, sf }) => {

    useEffect(()=>{
        console.log(finalData)
    }, [finalData])
    return (
        <div className='contest-participants'>
            <div className={`wait-vote ${waitClass}`}><button>please wait ...</button></div>
            <div className='final'>
                <h2>Who will qualify for the Final from {[11].includes(edition) ? `Heat ${sf}` : `Semi Final ${sf}`} ?</h2>
                <dir>
                    <span>Bookmakers have predicted</span>
                    {
                        ![11].includes(edition) ?
                            <>
                                <h2>{leader1}, {leader2}, {leader3}</h2>
                                <span>and 7 others</span>
                            </> :
                            <>
                                <h2>{leader1}, {leader2}</h2>
                                <span>and 3 others</span>
                            </>
                    }
                </dir>
                {
                    ![11].includes(edition) && (
                        <dir className="stop-odd">
                            <div>
                                <h4>Closed event</h4>
                                <span>The odds will not be updated</span>
                            </div>
                        </dir>
                    )
                }
                <div className='box-main'>
                    {finalData.map((e, index) => e.result !== -2 && (
                        <div key={e.id} className='box' style={{ backgroundColor: `${[11].includes(edition) ? index < 5 && 'rgba(255, 255, 255, 0.11)' : index < 10 && 'rgba(255, 255, 255, 0.11)'}` }}>
                            <span className='arrow'>{index + 1}
                                {listOfDown.includes(e.id) && <FaArrowDown className='arrows arrow-down' />}
                                {listOfUp.includes(e.id) && <FaArrowUp className='arrows arrow-up' />}
                            </span>
                            <img src={e.flag} alt="" className='box-flag' />
                            <div className='link-box' >
                                <span>{e.countryName}</span>
                                <a href={e.youtubeLink} className='youtube-link' target='_blank'>
                                    {e.youtubeLink && <FaYoutube />}
                                </a>
                            </div>
                            <span>{((200 / (e.puan1 + e.puan2)) <= 98 ? (200 / (e.puan1 + e.puan2)).toFixed(0) : '98')}%</span>
                            <span>{e.puan1}</span>
                            <span>{e.puan2}</span>
                            <span>{((e.puan1 + e.puan2) / 2 < 2 ? ((e.puan1 + e.puan2) / 2 + 0.03).toFixed(2) : ((e.puan1 + e.puan2) / 2).toFixed(1))}</span>
                        </div>
                    ))}
                </div>
                <dir className="nq">
                    <h1>Finalist from {[11].includes(edition) ? `Heat ${sf}` : `Semi Final ${sf}`}</h1>
                    <div>
                        {
                            finalData && finalData.map((e) => {
                                if (e.result && e.result != -2) {
                                    return <div key={e.id}>
                                        <img src={e.flag} alt={`flag of ${e.countryName}`} />
                                        {innerWidth > 500 ? <span>{e.countryName} - </span> : <span>{e.countryName}</span>}

                                    </div>
                                }
                            })
                        }
                    </div>
                </dir>
            </div>
            <div className='participants'>
                {finalData.map(e => e.result && e.youtubeLink && (
                    <div key={e.id} className='part-box'>
                        <span>{e.countryName}</span>
                        <div className='text-box'><span>{e.singerName}</span></div>
                        <div className='iframe-box'>
                            <div>
                                <iframe src={`${e.youtubeLink.slice(0, 24)}embed/${e.youtubeLink.slice(-11)}`}></iframe>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SemiOdds