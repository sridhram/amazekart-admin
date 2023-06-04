import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import {ShoppingCartIcon, HomeIcon, QueueListIcon, Cog6ToothIcon, ShoppingBagIcon} from '@heroicons/react/24/outline'
import {HomeIcon as HomeIconSolid, QueueListIcon as QueueListIconSolid, Cog6ToothIcon as Cog6ToothIconSolid, ShoppingBagIcon as ShoppingBagIconSolid} from '@heroicons/react/24/solid'

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const linkClass='flex items-center px-4 py-2 text-sec-text-light hover:text-sec-bg-light hover:bg-hover-light rounded-lg group';
  const activeLinkClass='bg-hover-light !text-sec-bg-light';
  const iconClass = 'w-7 h-7 inline-block mr-2 text-icon-light group-hover:text-sec-bg-light';
  const linkTxtClass='font-semibold';
  return (
    <aside className='flex flex-col gap-8 bg-sec-bg-light p-4 rounded-xl shadow-box-shadow'>
      <Link href='/' className='flex'>
        <ShoppingCartIcon className={`${iconClass}`} />
        <span className='font-bold text-xl'>Amazekart</span>
      </Link>
      <nav className='flex flex-col gap-4'>
        <Link className={`${router.pathname == '/' && activeLinkClass} ${linkClass}`} href='/'>
          {router.pathname == '/' ? <HomeIconSolid className={`${iconClass} text-sec-bg-light`} /> : <HomeIcon className={`${iconClass}`} /> }
          <span className={`${linkTxtClass}`} >Dashboard</span>
        </Link>
        <Link className={`${linkClass} ${router.pathname.includes('/products') && activeLinkClass}`} href='/products'>
          {router.pathname.includes('/products') ? <ShoppingBagIconSolid className={`${iconClass} text-sec-bg-light`} /> : <ShoppingBagIcon className={`${iconClass}`} /> }
          <span className={`${linkTxtClass}`} >Products</span>
        </Link>
        <Link className={`${linkClass} ${router.pathname.includes('/orders') && activeLinkClass}`} href='/orders'>
          {router.pathname.includes('/orders') ? <QueueListIconSolid className={`${iconClass} text-sec-bg-light`} /> : <QueueListIcon className={`${iconClass}`} /> }
          <span className={`${linkTxtClass}`} >Orders</span>
        </Link>
        <Link className={`${linkClass} ${router.pathname.includes('/settings') && activeLinkClass}`} href='/settings'>
          {router.pathname.includes('/settings') ? <Cog6ToothIconSolid className={`${iconClass} text-sec-bg-light`} /> : <Cog6ToothIcon className={`${iconClass}`} /> }
          <span className={`${linkTxtClass}`} >Settings</span>
        </Link>
      </nav>
    </aside>
  )
}

export default Navbar