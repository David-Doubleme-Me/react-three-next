'use client'

import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'
import { MutableRefObject, Ref, Suspense, useRef, useState } from 'react'
import { Color, Group, Vector3 } from 'three'
import { GLTF } from 'three-stdlib'
import ProgressLoading from '../loading/ProgressLoading'
import NumberAnnotation, { NumberAnnotation as NumberAnnotationType } from '../annotation/NumberAnnotation'

type ModelProps = {
  url: string
  annotation: NumberAnnotationType
  setAnnotation: React.Dispatch<React.SetStateAction<NumberAnnotationType | undefined>>
}

const Model = ({ url, annotation, setAnnotation }: ModelProps) => {
  const { scene } = useGLTF(url) as GLTF

  const { position } = annotation

  scene.updateMatrixWorld()

  scene.userData = { url }

  // useFrame(({ camera }) => {
  //   const annotationDistance = camera.position.distanceTo(position)
  //   const modelDistance = camera.position.distanceTo(scene.position)
  //   if (annotationDistance < modelDistance) {
  //     console.log('어노테이션이 더 가까워')
  //   } else {
  //     console.log('모델이 더 가까워')
  //   }
  // })

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    const { camera, point } = event
    const position = point
    const cameraPosition = camera.position
    const cameraLookAt = new Vector3()
    camera.getWorldDirection(cameraLookAt)

    setAnnotation({
      number: 1,
      position,
      cameraPosition,
      cameraLookAt,
    })
  }

  return (
    <group onClick={onClick}>
      <primitive object={scene} />
    </group>
  )
}

type CameraMovingProp = {
  controls: any
  lerping: any
  destination: Vector3
  lookAt: Vector3
}
const CameraMoving = ({ controls, lerping, destination, lookAt }: CameraMovingProp) => {
  useFrame(({ camera }, delta) => {
    if (lerping) {
      camera.position.lerp(destination, delta * 2)
      controls.current.target.lerp(lookAt, delta * 2)
    }
  })
  return null
}

const ANNOTATION = {
  number: 1,
  position: {
    x: -0.7036654190924543,
    y: -0.3011266136445316,
    z: -0.06203095523679181,
  },
  cameraPosition: {
    x: -5.573538590677692,
    y: 2.748921380267661,
    z: -0.1836916654162154,
  },
  cameraLookAt: {
    x: 0.6547981014875417,
    y: -0.6371608683604212,
    z: 0.4065285649477848,
  },
} as NumberAnnotationType

export default function AnnotationScene() {
  const [annotation, setAnnotation] = useState<NumberAnnotationType | undefined>(ANNOTATION)
  const [cameraMoving, setCameraMoving] = useState(false)
  const [selectedAnnotationNumber, setSelectedAnnotationNumber] = useState(0)
  const controls = useRef(null!)
  const model = useRef(null!)

  const clickedAnnotation = (index: number) => {
    setSelectedAnnotationNumber(index)
    setCameraMoving(true)
  }

  return (
    <Canvas
      gl={{ antialias: false }}
      onPointerDown={() => setCameraMoving(false)}
      onWheel={() => setCameraMoving(false)}
    >
      <color attach='background' args={[196, 196, 196]} />
      <ambientLight />

      <Suspense fallback={<ProgressLoading />}>
        <Stage intensity={0.5} shadows='contact' environment='city'>
          <Model annotation={annotation!} url={'/model/robot/dji.glb'} setAnnotation={setAnnotation} />
        </Stage>
      </Suspense>

      {annotation && <NumberAnnotation annotation={annotation} onClick={() => clickedAnnotation(annotation.number)} />}

      {annotation && (
        <>
          <CameraMoving
            controls={controls}
            lerping={cameraMoving}
            destination={annotation.cameraPosition}
            lookAt={annotation.cameraLookAt}
          />
        </>
      )}

      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors(new Color('red'), new Color('green'), new Color('blue'))}
      />

      <OrbitControls ref={controls} />
    </Canvas>
  )
}
