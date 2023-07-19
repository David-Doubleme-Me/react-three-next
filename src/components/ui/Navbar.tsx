'use client'

import IconCircleButton from './buttons/IconCircleButton'
import { AiOutlineMenu } from 'react-icons/ai'
import MainLogo from './logo/MainLogo'
import Link from 'next/link'

export default function Navbar() {
  const handleTabMenu = () => {
    console.log('탭 메뉴 클릭!')
  }

  return (
    <section>
      <div className='flex items-center text-white gap-x-4'>
        <IconCircleButton Icon={AiOutlineMenu} onClick={handleTabMenu} />
        <Link href={`/`}>
          <MainLogo />
        </Link>
      </div>
    </section>
  )
}
