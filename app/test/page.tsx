'use client'

import Box from '@/components/practice/Box'
import { Canvas } from '@react-three/fiber'
import React from 'react'

export default function TestPage() {
  return (
    <div className='w-full h-full'>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
  )
}
