import { PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { Color } from 'three'

type Props = {
  backgroundColor?: string
}

export const Common = ({ backgroundColor }: Props) => {
  const createBackgroundColor = () => {
    if (backgroundColor) {
      const bgColor = new Color(backgroundColor)
      return <color attach={`background`} args={[bgColor.r, bgColor.g, bgColor.b]} />
    }
  }

  return (
    <Suspense fallback={null}>
      {backgroundColor && createBackgroundColor()}
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color='blue' />
      <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </Suspense>
  )
}
