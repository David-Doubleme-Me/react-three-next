import FullLoading from '@/components/loading/FullLoading'
import dynamic from 'next/dynamic'
import React from 'react'

const LODScene = dynamic(() => import('@/components/scenes/LODScene').then((component) => component), {
  ssr: false,
  loading: () => <FullLoading size={100} />,
})

export default function LODPage() {
  return (
    <section className='relative w-full h-full'>
      <LODScene />
    </section>
  )
}
