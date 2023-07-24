import FullLoading from '@/components/loading/FullLoading'
// import AnimationScene from '@/components/scenes/AnimationScene'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const AnimationScene = dynamic(() => import('@/components/scenes/AnimationScene').then((component) => component), {
  ssr: false,
  loading: () => <FullLoading size={100} />,
})

export default function AnimationPage() {
  return (
    <div className='relative w-full h-full'>
      <Suspense fallback={null}>
        <AnimationScene />
      </Suspense>
    </div>
  )
}
