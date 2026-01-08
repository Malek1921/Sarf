import React, { useState } from 'react'
import Inputes from './components/Inputes'
import ImageBar from './components/ImageBar'
import Button from './components/Button';
import Select from './components/Select';

function AddProduct() {

    const initialValues = {
        name: '',
        category: '',
        discribtion: '',
        purchase_price: '',
        stock_quantity: '',
        unit: '',
        image: './DefaultProductImage.png'
    }

    const [inputeValues, setInputeValues] = useState(initialValues)


    return (
        <>
            <div className='h-full p-10 grid grid-cols-3 grid-rows-4'>
                <Inputes value={inputeValues.name} label={'Name'} inputValue={setInputeValues} placeholder={'Product Name..'} />
                <Select value={inputeValues.category} inputValue={setInputeValues} label={'Category'} options={[
                    'Electronic',
                    'Clouthes',
                    'Foods',
                    'Drinks',
                    'Shoes',
                ]} />
                <Inputes value={inputeValues.discribtion} inputValue={setInputeValues} label={'Discribtion'} placeholder={'Describtion..'} tArea={true} />
                <Inputes value={inputeValues.purchase_price} inputValue={setInputeValues} label={'Purchase_Price'} placeholder={'Product Price..'} />
                <Inputes value={inputeValues.stock_quantity} inputValue={setInputeValues} label={'Stock_Quantity'} placeholder={'Product Quantity..'} />
                <Select value={inputeValues.unit} inputValue={setInputeValues} label={'Unit'} options={[
                    'Electronic',
                    'Clouthes',
                    'Foods',
                    'Drinks',
                    'Shoes',
                ]} />
                <i></i>
                <ImageBar value={inputeValues.image} setInputValue={setInputeValues} label={'Image'} />
            </div>
            <div className='w-full flex justify-end pr-12 pb-5 gap-4'>
                <Button innerText={'Add Product'} onClick={() => {
                    console.log(inputeValues);
                    setInputeValues(initialValues);
                }} bStyle={'bg-gray-100 text-black hover:bg-gray-200'} />
                <Button innerText={'Cancle'} onClick={() => { setInputeValues(initialValues) }} bStyle={'bg-black text-white hover:bg-gray-800'} />
            </div>
        </>
    )
}

export default AddProduct