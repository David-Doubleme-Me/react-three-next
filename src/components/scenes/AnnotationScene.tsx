'use client'

import { OrbitControls, useGLTF, Stage, Html } from '@react-three/drei'
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'
import { MutableRefObject, Ref, Suspense, useRef, useState, forwardRef, RefObject } from 'react'
import { Color, Group, Vector3 } from 'three'
import { GLTF } from 'three-stdlib'
import ProgressLoading from '../loading/ProgressLoading'
import NumberAnnotation, { NumberAnnotation as NumberAnnotationType } from '../annotation/NumberAnnotation'

type ModelProps = {
  url: string
  setAnnotation?: React.Dispatch<React.SetStateAction<NumberAnnotationType>>
}

const Model = forwardRef<Group, ModelProps>(({ url, setAnnotation }, ref) => {
  const { scene } = useGLTF(url) as GLTF

  scene.updateMatrixWorld()

  scene.userData = { url }

  const onClick = (event: ThreeEvent<MouseEvent>) => {
    const { camera, point } = event
    const position = point
    const cameraPosition = camera.position
    const cameraLookAt = new Vector3()
    camera.getWorldDirection(cameraLookAt)

    if (setAnnotation) {
      setAnnotation({
        id: 1,
        position,
        cameraPosition,
        cameraLookAt,
      })
      console.log({
        id: 1,
        position,
        cameraPosition,
        cameraLookAt,
      })
    }
  }

  return (
    <group ref={ref} onClick={onClick}>
      <primitive object={scene} />
    </group>
  )
})
Model.displayName = 'Model'

// interface ModelProps {
//   name: string
// }

// const Model = forwardRef<Group, ModelProps>(({ name }, ref) => {
//   // ref와 함께 useGLTF를 사용하여 GLTF를 가져오기
//   const { scene } = useGLTF(`/path/to/models/${name}.gltf`) as GLTF

//   return (
//     <group ref={ref}>
//       <primitive object={scene} />
//     </group>
//   )
// })

// Model.displayName = 'model'

type CameraMovingProp = {
  controls: any
  lerping: boolean
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
  id: 1,
  position: {
    x: 0.6482248782218871,
    y: 0.9286947910093278,
    z: 0.32341331062337886,
  },
  cameraPosition: {
    x: 0.7922167266480123,
    y: 4.764404534270398,
    z: 2.0700422530073093,
  },
  cameraLookAt: {
    x: -0.04505171390595642,
    y: -0.9530492785569236,
    z: -0.299445179818049,
  },
} as NumberAnnotationType

export default function AnnotationScene() {
  const [annotation, setAnnotation] = useState<NumberAnnotationType>(ANNOTATION)
  const [cameraMoving, setCameraMoving] = useState(false)
  const [selectedAnnotationNumber, setSelectedAnnotationNumber] = useState(0)
  const [displayHtml, setDisplayHtml] = useState(true)
  const updateDisplayHtml = (visible: boolean) => {
    setDisplayHtml(visible)
    return null
  }
  const controls = useRef(null!)
  const model = useRef(null!)

  const clickedAnnotation = (index: number) => {
    setSelectedAnnotationNumber(index)
    setCameraMoving(true)
  }

  return (
    <Canvas>
      <color attach='background' args={[196, 196, 196]} />
      <ambientLight />

      <Suspense fallback={<ProgressLoading />}>
        {/* <Stage intensity={0.5} shadows='contact' environment='city'> */}
        <Model ref={model} url={'/model/robot/dji.glb'} setAnnotation={setAnnotation} />
        {/* </Stage> */}
      </Suspense>

      {annotation && (
        <NumberAnnotation
          annotation={annotation}
          clickedId={selectedAnnotationNumber}
          onClick={() => clickedAnnotation(annotation.id)}
        />
      )}

      {/* {annotation && (
        <>
          <CameraMoving
            controls={controls}
            lerping={cameraMoving}
            destination={annotation.cameraPosition}
            lookAt={annotation.cameraLookAt}
          />
        </>
      )} */}

      {/* <Html
        occlude={[model]}
        onOcclude={updateDisplayHtml}
        position={[annotation.position.x, annotation.position.y, annotation.position.z]}
        style={{
          transition: 'all 0.5s',
          opacity: displayHtml ? 0 : 1,
          transform: `scale(${displayHtml ? 0.5 : 1})`,
        }}
      >
        <div className='cursor-pointer' onClick={() => clickedAnnotation(annotation.number)}>
          <div
            className={
              'flex justify-center items-center w-[24px] border-2 border-slate-50 h-[24px] p-4 font-bold text-white rounded-full bg-black/70'
            }
          >
            {annotation.number}
          </div>
        </div>
      </Html> */}

      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors(new Color('red'), new Color('green'), new Color('blue'))}
      />

      <OrbitControls ref={controls} />
    </Canvas>
  )
}
