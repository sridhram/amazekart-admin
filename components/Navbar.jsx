import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import {ShoppingCartIcon, HomeIcon, QueueListIcon, Cog6ToothIcon, ShoppingBagIcon} from '@heroicons/react/24/outline'

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const linkClass='flex items-center px-4 py-2 hover:bg-hover-light rounded-lg group'
  const iconClass = 'w-7 h-7 inline-block mr-2 text-icon-light group-hover:text-sec-bg-light'
  const linkTxtClass='font-semibold text-sec-text-light group-hover:text-sec-bg-light'
  return (
    <aside className='flex flex-col gap-8 bg-sec-bg-light p-4 rounded-xl'>
      <Link href='/' className='flex'>
        <ShoppingCartIcon className={`${iconClass}`} />
        <span className='font-bold text-xl'>Amazekart</span>
      </Link>
      <nav className='flex flex-col gap-4'>
        <Link className={`${linkClass}`} href='/'>
          <HomeIcon className={`${iconClass}`} />
          <span className={`${linkTxtClass}`} >Dashboard</span>
        </Link>
        <Link className={`${linkClass}`} href='/products'>
          <ShoppingBagIcon className={`${iconClass}`} />
          <span className={`${linkTxtClass}`} >Products</span>
        </Link>
        <Link className={`${linkClass}`} href='/orders'>
          <QueueListIcon className={`${iconClass}`} />
          <span className={`${linkTxtClass}`} >Orders</span>
        </Link>
        <Link className={`${linkClass}`} href='/settings'>
          <Cog6ToothIcon className={`${iconClass}`} />
          <span className={`${linkTxtClass}`} >Settings</span>
        </Link>
      </nav>
    </aside>
  )
}

export default Navbar