import React from "react"
import { GetStaticProps } from "next"
import Image from "next/image"

type GalleryItems = {
  id: number
  title: string
  thumbnailUrl: string
}

const gallery = ({ data }: { data: GalleryItems[] }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {data.map((image) => (
        <div
          key={image.id}
          className="bg-[#dddddd] lg:w-[calc(33.333%-0.25rem)] md:w-[calc(50%-0.25rem)] sm:w-full"
        >
          <Image
            src={image.thumbnailUrl}
            alt={image.title}
            width={500}
            height={300}
          />
        </div>
      ))}
    </div>
  )
}

export default gallery

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/photos?_limit=10"
  )
  const data = await response.json()

  return { props: { data }, revalidate: 10 }
}
