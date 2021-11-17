import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface RustApp {
  grayscale(encoded_file: string): string
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const [imageSrc, setImageSrc] = useState('')
  const [wasm, setWasm] = useState<RustApp | null>(null)

  function handleFileUpload() {
    const fileReader = new FileReader()

    fileReader.readAsDataURL(fileInputRef?.current?.files?.[0] as Blob)

    fileReader.onloadend = () => {
      const result = fileReader?.result as string
      const base64 = result.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
      const imageDataUrl = wasm?.grayscale(base64)
      setImageSrc(imageDataUrl as string)
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

      <div className='flex items-center justify-center h-screen relative z-100'>
        <div className='bg-white bg-opacity-95 border shadow-lg p-10 text-center max-w-2xl'>
          <h1 className='text-5xl mb-8'>Image Effects</h1>
          <p className='mb-4'>
            Need to do some basic image manipulation? Just upload your image
            below. We'll take care of the rest.
          </p>
          <label className='bg-pink-600	text-white w-full p-6 block cursor-pointer font-bold mb-4'>
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
          {imageSrc && (
            <img
              className='w-auto mx-auto'
              src={imageSrc}
              alt='Processed image'
            />
          )}
        </div>
      </div>
    </>
  )
}
