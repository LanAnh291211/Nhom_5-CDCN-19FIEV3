/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Testimonial() {
  const context = useContext(myContext)
  const { mode } = context
  return (
    <div>
      <section className=''>
        <div className=' container mx-auto px-5 py-10'>
          <h1 className=' text-center text-3xl font-bold text-black' style={{ color: mode === 'dark' ? 'white' : '' }}>
            Lời chứng thực
          </h1>
          <h2 className=' text-center text-2xl font-semibold mb-10' style={{ color: mode === 'dark' ? 'white' : '' }}>
            Khách hàng <span className=' text-pink-500'>của chúng tôi</span> nói gì
          </h2>
          <div className='flex flex-wrap -m-4'>
            <div className='lg:w-1/3 lg:mb-0 mb-6 p-4'>
              <div className='h-full text-center'>
                <img
                  alt='testimonial'
                  className='w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100'
                  src='https://i.imgur.com/FLVbT2q.jpg7'
                />
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className='leading-relaxed'>
                  Có lẽ mọi người không còn quá xa lạ với nền tảng Pinterest, đặc biệt là các bạn trẻ, freelancer. Không
                  chỉ là một nơi để tham khảo các ý tưởng, mà bạn hoàn toàn có thể tận dụng nền tảng này để lưu trữ ảnh
                  và lấy link ảnh.
                </p>
                <span className='inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4' />
                <h2
                  style={{ color: mode === 'dark' ? '#ff4162' : '' }}
                  className='text-gray-900 font-medium title-font tracking-wider text-sm uppercase'
                >
                  Nguyễn Thị Lan Anh
                </h2>
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className='text-gray-500'>
                  Senior Product Designer
                </p>
              </div>
            </div>

            <div className='lg:w-1/3 lg:mb-0 mb-6 p-4'>
              <div className='h-full text-center'>
                <img
                  alt='testimonial'
                  className='w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100'
                  src='https://i.imgur.com/FLVbT2q.jpg'
                />
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className='leading-relaxed'>
                  Có lẽ mọi người không còn quá xa lạ với nền tảng Pinterest, đặc biệt là các bạn trẻ, freelancer. Không
                  chỉ là một nơi để tham khảo các ý tưởng, mà bạn hoàn toàn có thể tận dụng nền tảng này để lưu trữ ảnh
                  và lấy link ảnh.
                </p>
                <span className='inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4' />
                <h2
                  style={{ color: mode === 'dark' ? '#ff4162' : '' }}
                  className='text-gray-900 font-medium title-font tracking-wider text-sm uppercase'
                >
                  React Js
                </h2>
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className='text-gray-500'>
                  UI Develeoper
                </p>
              </div>
            </div>
            <div className='lg:w-1/3 lg:mb-0 p-4'>
              <div className='h-full text-center'>
                <img
                  alt='testimonial'
                  className='w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100'
                  src='https://i.imgur.com/FLVbT2q.jpg'
                />
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className='leading-relaxed'>
                  Có lẽ mọi người không còn quá xa lạ với nền tảng Pinterest, đặc biệt là các bạn trẻ, freelancer. Không
                  chỉ là một nơi để tham khảo các ý tưởng, mà bạn hoàn toàn có thể tận dụng nền tảng này để lưu trữ ảnh
                  và lấy link ảnh.
                </p>
                <span className='inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4' />
                <h2
                  style={{ color: mode === 'dark' ? '#ff4162' : '' }}
                  className='text-gray-900 font-medium title-font tracking-wider text-sm uppercase'
                >
                  React Js
                </h2>
                <p style={{ color: mode === 'dark' ? 'white' : '' }} className='text-gray-500'>
                  CTO
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonial
