import { GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useControls } from 'leva'

export default function CommonViewport() {
  const { marginX, marginY, ...props } = useControls({
    marginX: { value: 80, min: 0, max: 300, step: 1 },
    marginY: { value: 80, min: 0, max: 300, step: 1 },
  })

  return (
    <GizmoHelper
      alignment='bottom-right' // 장면 내 위젯 정렬
      margin={[marginX, marginY]} // 위젯 여백 (X, Y)
      /* 카메라 애니메이션 도중 호출됨 */
      onUpdate={undefined}
      /* 현재 카메라 타겟을 반환 (예: 오비트 컨트롤에서)하여 애니메이션 중앙으로 이동 */
      onTarget={undefined}
      /* 만약 다른 useFrame(..., 1)가 있을 경우, helper가 사라지지 않도록 renderPriority 사용 */
      renderPriority={1}
    >
      <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor='black' />
      {/* 또는 대체로 <GizmoViewcube /> 사용 */}
    </GizmoHelper>
  )
}
