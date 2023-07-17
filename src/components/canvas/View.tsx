'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { OrbitControls, View as ViewImpl } from '@react-three/drei'
import { Three } from '@/helpers/components/Three'

type Props = {
  children: React.ReactNode
  orbit?: boolean
  className: string
}

const View = forwardRef(({ children, orbit, className, ...props }: Props, ref) => {
  const localRef = useRef(null!)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <div className={className}>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </div>
  )
})
View.displayName = 'View'

export { View }
