'use client'

import { Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, ThreeEvent } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Color, Vector3 } from 'three'
import { GLTF, OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import ProgressLoading from '../loading/ProgressLoading'

type ModelProps = {
  url: string
  isAnnotationMove: boolean
  setPointerOver: React.Dispatch<React.SetStateAction<boolean>>
  setPointerPosition: React.Dispatch<React.SetStateAction<Vector3>>
}

const Model = ({ url, isAnnotationMove, setPointerOver, setPointerPosition }: ModelProps) => {
  const { scene } = useGLTF(url) as GLTF
  scene.updateMatrixWorld()

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isAnnotationMove) {
      return
    }

    // 포지션 업데이트
    const { intersections } = event
    const position = intersections[0].point
    setPointerPosition(position)
  }

  return (
    <group
      onDoubleClick={() => console.log('model double click')}
      onPointerOver={() => setPointerOver(true)}
      onPointerOut={() => setPointerOver(false)}
      onPointerMove={handlePointerMove}
    >
      <primitive object={scene} />
    </group>
  )
}

export default function DragScene() {
  const numberClasses = `flex justify-center items-center w-[24px] border-2 border-slate-50 h-[24px] p-4 font-bold text-white rounded-full bg-black/70`
  const [isDragging, setIsDragging] = useState(false)
  const [isMouseOverModel, setIsMouseOverModel] = useState(false)
  const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, 0))
  const controller = useRef<OrbitControlsImpl>(null!)

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    controller.current.enabled = false
    setIsDragging(true)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    controller.current.enabled = true
    setIsDragging(false)
  }

  return (
    <Canvas onPointerUp={handlePointerUp}>
      <color attach='background' args={[50, 50, 50]} />
      <ambientLight />

      <Suspense fallback={<ProgressLoading />}>
        <Model
          url={'/dog.glb'}
          setPointerOver={setIsMouseOverModel}
          setPointerPosition={setPosition}
          isAnnotationMove={isDragging}
        />
      </Suspense>

      <group>
        <Html as='div' position={[position.x, position.y, position.z]}>
          <div className='relative'>
            <div
              className={`mypoi ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} absolute -top-4 -left-4`}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
            >
              <div className={numberClasses}>{10}</div>
            </div>
          </div>
        </Html>
      </group>

      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors(new Color('red'), new Color('green'), new Color('blue'))}
      />

      <OrbitControls ref={controller} makeDefault />
    </Canvas>
  )
}
