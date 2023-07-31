import { Html } from '@react-three/drei'
import { useState } from 'react'
import { Vector3 } from 'three'

type Annotation = {
  position: Vector3
  cameraPosition: Vector3
  cameraLookAt: Vector3
}

export type NumberAnnotation = Annotation & {
  id: number
}

type Props = {
  annotation: NumberAnnotation
  clickedId: number
  onClick?: () => void
  edit: boolean
}

export default function NumberAnnotation({ annotation, onClick, edit }: Props) {
  const { id, position } = annotation
  const { x, y, z } = position
  const [hidden, setHidden] = useState(false)

  const handleCameraMove = () => {
    onClick && onClick()
  }

  const handleVisible = (visible: boolean) => {
    if (edit) {
      setHidden(visible)
    }
    return null
  }

  const numberClasses = `flex justify-center items-center w-[24px] border-2 border-slate-50 h-[24px] p-4 font-bold text-white rounded-full bg-black/70 ${
    hidden ? 'opacity-50' : 'opacity-100'
  }`

  return (
    <>
      {annotation && (
        <group key={id}>
          <Html occlude={edit} onOcclude={handleVisible} position={[x, y, z]} onClick={handleCameraMove}>
            <div className='cursor-pointer'>
              <div className={numberClasses}>{id}</div>
            </div>
          </Html>
        </group>
      )}
    </>
  )
}
