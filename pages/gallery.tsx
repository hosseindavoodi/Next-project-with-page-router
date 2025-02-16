import React from "react"
import { GetStaticProps } from "next"
import Image from "next/image"

type GalleryItems = {
  id: number
  title: string
  thumbnailUrl: string
}

const Gallery = ({ data, error }: { data: GalleryItems[]; error?: string }) => {
  if (error) {
    return <p className="text-red-500">{error}</p>
  }

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

export default Gallery

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=10"
    )

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    const data = await response.json()

    return { props: { data }, revalidate: 10 }
  } catch (error) {
    console.error("Error fetching data:", error)
    return {
      props: { data: [], error: "Failed to load images" },
      revalidate: 10,
    }
  }
}
