import { useState, useEffect } from 'react'
import { updateDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import Layout from '../../components/layout/Layout'
import useQueryParams from '../../hooks/useQueryParams'
import { fireDB } from '../../fireabase/FirebaseConfig'

export default function PaymentCallback() {
  const [isMounted, setIsMounted] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentData, setPaymentData] = useState({})

  const queryParams = useQueryParams()

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted) {
      const { success, ...paymentData } = queryParams
      const paymentSuccess = success === 'true' ? true : false
      setIsSuccess(paymentSuccess)
      setPaymentData(paymentData)

      console.log(paymentData)
      window.history.pushState({}, '', 'payment-callback')

      updateFirebase(paymentSuccess, paymentData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  const updateFirebase = async (paymentSuccess, paymentData) => {
    if (!paymentSuccess) return console.log('Payment failed')

    //update isPaid in firebase
    const { orderId } = paymentData
    const orderRef = doc(fireDB, 'order', orderId)

    await updateDoc(orderRef, {
      isPaid: true,
      status: 'WAITING_FOR_SHIPPING',
    })
  }

  return (
    <Layout>
      <div>
        {isSuccess ? (
          <div className="flex justify-center items-center m-20 ">
          <div className="bg-blue-200 p-4">
            <div className="text-white font-bold">Thanh toán thành công số tiền {paymentData.amount}</div>
          </div>
        </div>
        
        ) : (
          <div className="flex justify-center items-center h-screen">
          <div className="bg-blue-200 p-4">
            <div className="text-white font-bold">Thanh toán Thất Bại</div>
          </div>
        </div>
        )}
      </div>
    </Layout>
  )
}
