'use client'

import { Html, Loader } from '@react-three/drei'
import { useProgress } from '@react-three/drei'
import dynamic from 'next/dynamic'

const Line = dynamic(() => import('rc-progress').then((lib) => lib.Line), {
  ssr: false,
})

export default function ProgressLoading() {
  const { progress } = useProgress()
  return (
    <Html center style={{ width: '100vw', height: '100vh' }}>
      <div className='absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full backdrop-blur-sm bg-white/30'>
        <div>
          <div className='flex flex-col items-center w-64 gap-4'>
            <Line percent={progress} strokeWidth={4} strokeColor='#000000' />
            <div className='relative inline-block font-bold'> {progress} % loaded</div>
          </div>
        </div>
      </div>
    </Html>
  )

  // return (
  //   <Html>
  //     <Loader />
  //   </Html>
  // )
}
