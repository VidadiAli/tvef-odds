import React from 'react'

const Participants = ({ finalData }) => {
    return (
        <div className='participants'>
            {finalData && finalData.map((e) => {
                if (e.result && e.youtubeLink !== "") {
                    return (
                        <div key={e.id} className='part-box'>
                            <span>{e.countryName}</span>
                            <div className='text-box'>
                                <span>{e.singerName}</span>
                            </div>
                            <div className='iframe-box'>
                                <div>
                                    <iframe
                                        src={`${e.youtubeLink.slice(0, 24)}embed/${e.youtubeLink.slice(e.youtubeLink.length - 11)}`}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Participants
