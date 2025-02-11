import React from "react"
import { GetServerSideProps } from "next"

type dataItems = {
  id: number
  name: string
}

const ProductDetail = ({ data }: { data: dataItems }) => {
  return <div>{data?.name}</div>
}

export default ProductDetail

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/comments/${context.params?.id}`
  )
  const data = await res.json()

  return { props: { data } }
}
