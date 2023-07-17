'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { OrbitControls, View as ViewImpl } from '@react-three/drei'

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
      <ViewImpl track={localRef}>
        {children}
        {orbit && <OrbitControls />}
      </ViewImpl>
    </div>
  )
})
View.displayName = 'View'

export { View }
