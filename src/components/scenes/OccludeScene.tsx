'use client'

import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { Dispatch, SetStateAction, Suspense, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { GLTF } from 'three-stdlib'
import ProgressLoading from '../loading/ProgressLoading'
import { useControls } from 'leva'
import NumberAnnotation from '../annotation/NumberAnnotation'

type ModelProps = {
  children: React.ReactNode
  url: string
  annotationList: Annotation[]
  setAnnotationList: Dispatch<SetStateAction<Annotation[]>>
}

type Annotation = {
  id: number
  position: Vector3
  cameraPosition: Vector3
  cameraLookAt: Vector3
}

const Model = ({ children, url, annotationList, setAnnotationList }: ModelProps) => {
  const { scene } = useGLTF(url) as GLTF
  const modelRef = useRef(null!)
  const poiRef = useRef(null!)

  scene.updateMatrixWorld()

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    const { camera, intersections } = event
    const cameraLookAt = new Vector3()
    camera.getWorldDirection(cameraLookAt)

    if (intersections[0]) {
      const poi = {
        id: annotationList.length + 1,
        position: intersections[0].point,
        cameraPosition: camera.position,
        cameraLookAt,
      }

      setAnnotationList((prev) => [...prev, poi])
    }
  }

  return (
    <group onClick={onClick} position={[0, 0, 0]}>
      <primitive ref={modelRef} object={scene} />
      <group name='myPoi' ref={poiRef}>
        {children}
        {/* // <Html
          //   key={index}
          //   occlude
          //   position={[a.position.x, a.position.y, a.position.z]}
          //   onOcclude={(visible: boolean) => handleVisible(index, visible)}
          // >
          //   <div className='cursor-pointer'>
          //     <div
          //       className={`flex justify-center items-center w-[24px] border-2 border-slate-50 h-[24px] p-4 font-bold text-white rounded-full bg-black/70 ${
          //         hidden ? 'opacity-50' : 'opacity-100'
          //       }`}
          //     >
          //       {1}
          //     </div>
          //   </div>
          // </Html> */}
      </group>
    </group>
  )
}

type CameraMovingProp = {
  controls: any
  lerping: boolean
  destination?: Vector3
  lookAt?: Vector3
}
const CameraMoving = ({ controls, lerping, destination, lookAt }: CameraMovingProp) => {
  useFrame(({ camera }, delta) => {
    if (lerping && destination && lookAt) {
      camera.position.lerp(destination, delta * 2)
      controls.current.target.lerp(lookAt, delta * 2)
    }
  })
  return null
}

export default function OccludeScene() {
  const [cameraMoving, setCameraMoving] = useState(false)
  const [annotationList, setAnnotationList] = useState<Annotation[]>([
    {
      id: 1,
      position: new Vector3(-1.2, 0, 0),
      cameraPosition: new Vector3(-1, 0, 0),
      cameraLookAt: new Vector3(-1, 0, 0),
    },
    {
      id: 2,
      position: new Vector3(-1.4, 0, 0),
      cameraPosition: new Vector3(-2, 0, 0),
      cameraLookAt: new Vector3(-2, 0, 0),
    },
    {
      id: 3,
      position: new Vector3(-1.6, 0, 0),
      cameraPosition: new Vector3(-2, 0, 0),
      cameraLookAt: new Vector3(-2, 0, 0),
    },
    {
      id: 4,
      position: new Vector3(-1.8, 0, 0),
      cameraPosition: new Vector3(-2, 0, 0),
      cameraLookAt: new Vector3(-2, 0, 0),
    },
    {
      id: 5,
      position: new Vector3(-2, 0, 0),
      cameraPosition: new Vector3(-2, 0, 0),
      cameraLookAt: new Vector3(-2, 0, 0),
    },
    {
      id: 6,
      position: new Vector3(-1.2, 0.2, 0),
      cameraPosition: new Vector3(-1, 0, 0),
      cameraLookAt: new Vector3(-1, 0, 0),
    },
    {
      id: 7,
      position: new Vector3(-1.4, 0.4, 0),
      cameraPosition: new Vector3(-2, 0, 0),
      cameraLookAt: new Vector3(-2, 0, 0),
    },
    {
      id: 8,
      position: new Vector3(-1.6, 0.6, 0),
      cameraPosition: new Vector3(-2, 0, 0),
      cameraLookAt: new Vector3(-2, 0, 0),
    },
    {
      id: 9,
      position: new Vector3(-1.8, 0.8, 0),
      cameraPosition: new Vector3(-2, 0, 0),
      cameraLookAt: new Vector3(-2, 0, 0),
    },
    {
      id: 10,
      position: new Vector3(-2, 1, 0),
      cameraPosition: new Vector3(-2, 0, 0),
      cameraLookAt: new Vector3(-2, 0, 0),
    },
  ])
  const controls = useRef(null!)
  const [selectedAnnotationNumber, setSelectedAnnotationNumber] = useState(0)

  const { edit, ...props } = useControls({
    edit: true,
  })

  const clickedAnnotation = (index: number) => {
    setSelectedAnnotationNumber(index)
    setCameraMoving(true)
  }

  return (
    <Canvas onPointerDown={() => setCameraMoving(false)} onWheel={() => setCameraMoving(false)}>
      <color attach='background' args={[196, 196, 196]} />
      <ambientLight />

      <Suspense fallback={<ProgressLoading />}>
        <Model
          annotationList={annotationList}
          setAnnotationList={setAnnotationList}
          url={'/model/dragon/cute_dragon_low.glb'}
        >
          {annotationList.map((a, index) => (
            <NumberAnnotation
              key={index}
              clickedId={selectedAnnotationNumber}
              edit={edit}
              annotation={a}
              onClick={() => clickedAnnotation(index)}
            />
          ))}
        </Model>
      </Suspense>

      {/* <CameraMoving
        controls={controls}
        lerping={cameraMoving}
        destination={annotationList[selectedAnnotationNumber]?.cameraPosition}
        lookAt={annotationList[selectedAnnotationNumber]?.cameraLookAt}
      /> */}
      <OrbitControls ref={controls} />
    </Canvas>
  )
}
