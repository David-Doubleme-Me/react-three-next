'use client'

import ImageCard from '@/components/ui/card/ImageCard'
import SpriteImageCard from '@/components/ui/card/SpriteImageCard'
import Link from 'next/link'

// import dynamic from 'next/dynamic'
// import { Suspense } from 'react'

// const Logo = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Logo), { ssr: false })
// const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })
// const Duck = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Duck), { ssr: false })
// const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
//   ssr: false,
//   loading: () => (
//     <div className='flex flex-col items-center justify-center w-full h-96'>
//       <svg className='w-5 h-5 mr-3 -ml-1 text-black animate-spin' fill='none' viewBox='0 0 24 24'>
//         <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
//         <path
//           className='opacity-75'
//           fill='currentColor'
//           d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
//         />
//       </svg>
//     </div>
//   ),
// })
// const Common = dynamic(() => import('@/components/canvas/Common').then((mod) => mod.Common), { ssr: false })

const ImageCardArray = [1, 2, 3, 4, 5, 6, 7, 8]
export default function Page() {
  return (
    <section className='w-full'>
      <div className='text-white'>태그나오는 영역</div>
      {/* 리스트 나오는 영역 */}
      {/* <ul className='grid grid-cols-4 lg:gird-cols-5'>
        {ImageCardArray.map((index) => (
          <li key={index}>
            <ImageCard />
          </li>
        ))}
      </ul> */}
      <ImageCard />
      <SpriteImageCard />
    </section>
  )
}
