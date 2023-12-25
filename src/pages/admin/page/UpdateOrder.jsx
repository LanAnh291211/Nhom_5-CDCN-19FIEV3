// import React, { useContext } from 'react';
// import myContext from '../../../context/data/myContext';

// function UpdateOrder() {
//     const context = useContext(myContext);
//     const { orders, setOrders, UpdateOrder } = context;
//     return (
//         <div>
//             <div className=' flex justify-center items-center h-screen'>
//                 <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
//                     <div className="">
//                         <h1 className='text-center text-white text-xl mb-4 font-bold'>Cập nhật sản phẩm</h1>
//                     </div>
//                     <div>
//                         <input type="text"
//                             value={orders.addressInfo.name}
//                             onChange={(e) => setOrders({ ...orders, title: e.target.value })}
//                             name='title'
//                             className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
//                             placeholder='Tiêu đề sản phẩm'
//                         />
//                     </div>
//                     <div>
//                         <input type="text"
//                             value={orders.price}
//                             onChange={(e) => setOrders({ ...orders, price: e.target.value })}
//                             name='price'
//                             className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
//                             placeholder='Giá sản phẩm'
//                         />
//                     </div>
//                     <div>
//                         <input type="text"
//                             value={orders.imageUrl}
//                             onChange={(e) => setOrders({ ...orders, imageUrl: e.target.value })}
//                             name='imageurl'
//                             className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
//                             placeholder='Link Ảnh sản phẩm'
//                         />
//                     </div>
//                     <div>
//                         <input type="text"
//                             value={orders.category}
//                             onChange={(e) => setOrders({ ...orders, category: e.target.value })}
//                             name='category'
//                             className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
//                             placeholder='Loại sản phẩm'
//                         />
//                     </div>
//                     <div>
//                         <textarea cols="30" rows="10" name='title'
//                          value={orders.description}
//                          onChange={(e) => setOrders({ ...orders, description: e.target.value })}
//                             className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
//                             placeholder='Chi tiết sản phẩm'>

//                         </textarea>
//                     </div>
//                     <div className=' flex justify-center mb-3'>
//                         <button
//                         onClick={UpdateOrder}
//                             className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
//                             Cập nhật sản phẩm
//                         </button>
//                     </div>
                 
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default UpdateOrder