'use client'

import { OrbitControls, useGLTF, Stage, Grid } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Color } from 'three'
import { GLTF } from 'three-stdlib'
import ProgressLoading from '../loading/ProgressLoading'
import { useControls } from 'leva'

type ModelProps = {
  url: string
}

const Model = ({ url }: ModelProps) => {
  const { scene } = useGLTF(url) as GLTF
  scene.updateMatrixWorld()
  return (
    <group>
      <primitive object={scene} />
    </group>
  )
}

export default function GizmoScene() {
  const { gridSize, ...girdConfig } = useControls({
    gridSize: [10.5, 10.5],
    cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: '#6f6f6f',
    sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    sectionColor: '#9d4b4b',
    fadeDistance: { value: 25, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true,
  })

  return (
    <Canvas>
      <color attach='background' args={[50, 50, 50]} />
      <ambientLight />

      <Suspense fallback={<ProgressLoading />}>
        {/* <Stage intensity={0.5} shadows='contact' environment='city'> */}
        <Model url={'/model/robot/dji.glb'} />
        {/* </Stage> */}
      </Suspense>

      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors(new Color('red'), new Color('green'), new Color('blue'))}
      />

      <OrbitControls makeDefault />

      <Grid args={gridSize} {...girdConfig} />
    </Canvas>
  )
}
