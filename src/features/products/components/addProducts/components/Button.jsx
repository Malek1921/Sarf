import React from 'react'

function Button({ innerText, bStyle, onClick, type }) {
    return (
        <button
            type={type || 'button'}
            className={`rounded-sm border p-2 w-31 border-gray-400 font-medium outline-0 mt-2 transition-all duration-300 cursor-pointer ${bStyle || ''}`}
            onClick={onClick}
        >
            {innerText}
        </button>
    )
}

export default Button
