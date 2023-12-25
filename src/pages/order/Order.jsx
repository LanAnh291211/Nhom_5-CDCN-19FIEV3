/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';


function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext)
  const { mode, loading, order } = context
  const options = [
    { value: 'WAITING_FOR_PAYMENT', label: 'chờ thanh toán' },
    { value: 'WAITING_FOR_SHIPPING', label: 'chờ lấy hàng' },
    { value: 'DONE', label: 'Hoàn thành' },
    { value: 'CANCEL', label: 'ĐÃ HỦY' }
  ];
  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ?
        (<>
          <div className=" h-full pt-10 pl-30 " >
            {
              order.filter(obj => obj.userid == userid).map((order) => {
                // order.cartItems.map()
                var total = order.cartItems.reduce(function (prev, current) {
                  return prev + +current.price
                }, 0);
                const shipping = parseInt(100)

                const grandTotal = shipping + total
                var status = options.filter(obj => obj.value == order.status).map((item) => {
                  return item.label
                })
                ;
               
                return (
                  <div className="w-screen ">
                    <div className="rounded-lg md:w-2/3  pl-30 ">
                      <div className="justify-between  ml-30  mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#900D09' : '#73c2fd', color: mode === 'dark' ? 'white' : '' }}>
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0 w-screen">
                            <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Đơn hàng</h2>
                            <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>ĐỊA CHỈ: {order.addressInfo.address}</p>
                            <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>NGÀY ĐẶT: {order.date}</p>
                            <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>TỔNG TIỀN: {grandTotal} VND</p>
                           



                            <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>TÌNH TRẠNG: {status} </p>
 
                          </div>
                        </div>
                      
                      </div>
                    </div>
                    <div className="grid grid-cols-2 w-full">
                    {
                      order.cartItems.map((item) => {
                        return (
                          <div className="rounded-lg md:w-2/3 ">
                            
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                              <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                
                        )
                      })
                      }
                      </div>
                  
                  </div>
                )
              })
              }
              
          </div>
        </>)
        :
        (
          <h2 className=' text-center tex-2xl text-white'>Not Order</h2>
        )

      }
    </Layout>
  )
}

export default Order