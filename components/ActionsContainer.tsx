import * as React from 'react'
import { Button } from './Button'

export interface ActionsContainerProps {
  blur(): void
  grayscale(): void
  brighten(value: number): void
  flipH(): void
  rotate90(): void
}

export const ActionsContainer = ({
  blur,
  grayscale,
  brighten,
  flipH,
  rotate90,
}: ActionsContainerProps) => {
  return (
    <div className='border border-pink-600 p-3 rounded-md'>
      <h3 className='text-xl mb-2'>Actions</h3>
      <Button onClick={grayscale}>Grayscale</Button>
      <Button onClick={blur}>Blur</Button>
      <Button onClick={() => brighten(3)}>Brighten</Button>
      <Button onClick={() => brighten(-3)}>Darken</Button>
      <Button onClick={flipH}>Flip</Button>
      <Button onClick={rotate90}>Rotate 90°</Button>
    </div>
  )
}
