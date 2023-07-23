import Image from 'next/image'
import Avatar from '../user/Avatar'

type Props = {
  image: string
}

export default function ImageCard() {
  return (
    <section className='flex flex-col max-w-sm gap-2 min-w-xs'>
      <div className='flex justify-center object-cover w-full'>
        <Image src={`/image/card/default.png`} sizes='' width={344} height={192} alt='default card' />
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
