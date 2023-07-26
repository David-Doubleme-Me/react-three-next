import FullLoading from '@/components/loading/FullLoading'
import dynamic from 'next/dynamic'

const ScreenshotScene = dynamic(() => import('@/components/scenes/ScreenshotScene').then((component) => component), {
  ssr: false,
  loading: () => <FullLoading size={100} />,
})

export default function LoadingPage() {
  return (
    <div className='relative w-full h-full'>
      <ScreenshotScene />
    </div>
  )
}
