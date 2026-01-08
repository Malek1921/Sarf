import React from 'react'

function Select({ label, options, value, onChange, className }) {
    return (
        <div className='p-2 grid grid-cols-1 grid-rows-3'>
            <label className='font-bold text-black'>{label}</label>
            <select
                value={value}
                onChange={onChange}
                className={`bg-gray-100 rounded-sm border border-gray-400 font-medium pl-2 focus:border-2 outline-0 text-black row-span-2 mt-2 ${className || ''}`}
            >
                <option value="">Select an option</option>
                {options && options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default Select
