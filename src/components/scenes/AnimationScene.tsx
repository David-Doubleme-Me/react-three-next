'use client'

import { OrbitControls, useGLTF, Stage, useAnimations, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import THREE, { Color } from 'three'
import { useControls } from 'leva'

const Robot = () => {
  const { scene, animations } = useGLTF('/model/4.glb')
  const { mixer, names, actions, clips } = useAnimations(animations, scene)
  const [index, setIndex] = useState(0)
  scene.updateMatrixWorld()

  const { play, speed, animation, ...props } = useControls({
    play: false,
    animation: { options: names },
    speed: { value: 1, min: 0.01, max: 3, step: 0.01 },
  })

  mixer.addEventListener('finished', () => {
    if (names.length > index) {
      setIndex((prev) => prev + 1)
    } else {
      setIndex(0)
    }
  })

  mixer.timeScale = speed

  useEffect(() => {
    if (play) {
      actions[names[index]]?.setLoop(2200, 1)
      actions[names[index]]?.reset().fadeIn(0.5).play()
    } else {
      mixer.stopAllAction()
    }
    return () => {
      actions[names[index]]?.fadeOut(0.5)
    }
  }, [index, play])

  return <primitive object={scene} />
}

export default function AnimationScene() {
  return (
    <Canvas>
      <color attach='background' args={[196, 196, 196]} />
      <ambientLight />

      <Stage intensity={0.5} shadows='contact' environment='city'>
        <Robot />
      </Stage>

      <axesHelper
        scale={2}
        position={[0, 0, 0]}
        onUpdate={(self) => self.setColors(new Color('red'), new Color('green'), new Color('blue'))}
      />

      <OrbitControls />
      <Preload all />
    </Canvas>
  )
}
