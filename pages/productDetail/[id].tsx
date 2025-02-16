import React from "react"
import { GetServerSideProps } from "next"

type dataItems = {
  id: number
  name: string
  body: string
}

const ProductDetail = ({ data }: { data: dataItems }) => {
  return (
    <div>
      <h1>{data?.name}</h1>
      <div>{data?.body}</div>
    </div>
  )
}

export default ProductDetail

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${context.params?.id}`
  )
  const data = await res.json()

  return { props: { data } }
}
