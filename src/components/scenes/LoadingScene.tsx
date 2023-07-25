'use client'

import { OrbitControls, useGLTF, Stage, useAnimations, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { Color } from 'three'
import { useControls } from 'leva'
import ProgressLoading from '../loading/ProgressLoading'

const Robot = () => {
  const { scene, animations } = useGLTF('/model/robot/gun-bot.glb')
  const { mixer, names, actions, clips } = useAnimations(animations, scene)
  scene.updateMatrixWorld()

  const { play, speed, animation, ...props } = useControls({
    play: false,
    animation: { options: names },
    speed: { value: 1, min: 0.01, max: 3, step: 0.01 },
  })

  mixer.timeScale = speed

  useEffect(() => {
    if (play) {
      actions[animation]?.reset().fadeIn(0.5).play()
    } else {
      mixer.stopAllAction()
    }
    return () => {
      actions[animation]?.fadeOut(0.5)
    }
  }, [animation, play])

  return <primitive object={scene} />
}

export default function LoadingScene() {
  return (
    <Canvas>
      <color attach='background' args={[196, 196, 196]} />
      <ambientLight />

      <Suspense fallback={<ProgressLoading />}>
        <Stage intensity={0.5} shadows='contact' environment='city'>
          <Robot />
        </Stage>
      </Suspense>

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
