import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ArticleForm from '../components/ArticleForm'
import ImageUploader from '../service/image_uploader'

const imageUploader = new ImageUploader()

function Writing() {
  const { state } = useLocation()
  const rand_1_3 = Math.floor(Math.random() * 3) + 1
  const [data] = useState({
    word: state,
    message: '',
    fileURL: `/images/${rand_1_3}.svg`,
  })

  return (
    <div>
      <ArticleForm imageUploader={imageUploader} data={data} />
    </div>
  )
}

export default Writing
