'use client'

import { OrbitControls, useGLTF, Bounds } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import THREE, { BoxHelper, Color, REVISION } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { LoadingManager } from 'three/src/loaders/LoadingManager'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader' // KTX2Loader import

const manager = new LoadingManager()
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
}

manager.onLoad = function () {
  console.log('Loading complete!')
}

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.')
}

manager.onError = function (url) {
  console.log('There was an error loading ' + url)
}

function Tyrannosaurs() {
  const { gl } = useThree()

  const myLoader = (loader: GLTFLoader) => {
    console.log(REVISION)
    loader.manager = manager
    const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`
    const ktx2Loader = new KTX2Loader(manager).setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`)
    loader.setKTX2Loader(ktx2Loader.detectSupport(gl))
  }

  const { scene } = useGLTF('/model/tyrannosaurs/scene.gltf', false, false, myLoader)
  const result = useGLTF('/ktx.glb', true, false, myLoader)
  const box = new BoxHelper(scene, 0x00000000)
  const box2 = new BoxHelper(result.scene, new Color('skyblue'))

  return (
    <>
      {/* <primitive object={scene} /> */}
      {/* <primitive object={box} /> */}
      <primitive object={result.scene} />
      <primitive object={box2} />
    </>
  )
}

export default function GLTFScene() {
  return (
    <Canvas>
      <color attach='background' args={[196, 196, 196]} />
      <OrbitControls />
      <ambientLight />
      {/* <Suspense fallback={null}>
        <Bounds fit clip margin={1}>
          <Tyrannosaurs />
        </Bounds>
      </Suspense> */}

      <Bounds fit clip margin={1}>
        <Tyrannosaurs />
      </Bounds>
    </Canvas>
  )
}
