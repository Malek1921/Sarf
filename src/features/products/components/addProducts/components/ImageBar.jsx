import React, { useState } from 'react';
import { HiArrowUpRight } from "react-icons/hi2";

function ImageBar({ label }) {
    const [imageSrc, setImageSrc] = useState(
        "./DefaultProductImage.png"
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newUrl = URL.createObjectURL(file);
            setImageSrc(newUrl);
        }
    };

    return (
        <div className="overflow-hidden pt-2 pl-2 row-span-2 gap-2 flex flex-col pr-2">
            <label className="font-bold text-black">{label}</label>
            <div className="relative h-34 mb-2 overflow-hidden row-span-2 rounded w-full border border-gray-400 group">
                <img
                    src={imageSrc}
                    alt="Product Image"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <label className="bg-white text-black p-2 rounded-full cursor-pointer shadow">
                        <HiArrowUpRight size={36} className="hover:text-gray-700 transition-colors duration-200" />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default ImageBar;
