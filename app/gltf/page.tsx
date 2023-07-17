'use client'

import { Canvas } from '@react-three/fiber'
import {
  CameraControls,
  OrbitControls,
  PerspectiveCamera,
  PresentationControls,
  View,
  useGLTF,
} from '@react-three/drei'
import { useRef } from 'react'
import Box from '@/components/practice/Box'

export function Duck() {
  const { scene } = useGLTF('/duck.glb')
  return <primitive object={scene} />
}

export default function GltfPage() {
  const containerRef = useRef(null!)
  const ref1 = useRef(null!)
  const ref2 = useRef(null!)
  return (
    <section ref={containerRef} className='flex w-full h-full'>
      <div ref={ref1} className='view1ref w-[500px] h-[500px]' />
      <div ref={ref2} className='view2ref w-[500px] h-[500px]' />
      <Canvas eventSource={containerRef} className='canvas'>
        <OrbitControls />
        <CameraControls />
        <PresentationControls />

        <View index={1} track={ref1}>
          <color attach='background' args={[254, 210, 0]} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Duck />
        </View>
        <View index={2} track={ref2}>
          <color attach='background' args={[254, 110, 110]} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[1.2, 0, 0]} />
        </View>
      </Canvas>
    </section>
  )
}
