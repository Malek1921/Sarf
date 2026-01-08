import React from 'react'
import { useForm, Controller } from 'react-hook-form';
import Inputes from './components/Inputes'
import ImageBar from './components/ImageBar'
import Button from './components/Button';
import Select from './components/Select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            category: '',
            discribtion: '',
            purchase_price: '',
            stock_quantity: '',
            unit: '',
            image: './DefaultProductImage.png'
        }
    });

    const onValid = (data) => {
        toast.success("Product added successfully!");
        console.log(data);
        reset();
    };

    const onInvalid = () => {
        toast.error("Please fill in all required fields.");
    };

    return (
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <div className='h-full p-10 grid grid-cols-3 grid-rows-4 gap-2'>

                <div>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "This field can't be empty." }}
                        render={({ field }) => (
                            <Inputes {...field} label="Name" placeholder="Product Name.."
                                className={errors.name ? "border-red-500 focus:border-red-600" : ""} />
                        )}
                    />
                    <div className="h-4">
                        {errors.name && <p className="text-red-500 pl-3 text-xs">{errors.name.message}</p>}
                    </div>
                </div>

                <div>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "This field can't be empty." }}
                        render={({ field }) => (
                            <Select {...field} label="Category" options={[
                                'Electronic', 'Clouthes', 'Foods', 'Drinks', 'Shoes'
                            ]} className={errors.category ? "border-red-500  focus:border-red-600" : ""} />
                        )}
                    />
                    <div className="h-4">
                        {errors.category && <p className="text-red-500 pl-3 text-xs">{errors.category.message}</p>}
                    </div>
                </div>

                <div>
                    <Controller
                        name="discribtion"
                        control={control}
                        render={({ field }) => (
                            <Inputes {...field} label="Discribtion" placeholder="Describtion.." tArea />
                        )}
                    />
                    <div className="h-4"></div>
                </div>

                <div>
                    <Controller
                        name="purchase_price"
                        control={control}
                        rules={{ required: "This field can't be empty." }}
                        render={({ field }) => (
                            <Inputes {...field} type={'number'} label="Purchase_Price" placeholder="Product Price.."
                                className={errors.purchase_price ? "border-red-500  focus:border-red-600" : ""} />
                        )}
                    />
                    <div className="h-4">
                        {errors.purchase_price && <p className="text-red-500 pl-3 text-xs">{errors.purchase_price.message}</p>}
                    </div>
                </div>

                <div>
                    <Controller
                        name="stock_quantity"
                        control={control}
                        rules={{ required: "This field can't be empty." }}
                        render={({ field }) => (
                            <Inputes {...field} type={'number'} label="Stock_Quantity" placeholder="Product Quantity.."
                                className={errors.stock_quantity ? "border-red-500  focus:border-red-600" : ""} />
                        )}
                    />
                    <div className="h-4">
                        {errors.stock_quantity && <p className="text-red-500 pl-3 text-xs">{errors.stock_quantity.message}</p>}
                    </div>
                </div>

                <div>
                    <Controller
                        name="unit"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} label="Unit" options={[
                                'Electronic', 'Clouthes', 'Foods', 'Drinks', 'Shoes'
                            ]} />
                        )}
                    />
                    <div className="h-4"></div>
                </div>

                <i></i>

                <Controller
                    name="image"
                    control={control}
                    rules={{ required: "Please select an image." }}
                    render={({ field }) => (
                        <ImageBar {...field} label="Image" />
                    )}
                />
            </div>

            <div className='w-full flex justify-end pr-12 pb-5 gap-4'>
                <Button innerText="Add Product" type="submit" bStyle="bg-gray-100 text-black hover:bg-gray-200" />
                <Button innerText="Cancel" onClick={() => reset()} bStyle="bg-black text-white hover:bg-gray-800" />
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </form>
    )
}

export default AddProduct
