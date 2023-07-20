'use client'

import { OrbitControls, useGLTF, Detailed } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { Color, Mesh } from 'three'

const Model1 = () => {
  const result = useGLTF('/model/dragon/cute_dragon_low.glb')
  console.log(result)
  result.scene.traverse((item) => {
    if (item instanceof Mesh) {
      // 기하 정보를 얻습니다.
      const geometry = item.geometry
      console.log(geometry)
    }
  })
  result.scene.updateMatrixWorld()
  return <primitive object={result.scene} />
}

const Model2 = () => {
  const { scene } = useGLTF('/model/dragon/cute_dragon_high.glb')
  scene.updateMatrixWorld()
  return <primitive object={scene} />
}

export default function ResizeScene() {
  const props = {
    position: [0, 0, 0],
  }
  return (
    <Canvas>
      <color attach='background' args={[196, 196, 196]} />
      <ambientLight />

      <Model1 />
      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors(new Color('red'), new Color('green'), new Color('blue'))}
      />

      <OrbitControls />
    </Canvas>
  )
}
