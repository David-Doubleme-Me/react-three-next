import FullLoading from '@/components/loading/FullLoading'
import ProgressLoading from '@/components/loading/ProgressLoading'
import dynamic from 'next/dynamic'

const LoadingScene = dynamic(() => import('@/components/scenes/LoadingScene').then((component) => component), {
  ssr: false,
  loading: () => <FullLoading size={100} />,
})

export default function LoadingPage() {
  return (
    <div className='relative w-full h-full'>
      <LoadingScene />
    </div>
  )
}
