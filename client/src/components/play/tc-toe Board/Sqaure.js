import React from 'react'

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
