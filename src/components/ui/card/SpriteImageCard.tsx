import Image from 'next/image'
import Avatar from '../user/Avatar'
import { useState } from 'react'

type Props = {
  image?: string
}

export default function SpriteImageCard() {
  const [xPos, setXPos] = useState(0)

  const handleMouseMove = (event: React.MouseEvent) => {
    const eventTarget = event.target as HTMLDivElement
    const { left, top, width, height } = eventTarget.getBoundingClientRect()
    const mouseX = event.clientX - left
    const mouseY = event.clientY - top

    const x = (mouseX / width) * 100
    // console.log(x)
    setXPos(x)

    eventTarget.style.backgroundPosition = `${x}% 0`

    //6.67%
  }

  return (
    <section className='flex flex-col max-w-sm gap-2 min-w-xs'>
      <div className='relative' onMouseMove={handleMouseMove}>
        <div
          className={`absolute top-0 left-0 bg-[url('/image/sprite/1.jpeg')] bg-no-repeat w-[344px] h-[192px] bg-cover`}
        />
      </div>
      <div className='flex w-full gap-2'>
        <Avatar />
        <div className='flex flex-col max-w-xs'>
          <div className='w-64 font-bold text-white line-clamp-2'>타이틀은 두줄씩 .</div>
          <div className='text-gray-300'>채널이름</div>
          <div className='flex text-gray-300'>
            <span>조회수 11만회</span>
            <span>﹒10개월 전</span>
          </div>
        </div>
      </div>
    </section>
  )
}
