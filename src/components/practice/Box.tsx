'use client'

import { ThreeElements, useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

export default function Box(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)

  // animate
  useFrame((state, delta) => (ref.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={isClick ? 1.5 : 1}
      onClick={() => setIsClick(!isClick)}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={isHover ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
