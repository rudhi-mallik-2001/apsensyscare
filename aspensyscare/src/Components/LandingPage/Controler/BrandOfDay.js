import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const BrandOfDay = () => {
    const Category = useSelector((state) => state.category);
    const { category } = Category.category;
    const navigate = useNavigate();
    return (
        <div className="w-full mt-[1rem] mb-[30px] flex flex-nowrap flex-col gap-4">
            <div className='w-full  font-bold  my-[30px]'>
                <h1 className='text-bold text-2xl md:text-[24px] leading-[40px]'>Category Of The Day</h1>
            </div>
            <div className="max-w-[100%]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10" >
                {
                    category !== undefined ? (
                        category.map((item, idx) => {
                            return (
                                <div class="w-full border rounded-lg cursor-pointer" onClick={() => navigate(`/category/${item.category_url}`, { state: { id: item.id, val: item } })}>
                                    <img class="w-full" src={`${process.env.REACT_APP_URL}Image/category/${item.category_img}`} alt="" />
                                    <div class="p-3 md:p-5 text-lg md:text-2xl text-center text-gray-600 font-semibold">Upto <span class="text-green-600">30% Off</span> on Entire Range</div>
                                </div>
                            )
                        })
                    ) : null
                }
            </div>
        </div>
    )
}

export default BrandOfDay