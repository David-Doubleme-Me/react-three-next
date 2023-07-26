type Props = {
  imageUrl: string
  frame: number
  widthOfImage: number
  heightOfImage: number
}

export default function SpriteImage({ imageUrl, frame, widthOfImage, heightOfImage }: Props) {
  /**
   * width 100%에서 프레임 한장이 차지하는 비율
   * ex) 100% / 15장 = 6.66%
   */
  const frameRatio = 100 / frame
  const backgroundRatio = frame * 100
  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrl})`,
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    const eventTarget = event.target as HTMLDivElement
    const { left, width } = eventTarget.getBoundingClientRect()
    const mouseX = event.clientX - left

    const x = (mouseX / width) * 100
    const frameIndex = Math.round(x / frameRatio)
    const spritePositionX = frameIndex * widthOfImage
    eventTarget.style.backgroundPosition = `${spritePositionX}px 0`
  }

  const handleMouseOut = (event: React.MouseEvent) => {
    const eventTarget = event.target as HTMLDivElement
    eventTarget.style.backgroundPosition = `0px 0`
  }

  return (
    <div
      style={backgroundImageStyle}
      className={`w-[${widthOfImage}px] h-[${heightOfImage}px] bg-[length:${backgroundRatio}%_auto]`}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    />
  )
}
