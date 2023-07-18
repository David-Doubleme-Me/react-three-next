'use client'

import { Canvas } from '@react-three/fiber'
import {
  CameraControls,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  PresentationControls,
  View,
  useGLTF,
  Box as DreiBox,
  CubeCamera,
} from '@react-three/drei'
import { useRef } from 'react'

export function Duck() {
  const { scene } = useGLTF('/duck.glb')
  return <primitive object={scene} />
}
export function Dog() {
  const { scene } = useGLTF('/dog.glb')
  return <primitive object={scene} />
}

// track, index, frames, children
export default function CameraPage() {
  const containerRef = useRef(null!)
  const ref1 = useRef(null!)
  const ref2 = useRef(null!)
  const ref3 = useRef(null!)

  return (
    <section ref={containerRef} className='flex w-full h-full'>
      <div ref={ref1} className='view1ref w-[500px] h-[500px]' />
      <div ref={ref2} className='view2ref w-[500px] h-[500px]' />
      <div ref={ref3} className='view3ref w-[500px] h-[500px]' />
      <Canvas eventSource={containerRef} className='canvas'>
        {/* <OrbitControls />
        <CameraControls />
        <PresentationControls /> */}

        <View index={1} track={ref1}>
          <color attach='background' args={[254, 210, 0]} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Duck />
          <DreiBox material-color='hotpink' args={[5, 5, 5]} position={[2, 0, -20]} />
        </View>
        <View index={2} track={ref2}>
          <color attach='background' args={[134, 110, 50]} />
          <OrthographicCamera makeDefault>
            <Dog />
            <DreiBox material-color='hotpink' args={[1, 1, 1]} position={[0, 0, -100]} />
            <DreiBox material-color='hotpink' args={[1, 1, 1]} position={[2, 0, -50]} />
          </OrthographicCamera>

          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
        </View>
        <View index={3} track={ref3}>
          <color attach='background' args={[254, 210, 0]} />
          <CubeCamera>
            {(texture) => (
              <>
                <mesh>
                  <sphereGeometry />
                  <meshStandardMaterial envMap={texture} metalness={0.5} roughness={0.5} />
                </mesh>
              </>
            )}
          </CubeCamera>
          <DreiBox material-color='hotpink' args={[1, 1, 1]} position={[2, 0, 0]} />

          <OrbitControls />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
        </View>
      </Canvas>
    </section>
  )
}
