'use client'

import React from 'react'
import '@google/model-viewer'

export default function ModelViewerScene() {
  return (
    <div>
      <model-viewer src='/dog.glb' alt='A 3D model' shadow-intensity='1' camera-controls autoplay ar></model-viewer>
    </div>
  )
}
