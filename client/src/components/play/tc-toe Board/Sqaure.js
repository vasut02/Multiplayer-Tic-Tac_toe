import React,{useState , useEffect} from 'react'

const Sqaure = ({ val , onClick }) => {
    return (
        <div>
            <button className="square" onClick={  onClick } >
                { val ? val :''}
            </button>
        </div>
    )
}

export default Sqaure;
