import React from 'react'

function Inputes({ label, type, placeholder, value, onChange, tArea, className }) {
    return (
        <div className='p-2 grid grid-cols-1 grid-rows-3'>
            <label className='font-bold text-black'>{label}</label>
            {tArea ? (
                <textarea
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`bg-gray-100 rounded-sm h-10 resize-none border border-gray-400 font-medium p-2 focus:border-2 outline-0 text-black row-span-2 mt-2 ${className || ''}`}
                />
            ) : (
                <input
                    type={type || 'text'}
                    placeholder={placeholder || ''}
                    value={value}
                    onChange={onChange}
                    className={`bg-gray-100 rounded-sm border border-gray-400 font-medium pl-2 focus:border-2 outline-0 text-black row-span-2 mt-2 ${className || ''}`}
                />
            )}
        </div>
    )
}

export default Inputes
