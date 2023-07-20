'use client'

import { OrbitControls, useGLTF, Resize, Center, Stage, Gltf } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { Box3, BoxHelper, Color, Vector3 } from 'three'

const Model1 = () => {
  const result = useGLTF('/model/test/1.glb')
  return <primitive object={result.scene} />
}

const Model2 = () => {
  const { scene: object } = useGLTF('/model/test/2.glb')
  const {} = useThree()
  // key
  object.updateMatrixWorld()

  const box2 = new BoxHelper(object, new Color('red'))
  return (
    <>
      <primitive object={object} />
      <primitive object={box2} />
    </>
  )
}

const Model3 = () => {
  const { scene: object } = useGLTF('/model/test/1.glb')
  const { camera } = useThree()
  object.updateMatrixWorld()

  const box = new Box3().setFromObject(object)
  const size = box.getSize(new Vector3()).length()
  const center = box.getCenter(new Vector3())

  object.position.x += object.position.x - center.x
  object.position.y += object.position.y - center.y
  object.position.z += object.position.z - center.z

  camera.near = size / 100
  camera.far = size * 100
  camera.updateProjectionMatrix()

  camera.position.copy(center)
  camera.position.x += size / 2.0
  camera.position.y += size / 5.0
  camera.position.z += size / 2.0
  camera.lookAt(center)

  return (
    <>
      <primitive object={object} />
      <primitive object={box} />
    </>
  )
}

const Tyrannosaurs = () => {
  const result = useGLTF('/model/tyrannosaurs/scene.gltf')
  return <primitive object={result.scene} />
}

export default function ResizeScene() {
  const { scale, top, bottom, right, left, front, back, ...props } = useControls({
    scale: { value: 0.01, min: 0.01, max: 1, step: 0.01 },
    top: false,
    bottom: false,
    right: false,
    left: false,
    front: false,
    back: false,
  })

  return (
    <Canvas>
      <color attach='background' args={[196, 196, 196]} />
      <ambientLight />

      <Stage intensity={0.5} shadows='contact' environment='city'>
        <Center top={top} bottom={bottom} right={right} left={left} front={front} back={back}>
          <Resize height scale={scale}>
            <Model2 />
          </Resize>
        </Center>
      </Stage>

      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors(new Color('red'), new Color('green'), new Color('blue'))}
      />

      <OrbitControls />
    </Canvas>
  )
}
