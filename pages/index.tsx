import Head from 'next/head'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ActionsContainer } from '../components/ActionsContainer'
import { RustApp } from '../utils/constants'

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [imageSrc, setImageSrc] = useState<string>('')
  const [transformedImageSrc, setTransformedImageSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [wasm, setWasm] = useState<RustApp | null>(null)

  const renderImage = useCallback(() => {
    if (imageSrc) {
      return (
        <img className='w-auto mx-auto' src={imageSrc} alt='Processed image' />
      )
    }
  }, [imageSrc])

  const renderTransformedImage = useCallback(() => {
    if (transformedImageSrc) {
      return (
        <img
          className='w-auto mx-auto'
          src={transformedImageSrc}
          alt='Processed image'
        />
      )
    }
  }, [transformedImageSrc])

  const renderLoadingMessage = useCallback(() => {
    if (isLoading) {
      return <p>Transforming image...</p>
    }
  }, [isLoading])

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(fileInputRef?.current?.files?.[0] as Blob)
    fileReader.onloadend = () => {
      const result = fileReader?.result as string
      setImageSrc(result)
    }
    setTransformedImageSrc('')
  }

  function getBase64() {
    setIsLoading(true)
    const src = transformedImageSrc ? transformedImageSrc : imageSrc
    const base64 = src.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
    return base64
  }

  function blur() {
    if (!wasm) return

    const imageDataUrl = wasm.blur(getBase64(), 3)
    setTransformedImageSrc(imageDataUrl as string)
    setIsLoading(false)
  }

  function grayscale() {
    if (!wasm) return

    const imageDataUrl = wasm.grayscale(getBase64())
    setTransformedImageSrc(imageDataUrl as string)
    setIsLoading(false)
  }

  function brighten(value: number) {
    if (!wasm) return

    const imageDataUrl = wasm.brighten(getBase64(), value)
    setTransformedImageSrc(imageDataUrl as string)
    setIsLoading(false)
  }

  async function initWasm() {
    let rustApp = null

    try {
      rustApp = await import('../pkg')
    } catch (err) {
      console.error(err)
      return
    }

    setWasm(rustApp)
  }

  useEffect(() => {
    initWasm()
  }, [])

  return (
    <div className='flex justify-center items-center my-32'>
      <Head>
        <title>Image Effects</title>
        <meta
          name='description'
          content='Upload an image and add a grayscale effect!'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='bg-white bg-opacity-75 border rounded-lg shadow-lg w-9/12 text-center flex flex-col justify-center items-center p-10'>
        <h1 className='text-4xl md:text-5xl mb-8'>Image Effects</h1>
        <p className='mb-4 lg:text-2xl lg:mx-16'>
          Need to do some basic image manipulation? Just upload your image
          below. We'll take care of the rest.
        </p>
        <div className='flex flex-col justify-center mb-4 lg:flex-row'>
          <label className='flex justify-center items-center bg-pink-600 py-3 px-6 w-full mb-3	text-white cursor-pointer font-bold rounded-md shadow-md md:px-8 lg:mb-0'>
            <input
              type='file'
              id='upload'
              accept='.png'
              className='hidden'
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
            Upload PNG Image
          </label>
        </div>
        <div className='grid grid-cols-1 gap-2 lg:grid-cols-3 lg:max-w-6xl lg:mx-auto'>
          <div className='p-4 flex items-center justify-center'>
            {renderImage()}
          </div>
          <div className='p-4'>
            {imageSrc && (
              <ActionsContainer
                grayscale={grayscale}
                blur={blur}
                brighten={brighten}
              />
            )}
          </div>
          <div className='p-4 flex items-center justify-center'>
            {isLoading ? renderLoadingMessage() : renderTransformedImage()}
          </div>
        </div>
      </div>
    </div>
  )
}
