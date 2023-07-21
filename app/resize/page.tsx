import FullLoading from '@/components/loading/FullLoading'
import dynamic from 'next/dynamic'
import React from 'react'

const ResizeScene = dynamic(() => import('@/components/scenes/ResizeScene').then((component) => component), {
  ssr: false,
  loading: () => <FullLoading size={100} />,
})

export default function ResizePage() {
  return (
    <div className='relative h-full w-full'>
      <ResizeScene />
    </div>
  )
}
