import FullLoading from '@/components/loading/FullLoading'
import dynamic from 'next/dynamic'

const AnimationScene = dynamic(() => import('@/components/scenes/AnimationScene').then((component) => component), {
  ssr: false,
  loading: () => <FullLoading size={100} />,
})

export default function AnimationPage() {
  return (
    <div className='relative w-full h-full'>
      <AnimationScene />
    </div>
  )
}
