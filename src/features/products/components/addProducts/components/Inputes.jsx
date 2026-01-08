import React from 'react'

function Inputes({ label, type, placeholder, value, inputValue, tArea }) {

    return (
        <div className='p-2 grid grid-cols-1 grid-rows-3'>
            <label className='font-bold text-black'>{label}</label>
            {tArea ?
                <textarea
                    value={ value && value}
                    placeholder={placeholder && placeholder}
                    onChange={(e) => { inputValue(prev => ({ ...prev, [label.toLowerCase()]: e.target.value })) }}
                    className='bg-gray-100 rounded-sm h-11 resize-none border disabled:bg-gray-200 disabled:text-blue-300 border-gray-400 font-medium p-2 focus:border-2 focus:border-gray-600 outline-0 text-black row-span-2 mt-2'
                ></textarea>
                :
                <input
                    className='bg-gray-100 rounded-sm border disabled:bg-gray-200 disabled:text-blue-300 border-gray-400 font-medium pl-2 focus:border-2 focus:border-gray-600 outline-0 text-black row-span-2 mt-2'
                    type={type ? type : 'text'}
                    placeholder={placeholder ? placeholder : ''}
                    value={value && value}
                    onChange={(e) => {inputValue(prev => ({...prev, [label.toLowerCase()]: e.target.value}))}}
                />
            }
        </div>
    )
}

export default Inputes