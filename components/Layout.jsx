import React from 'react'

const Layout = ({children}) => {
  return (
    <section className='bg-sec-bg-light p-4 rounded-xl grow'>
        {children}
    </section>
  )
}

export default Layout