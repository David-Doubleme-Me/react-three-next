'use client'

import { OrbitControls, useGLTF, Detailed } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Bone, Color, Group, Mesh, Object3D } from 'three'
import { GLTF } from 'three-stdlib'

type ModelProps = {
  url: string
}

type Nodes = {
  [key: string]: Object3D | Bone | Group | Mesh
}

const Model = ({ url }: ModelProps) => {
  const { scene } = useGLTF(url) as GLTF & { nodes: any }
  scene.updateMatrixWorld()
  scene.userData = { url }
  return <primitive object={scene} />
}

const DetailedModel = (props: any) => {
  const [lowModel, highModel] = useGLTF(['/model/dragon/cute_dragon_low.glb', '/model/dragon/cute_dragon_high.glb'])
  lowModel.scene.updateMatrixWorld()
  highModel.scene.updateMatrixWorld()

  return (
    <Detailed distances={[0, 10]} {...props}>
      <primitive object={lowModel.scene} />
      <primitive object={highModel.scene} />
    </Detailed>
  )
}

export default function LODScene() {
  return (
    <Canvas>
      <color attach='background' args={[196, 196, 196]} />
      <ambientLight />

      <Suspense fallback={<Model url='/model/robot/low.glb' />}>
        <Model url='/model/robot/high.glb' />
      </Suspense>

      <DetailedModel position={[5, 0, 0]} />

      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors(new Color('red'), new Color('green'), new Color('blue'))}
      />

      <OrbitControls />
    </Canvas>
  )
}
