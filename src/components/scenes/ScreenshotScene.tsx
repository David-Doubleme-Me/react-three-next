'use client'

import { OrbitControls, useGLTF, Stage, useAnimations, Preload } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { Dispatch, SetStateAction, Suspense, useEffect, useRef, useState } from 'react'
import { useControls, button } from 'leva'
import ProgressLoading from '../loading/ProgressLoading'
import GIF from 'gif.js'
import workerStr from '@/worker/gifWorker'

function downloadScreenshot(dataURL: string, filename: string) {
  const link = document.createElement('a')
  link.href = dataURL
  link.download = filename
  link.click()
}

type Props = {
  setScreenshots: Dispatch<SetStateAction<string[]>>
}

const Robot = ({ setScreenshots }: Props) => {
  const { scene, animations } = useGLTF('/model/robot/gun-bot.glb')
  const { mixer, names, actions } = useAnimations(animations, scene)
  const { camera, scene: mainScene, gl } = useThree()

  scene.updateMatrixWorld()

  const takeScreenshot = () => {
    gl.domElement.toBlob((blob) => {
      const result = URL.createObjectURL(blob as Blob)
      setScreenshots((prevScreenshots) => [...prevScreenshots, result])
    })
  }

  const captureGl = () => {
    setScreenshots([])

    let currentRotation = 0
    const totalRotation = Math.PI * 2 // 360 degrees in radians
    // const rotationIncrement = Math.PI / 8 // 22.5 degrees in radians 16장
    const rotationIncrement = Math.PI / 18.182 // 100 degrees in radians 36장

    function animate() {
      if (currentRotation >= totalRotation) {
        // 모든 회전이 완료되면 애니메이션 중지
        return
      }

      camera.lookAt(scene.position)

      // 현재 회전 각도만큼 모델 회전
      scene.rotation.y = currentRotation

      // 스크린샷 찍기
      takeScreenshot()

      // 45?도씩 회전
      currentRotation += rotationIncrement

      // 프레임마다 애니메이션
      requestAnimationFrame(animate)
    }

    // 애니메이션 시작
    animate()
  }

  const { play, speed, animation, ...props } = useControls({
    screenshot: button(captureGl),
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

export default function ScreenshotScene() {
  const [screenshots, setScreenshots] = useState<string[]>([])

  // 스크린샷 합치기
  const combineScreenshots = () => {
    // 빈 캔버스
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const gl = document.getElementById('screenshotCanvas') as HTMLElement

    console.log(screenshots)

    // 가로로 긴 캔버스 크기 설정 (이미지 하나당 가로 크기와 세로 크기를 적절히 조정해주세요)
    // const canvasWidth = screenshots.length * gl.clientWidth
    // const canvasHeight = gl.clientHeight

    // 원본 크기
    canvas.width = gl.clientWidth
    canvas.height = gl.clientHeight

    // 스크린샷들을 가로로 합치기
    let offset = 0
    // screenshots.forEach((url) => {
    //   const image = new Image()
    //   image.src = url

    //   // 이미지를 캔버스에 그리기
    //   image.onload = () => {
    //     context.drawImage(image, offset, 0, gl.clientWidth, gl.clientHeight)
    //     offset += gl.clientWidth
    //     console.log(offset)
    //   }
    // })

    const image = new Image()
    image.src = screenshots[0]
    console.log(screenshots[0])

    // 이미지를 캔버스에 그리기
    image.onload = () => {
      context.drawImage(image, 0, 0, image.width, image.width)
      offset += gl.clientWidth
      console.log('image onload')
    }

    console.log('엥 로드가 안됐는데 ')

    // 합쳐진 이미지를 데이터 URL로 변환
    const combinedDataURL = canvas.toDataURL('image/png')

    // 합쳐진 이미지 사용 (이미지를 표시하거나 다운로드 등)
    downloadScreenshot(combinedDataURL, 'combinedDataUrl')
  }

  // ---

  // 이미지 로드를 Promise로 감싸는 함수
  function loadImage(url: string) {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => resolve(image)
      image.onerror = (error) => reject(error)
      image.src = url
    })
  }

  // 이미지들을 합치는 작업
  function combineImages(images: any) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    // 가로로 긴 캔버스 크기 설정
    // canvas.width = images.reduce((totalWidth: number, image: any) => totalWidth + image.width, 0)
    // canvas.height = Math.max(...images.map((image: any) => image.height))
    // 9600 * 360

    // 고정
    canvas.width = 9600
    canvas.height = 360

    const imageWidth = 640
    const imageHeight = 360

    let offsetX = 0
    images.forEach((image: any) => {
      context.drawImage(image, offsetX, 0, imageWidth, imageHeight)
      offsetX += imageWidth
    })

    // 합쳐진 이미지를 데이터 URL로 변환 -> webp 변환 필요
    const combinedDataURL = canvas.toDataURL('image/png')

    // 합쳐진 이미지 사용 (이미지를 표시하거나 다운로드 등)
    downloadScreenshot(combinedDataURL, 'combine-image')
  }

  function createGifImage(images: any) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const imageWidth = 640
    const imageHeight = 360
    canvas.width = imageWidth
    canvas.height = imageHeight

    const workerBlob = new Blob([workerStr], {
      type: 'application/javascript',
    })

    const encoder = new GIF({
      workers: 2,
      quality: 10,
      width: imageWidth,
      height: imageHeight,
      workerScript: URL.createObjectURL(workerBlob),
    })

    images.forEach((image: any) => {
      context.drawImage(image, 0, 0, imageWidth, imageHeight)
      encoder.addFrame(context, { copy: true, delay: 1000 })
    })

    encoder.on('finished', function (blob) {
      const dataUrl = URL.createObjectURL(blob)
      downloadScreenshot(dataUrl, 'combine-image')
    })

    encoder.render()
  }

  // 여러 이미지들을 로드하는 함수
  async function loadImages(type: 'image' | 'gif') {
    const promises = screenshots.map((url) => loadImage(url))
    try {
      const images = await Promise.all(promises)

      if (type === 'image') {
        combineImages(images)
      } else if (type === 'gif') {
        createGifImage(images)
      }
    } catch (error) {
      console.error('이미지 로드 중 에러 발생:', error)
    }
  }

  return (
    <>
      <Canvas id='screenshotCanvas' gl={{ preserveDrawingBuffer: true }}>
        <color attach='background' args={[196, 196, 196]} />
        <ambientLight />

        <Suspense fallback={<ProgressLoading />}>
          <Stage intensity={0.5} shadows='contact' environment='city'>
            <Robot setScreenshots={setScreenshots} />
          </Stage>
        </Suspense>

        <OrbitControls />
        <Preload all />
      </Canvas>
      {screenshots.length > 0 && (
        <div>
          <div className='absolute top-0 left-0 flex flex-wrap'>
            {screenshots.map((url, index) => (
              <img key={index} src={url} alt={`스크린샷 ${index + 1}`} width={150} height={100} />
            ))}
            <div className='flex flex-col items-center justify-center gap-4'>
              <button className='p-4 bg-gray-200 ' onClick={() => loadImages('image')}>
                이미지 합치기
              </button>
              <button className='p-4 bg-gray-200' onClick={() => loadImages('gif')}>
                gif 만들기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
