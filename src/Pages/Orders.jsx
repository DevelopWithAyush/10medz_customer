import React from 'react'
import OrderHeroSection from '../components/OrderHeroSection'
import OrderTable from '../components/OrderTable'

const Orders = () => {
  return (
    <main className='flex flex-col items-center justify-center gap-10'>
      <OrderHeroSection />
      <OrderTable />
    </main>
  )
}

export default Orders
