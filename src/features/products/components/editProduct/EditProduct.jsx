import React from 'react'
import Inputes from './components/Inputes'
import ImageBar from './components/ImageBar'
import Button from './components/Button';

function EditProduct() {
  return (
    <>
      <div className='h-full p-10 grid grid-cols-3 grid-rows-4'>
        <Inputes label={'Name'} />
        <Inputes label={'Categary'} />
        <Inputes label={'Discribtion'} />
        <Inputes label={'Purchase Price'} />
        <Inputes label={'Stock Quantity'} />
        <Inputes label={'Unit'} />
        <i></i>
        <ImageBar label={'Image'} />
      </div>
      <div className='w-full flex justify-end pr-12 pb-5 gap-4'>
        <Button innerText={'Edit Product'} bStyle={'bg-gray-100 text-black hover:bg-gray-200'} />
        <Button innerText={'Cancle Edit'} bStyle={'bg-black text-white hover:bg-gray-800'} />
      </div>
    </>
  )
}

export default EditProduct