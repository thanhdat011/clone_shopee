import React from 'react'
import Footer from '../../components/Footer'
import CartHeader from '../../components/CartHeader/CartHeader'

interface Props {
  children?: React.ReactNode
}
export default function CartLayout({ children }: Props) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
