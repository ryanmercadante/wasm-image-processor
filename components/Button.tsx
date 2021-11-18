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
      className='flex justify-center items-center bg-pink-600 py-4 mx-4 text-white cursor-pointer font-bold rounded-md shadow-md lg:px-8 lg:py-4'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
