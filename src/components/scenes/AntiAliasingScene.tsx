'use client'

import { OrbitControls, useGLTF, Detailed, Stage } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Color, Event } from 'three'
import { GLTF } from 'three-stdlib'
import ProgressLoading from '../loading/ProgressLoading'

type ModelProps = {
  url: string
}

const Model = ({ url }: ModelProps) => {
  const { scene } = useGLTF(url) as GLTF
  const { gl } = useThree()

  scene.updateMatrixWorld()

  scene.userData = { url }
  return <primitive object={scene} />
}

export default function AntiAliasingScene() {
  return (
    <Canvas gl={{ antialias: false }}>
      <color attach='background' args={[196, 196, 196]} />
      <ambientLight />

      <Suspense fallback={<ProgressLoading />}>
        <Stage intensity={0.5} shadows='contact' environment='city'>
          <Model url={'/model/robot/dji.glb'} />
        </Stage>
      </Suspense>

      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors(new Color('red'), new Color('green'), new Color('blue'))}
      />

      <OrbitControls />
    </Canvas>
  )
}
