'use client'

import { OrbitControls, useGLTF, Detailed, Stage, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Color, Event } from 'three'
import { GLTF } from 'three-stdlib'
import ProgressLoading from '../loading/ProgressLoading'
import CommonViewport from '../helper/gizmo/CommonViewport'
import CommonViewcube from '../helper/gizmo/CommonViewcube'

type ModelProps = {
  url: string
}

const Model = ({ url }: ModelProps) => {
  const { scene } = useGLTF(url) as GLTF
  scene.updateMatrixWorld()
  return <primitive object={scene} />
}

export default function GizmoScene() {
  return (
    <Canvas>
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

      <CommonViewport />
      {/* <CommonViewcube /> */}

      <OrbitControls makeDefault />
    </Canvas>
  )
}
