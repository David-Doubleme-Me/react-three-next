import dynamic from 'next/dynamic'

const ModelViewerScene = dynamic(() => import('@/components/scenes/ModelViewerScene'), { ssr: false })

export default function ModelViewerPage() {
  return <ModelViewerScene />
}
