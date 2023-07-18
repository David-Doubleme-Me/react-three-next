'use client'

import IconCircleButton from './buttons/IconCircleButton'
import { AiOutlineMenu } from 'react-icons/ai'

export default function Navbar() {
  const handleTabMenu = () => {
    console.log('탭 메뉴 클릭!')
  }
  return (
    <section>
      <div className='text-white'>
        <IconCircleButton Icon={AiOutlineMenu} onClick={handleTabMenu} />
      </div>
    </section>
  )
}
