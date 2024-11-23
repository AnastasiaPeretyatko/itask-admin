import React from 'react'
import Lottie from 'lottie-react'
import animationData from '@/assets/animation/not-found.json'

const NotFoundImage = () => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      style={{ maxHeight: 500, maxWidth: 500 }}
    />
  )
}

export default NotFoundImage
