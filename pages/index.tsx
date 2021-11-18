import Head from 'next/head'
import Image from 'next/image'
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

interface RustApp {
  grayscale(encoded_file: string): string
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [imageSrc, setImageSrc] = useState('')
  const [transformedImageSrc, setTransformedImageSrc] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [wasm, setWasm] = useState<RustApp | null>(null)

  const renderImage = useMemo(() => {
    if (imageSrc) {
      return (
        <img className='w-auto mx-auto' src={imageSrc} alt='Processed image' />
      )
    }
  }, [imageSrc])

  const renderTransformedImage = useMemo(() => {
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

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(fileInputRef?.current?.files?.[0] as Blob)
    fileReader.onloadend = () => {
      const result = fileReader?.result as string
      setImageSrc(result)
    }
  }

  function transformImage() {
    setIsLoading(true)
    const fileReader = new FileReader()
    fileReader.readAsDataURL(fileInputRef?.current?.files?.[0] as Blob)
    fileReader.onloadend = () => {
      const result = fileReader?.result as string
      const base64 = result.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
      const imageDataUrl = wasm?.grayscale(base64)
      setIsLoading(false)
      setTransformedImageSrc(imageDataUrl as string)
    }
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
    <>
      <Head>
        <title>Image Effects</title>
        <meta
          name='description'
          content='Upload an image and add a grayscale effect!'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex flex-col items-center justify-center h-screen relative z-100 rounded-lg shadow-lg'>
        <div className='bg-white bg-opacity-60 border shadow-lg p-16 text-center w-9/12'>
          <h1 className='text-4xl md:text-5xl mb-8'>Image Effects</h1>
          <p className='mb-4 lg:text-2xl'>
            Need to do some basic image manipulation? Just upload your image
            below. We'll take care of the rest.
          </p>
          <div className='flex flex-col justify-center mb-4 lg:flex-row'>
            <label className='flex justify-center items-center bg-pink-600 py-4 mx-4	text-white cursor-pointer font-bold rounded-md shadow-md mb-4 lg:px-8 lg:py-4 lg:mb-0'>
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
            <button
              className='flex justify-center items-center bg-pink-600 py-4 mx-4 text-white cursor-pointer font-bold rounded-md shadow-md lg:px-8 lg:py-4'
              onClick={transformImage}
            >
              Transform Image
            </button>
          </div>
          <div className='grid grid-cols-1 gap-2 lg:grid-cols-2 lg:max-w-6xl lg:mx-auto'>
            <div className='p-4'>{renderImage}</div>
            <div className='p-4 flex items-center justify-center'>
              {isLoading ? (
                <p className=''>Transforming image...</p>
              ) : (
                renderTransformedImage
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
