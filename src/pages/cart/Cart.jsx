/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { addDoc, collection } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ApiConfig } from '../../api-config'
import Layout from '../../components/layout/Layout'
import Modal from '../../components/modal/Modal'
import myContext from '../../context/data/myContext'
import { fireDB } from '../../fireabase/FirebaseConfig'
import { decrementQuantity, deleteFromCart, incrementQuantity } from '../../redux/cartSlice'

function Cart() {
  const context = useContext(myContext)
  const { mode } = context

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart)
  console.log(cartItems)

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item))
    toast.success('Xóa hàng')
  }
  const handleIncrement = (id) => {
    dispatch(incrementQuantity({ id }))
  }
  const handleDecrement = (id) => {
    
    dispatch(decrementQuantity({ id }))
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const [totalAmout, setTotalAmount] = useState(0)

  useEffect(() => {
    let temp = 0
    console.log('cartitem', cartItems)
    cartItems.forEach((cartItem) => {
      console.log('abc' + cartItem.quantity)

      temp = temp + parseInt(cartItem.price) * parseInt(cartItem.quantity)
    })
    setTotalAmount(temp)
    // console.log(temp)
  }, [cartItems])

  const shipping = parseInt(100)

  const grandTotal = shipping + totalAmout
  console.log(grandTotal + 'ac ' + shipping + ' ' + totalAmout)
  const options = [
    { value: 'WAITING_FOR_PAYMENT', label: 'chờ thanh toán' },
    { value: 'WAITING_FOR_SHIPPING', label: 'chờ lấy hàng' },
    { value: 'DONE', label: 'Hoàn thành' },
    { value: 'CANCEL', label: 'ĐÃ HỦY' }
  ]

  /**========================================================================
   *!                           Payment Intigration
   *========================================================================**/

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const buyNow = async () => {
    if (name === '' || address == '' || pincode == '' || phoneNumber == '') {
      return toast.error('Tất cả các trường phải được điền', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      })
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }),
      email: JSON.parse(localStorage.getItem('user')).user.email,
      userid: JSON.parse(localStorage.getItem('user')).user.uid,
      isPaid: false,
      status: 'WAITING_FOR_PAYMENT',
    }

    try {
      const orderRef = collection(fireDB, 'order')
      const newDocRef = await addDoc(orderRef, orderInfo)
      const newDocId = newDocRef.id

      fetch(ApiConfig.baseUrl + ApiConfig.paymentPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: JSON.parse(localStorage.getItem('user')).user.uid,
          amount: grandTotal,
          orderId: newDocId.toString(),
          orderInfo: 'thanh toán '
        })
      })
        .then((response) => response.json())
        .then((data) => {
          const paymentUrl = data.data
          window.open(paymentUrl, '_blank')
        })
        .catch((error) => {
          // Handle any errors
        })
    } catch (error) {
      console.log(orderInfo, error)
    }
  }
  return (
    <Layout>
      <div
        className='h-screen bg-gray-100 pt-5 mb-[60%] '
        style={{
          backgroundColor: mode === 'dark' ? '#282c34' : '',
          color: mode === 'dark' ? 'white' : ''
        }}
      >
        <h1 className='mb-10 text-center text-2xl font-bold'>Giỏ hàng</h1>
        <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 '>
          <div className='rounded-lg md:w-2/3 '>
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl } = item
              return (
                <div
                  className='justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start'
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
                    color: mode === 'dark' ? 'white' : ''
                  }}
                >
                  <img src={imageUrl} alt='product-image' className='w-full rounded-lg sm:w-40' />
                  <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                    <div className='mt-5 sm:mt-0'>
                      <h2 className='text-lg font-bold text-gray-900' style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {title}
                      </h2>
                      <h2 className='text-sm  text-gray-900' style={{ color: mode === 'dark' ? 'white' : '' }}>
                        {description}
                      </h2>
                      <p
                        className='mt-1 text-xs font-semibold text-gray-700'
                        style={{ color: mode === 'dark' ? 'white' : '' }}
                      >
                        VND {price}
                      </p>

                      <div className='flex justify-between mt-4 sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
                        <div className='flex justify-between'>
                          <button onClick={ () =>   handleDecrement(item.id)  } className='px-2 py-1 bg-gray-200 rounded-lg'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-6 h-6'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M20 12H4' />
                            </svg>
                          </button>

                          <p
                            className='mt-1 text-xs font-semibold text-gray-700'
                            style={{ color: mode === 'dark' ? 'white' : '' }}
                          >
                            {item.quantity}
                          </p>
                          <button onClick={() => handleIncrement(item.id)} className='px-2 py-1 bg-gray-200 rounded-lg'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='w-6 h-6'
                              style={{ transform: 'rotate(180deg)' }}
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M20 12H4' />
                              <path strokeLinecap='round' strokeLinejoin='round' d='M12 20l-8-8 8-8' />
                            </svg>
                          </button>
                        </div>{' '}
                      </div>
                    </div>
                    <div
                      onClick={() => deleteCart(item)}
                      className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'
                    >
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
                  </div>
                </div>
              )
            })}
          </div>

          <div
            className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'
            style={{
              backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '',
              color: mode === 'dark' ? 'white' : ''
            }}
          >
            <div className='mb-2 flex justify-between'>
              <p className='text-gray-700' style={{ color: mode === 'dark' ? 'white' : '' }}>
                Tổng tiền sản phẩm
              </p>
              <p className='text-gray-700' style={{ color: mode === 'dark' ? 'white' : '' }}>
                VND {totalAmout}
              </p>
            </div>
            <div className='flex justify-between'>
              <p className='text-gray-700' style={{ color: mode === 'dark' ? 'white' : '' }}>
                Shipping
              </p>
              <p className='text-gray-700' style={{ color: mode === 'dark' ? 'white' : '' }}>
                VND {shipping}
              </p>
            </div>
            <hr className='my-4' />
            <div className='flex justify-between mb-3'>
              <p className='text-lg font-bold' style={{ color: mode === 'dark' ? 'white' : '' }}>
                Tổng
              </p>
              <div className>
                <p className='mb-1 text-lg font-bold' style={{ color: mode === 'dark' ? 'white' : '' }}>
                  VND {grandTotal}
                </p>
              </div>
            </div>
            {/* <Modal  /> */}
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
