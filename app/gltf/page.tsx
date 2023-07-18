import FullLoading from '@/components/loading/FullLoading'
import dynamic from 'next/dynamic'

const GLTFScene = dynamic(() => import('@/components/scenes/GLTFScene').then((component) => component), {
  ssr: false,
  loading: () => <FullLoading size={100} />,
})

export default function Gltfpage() {
  return (
    <section className='relative w-full h-full'>
      <GLTFScene />
    </section>
  )
}
