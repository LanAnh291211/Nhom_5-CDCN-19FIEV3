/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { doc, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { AiFillShopping } from 'react-icons/ai'
import { FaCartPlus, FaUser } from 'react-icons/fa'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import myContext from '../../../context/data/myContext'
import { fireDB } from '../../../fireabase/FirebaseConfig'
function DashboardTab() {
  const context = useContext(myContext)
  const { mode, product, edithandle, deleteProduct, order, user } = context
  const options = [
    { value: 'WAITING_FOR_PAYMENT', label: 'chờ thanh toán' },
    { value: 'WAITING_FOR_SHIPPING', label: 'chờ lấy hàng' },
    { value: 'DONE', label: 'Hoàn thành' },
    { value: 'CANCEL', label: 'ĐÃ HỦY' }
  ]

  const [selectvalueoder, setSelectvalueoder] = useState([])

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const [selectedValue, setSelectedValue] = useState('')
  const [changorder, setChangorder] = useState([])

  const add = () => {
    window.location.href = '/addproduct'
  }

  const [isEdit, setIsEdit] = useState(false)

  const handleChange = (e, allorder, index) => {
    setSelectedValue(e.value)

    if (selectvalueoder.find((item) => item.orderId === allorder.id)) {
      const newSelectvalueoder = selectvalueoder.map((item) => {
        if (item.orderId === allorder.id) {
          return {
            ...item,
            selectedValue: e.value
          }
        }
        return item
      })
      setSelectvalueoder(newSelectvalueoder)
    } else {
      setSelectvalueoder([...selectvalueoder, { orderId: allorder.id, selectedValue: e.value }])
    }
  }

  const edit = async () => {
    if (isEdit === true) {
      console.log('selectvalueoder')

      console.log(selectvalueoder)
      const updatedOrder = order.map((item) => {
        selectvalueoder.forEach((selectItem) => {
          if (selectItem.orderId === item.id) {
            item.status = selectItem.selectedValue
          }
        })
        return item
      })

      updatedOrder.forEach(async (item) => {
        const orderRef = doc(fireDB, 'order', item.id)

        await updateDoc(orderRef, {
          status: item.status
        })
      })

      setIsEdit(false)
    } else {
      setIsEdit(true)
    }
  }

  return (
    <>
      <div className='container mx-auto'>
        <div className='tab container mx-auto '>
          <Tabs defaultIndex={0} className=' '>
            <TabList className='md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4   md:justify-center mb-10 '>
              <Tab>
                <button
                  type='button'
                  className='font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center bg-[#605d5d12] '
                >
                  <div className='flex gap-2 items-center'>
                    <MdOutlineProductionQuantityLimits />
                    Sản phẩm
                  </div>{' '}
                </button>
              </Tab>
              <Tab>
                <button
                  type='button'
                  className='font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500  hover:shadow-pink-700  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center '
                >
                  <div className='flex gap-2 items-center'>
                    <AiFillShopping /> Đặt hàng
                  </div>
                </button>
              </Tab>
              <Tab>
                <button
                  type='button'
                  className='font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center '
                >
                  <div className='flex gap-2 items-center'>
                    <FaUser /> Người dùng
                  </div>
                </button>
              </Tab>
            </TabList>
            {/* product  */}
            <TabPanel>
              <div className='  px-4 md:px-0 mb-16'>
                <h1
                  className=' text-center mb-5 text-3xl font-semibold underline'
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Chi tiết các sản phẩm
                </h1>
                <div className=' flex justify-end'>
                  <button
                    onClick={add}
                    type='button'
                    className='focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
                    style={{
                      backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                      color: mode === 'dark' ? 'white' : ''
                    }}
                  >
                    {' '}
                    <div className='flex gap-2 items-center'>
                      Thêm sản phẩm <FaCartPlus size={20} />
                    </div>
                  </button>
                </div>
                <div className='relative overflow-x-auto '>
                  <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400  '>
                    <thead
                      className='text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]'
                      style={{
                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                        color: mode === 'dark' ? 'white' : ''
                      }}
                    >
                      <tr>
                        <th scope='col' className='px-6 py-3'>
                          S.No
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Ảnh
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Tiêu đề
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Giá
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Loại
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Ngày
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    {product.map((item, index) => {
                      const { title, price, imageUrl, category, date } = item
                      return (
                        <tbody className='' key={item.id}>
                          <tr
                            className='bg-gray-50 border-b  dark:border-gray-700'
                            style={{
                              backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                              color: mode === 'dark' ? 'white' : ''
                            }}
                          >
                            <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {index + 1}.
                            </td>
                            <th scope='row' className='px-6 py-4 font-medium text-black whitespace-nowrap'>
                              <img className='w-16' src={imageUrl} alt='img' />
                            </th>
                            <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {title}
                            </td>
                            <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                              VND {price}
                            </td>
                            <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {category}
                            </td>
                            <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                              {date}
                            </td>
                            <td className='px-6 py-4'>
                              <div className=' flex gap-2'>
                                <div
                                  className=' flex gap-2 cursor-pointer text-black '
                                  style={{ color: mode === 'dark' ? 'white' : '' }}
                                >
                                  <div onClick={() => deleteProduct(item)}>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      strokeWidth={1.5}
                                      stroke='currentColor'
                                      className='w-6 h-6'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                      />
                                    </svg>
                                  </div>

                                  <Link to={'/updateproduct'}>
                                    <div onClick={() => edithandle(item)}>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                      >
                                        <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                                        />
                                      </svg>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      )
                    })}
                  </table>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              {/* <Order order={order} setOrder={setOrder} setLoading={setLoading} /> */}

              <div className='relative overflow-x-auto mb-16'>
                <h1
                  className=' text-center mb-5 text-3xl font-semibold underline'
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  Order Details
                </h1>
                {isEdit ? (
                  <button
                    onClick={edit}
                    type='button'
                    className='focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
                    style={{
                      backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                      color: mode === 'dark' ? 'white' : ''
                    }}
                  >
                    {' '}
                    <div className='flex gap-2 items-center'>Lưu Cập nhật đơn hàng</div>
                  </button>
                ) : (
                  <button
                    onClick={edit}
                    type='button'
                    className='focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'
                    style={{
                      backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                      color: mode === 'dark' ? 'white' : ''
                    }}
                  >
                    {' '}
                    <div className='flex gap-2 items-center'>Sửa đơn hàng</div>
                  </button>
                )}

                {order.map((allorder, index) => {
                  const defaultValue = options.find((option) => option.value === allorder.status)
                  var status = options
                    .filter((obj) => obj.value == allorder.status)
                    .map((item) => {
                      return item.label
                    })
                  return (
                    <div>
                      <div></div>

                      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead
                          className='text-xs text-black uppercase bg-gray-200 '
                          style={{
                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                            color: mode === 'dark' ? 'white' : ''
                          }}
                        >
                          <tr>
                            <th scope='col' className='px-6 py-3'>
                              Image
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Title
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Price
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Category
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Name
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Address
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Pincode
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Phone Number
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Email
                            </th>
                            <th scope='col' className='px-6 py-3'>
                              Date
                            </th>

                            <th scope='col' className='px-6 py-3'>
                              Thanh toán
                            </th>
                            <th scope='col' className='px-6 py-3 text-blue-500 font-bold'>
                              {isEdit === false ? (
                                status
                              ) : (
                                <Select
                                  options={options}
                                  value={options.find(
                                    (obj) =>
                                      obj.label ===
                                      selectvalueoder.filter((obj) => obj.value == allorder.id).selectedValue
                                  )}
                                  defaultValue={defaultValue}
                                  onChange={(e) => handleChange(e, allorder, index)}
                                ></Select>
                              )}
                            </th>
                          </tr>
                        </thead>
                        {allorder.cartItems.map((item, index) => {
                          // console.log(allorder)
                          const { title, description, category, imageUrl, price } = item

                          return (
                            <tbody>
                              <tr
                                className='bg-gray-50 border-b  dark:border-gray-700'
                                style={{
                                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                  color: mode === 'dark' ? 'white' : ''
                                }}
                              >
                                <th scope='row' className='px-6 py-4 font-medium text-black whitespace-nowrap'>
                                  <img className='w-16' src={imageUrl} alt='img' />
                                </th>
                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  {title}
                                </td>
                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  VND {price}
                                </td>
                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  {category}
                                </td>

                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  {allorder.addressInfo.name}
                                </td>
                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  {allorder.addressInfo.address}
                                </td>
                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  {allorder.addressInfo.pincode}
                                </td>
                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  {allorder.addressInfo.phoneNumber}
                                </td>
                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  {allorder.email}
                                </td>
                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  {allorder.date}
                                </td>
                                <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                                  {allorder.isPaid ? 'Đã Thanh Toán' : 'Chưa Thanh Toán'}
                                </td>
                                <td></td>
                              </tr>
                            </tbody>
                          )
                        })}
                      </table>
                    </div>
                  )
                })}
              </div>
            </TabPanel>

            <TabPanel>
              {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
              <div className='relative overflow-x-auto mb-10'>
                <h1
                  className=' text-center mb-5 text-3xl font-semibold underline'
                  style={{ color: mode === 'dark' ? 'white' : '' }}
                >
                  User Details
                </h1>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead
                    className='text-xs text-black uppercase bg-gray-200 '
                    style={{
                      backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                      color: mode === 'dark' ? 'white' : ''
                    }}
                  >
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        S.No
                      </th>

                      <th scope='col' className='px-6 py-3'>
                        Name
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Email
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Uid
                      </th>
                    </tr>
                  </thead>
                  {user.map((item, index) => {
                    const { name, uid, email, date } = item
                    return (
                      <tbody>
                        <tr
                          className='bg-gray-50 border-b  dark:border-gray-700'
                          style={{
                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                            color: mode === 'dark' ? 'white' : ''
                          }}
                        >
                          <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                            {index + 1}.
                          </td>
                          <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                            {name}
                          </td>
                          <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                            {email}
                          </td>
                          <td className='px-6 py-4 text-black ' style={{ color: mode === 'dark' ? 'white' : '' }}>
                            {uid}
                          </td>
                        </tr>
                      </tbody>
                    )
                  })}
                </table>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default DashboardTab
