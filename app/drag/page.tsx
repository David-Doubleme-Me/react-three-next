import FullLoading from '@/components/loading/FullLoading'
import dynamic from 'next/dynamic'
import React from 'react'

const DragScene = dynamic(() => import('@/components/scenes/DragScene').then((component) => component), {
  ssr: false,
  loading: () => <FullLoading size={100} />,
})

export default function LODPage() {
  return (
    <section className='relative w-full h-full'>
      <DragScene />
    </section>
  )
}
