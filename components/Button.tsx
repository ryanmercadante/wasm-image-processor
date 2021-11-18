import * as React from 'react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className='flex justify-center items-center bg-pink-600 py-2 w-full mb-3 text-white cursor-pointer font-bold rounded-md shadow-md'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
