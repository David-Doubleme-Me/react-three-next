import { Html } from '@react-three/drei'
import { Vector3 } from 'three'

type Annotation = {
  position: Vector3
  cameraPosition: Vector3
  cameraLookAt: Vector3
}

export type NumberAnnotation = Annotation & {
  number: number
}

type Props = {
  annotation: NumberAnnotation
  onClick: () => void
}

export default function NumberAnnotation({ annotation, onClick }: Props) {
  const { number, position } = annotation
  const { x, y, z } = position

  const handleCameraMove = () => {
    onClick()
  }

  const numberClasses =
    'flex justify-center items-center w-[24px] border-2 border-slate-50 h-[24px] p-4 font-bold text-white rounded-full bg-black/70'

  return (
    <>
      {annotation && (
        <Html transform occlude position={[x, y, z]}>
          <div className='cursor-pointer' onClick={handleCameraMove}>
            <div className={numberClasses}>{number}</div>
          </div>
        </Html>
      )}
    </>
  )
}
