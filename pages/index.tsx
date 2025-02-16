import { GetStaticProps } from "next"
import Link from "next/link"
import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

type dataItems = {
  id: number
  name: string
}

interface dataProps {
  data: dataItems[]
}

export default function Home({ data }: dataProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} `}>
      {data.map((item) => (
        <p key={item.id}>
          <Link href={`/productDetail/${item.id}`}>
            {item.id} - {item.name}
          </Link>
        </p>
      ))}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/comments")
    const data = await res.json()

    if (!res.ok) {
      console.log("Something is wrong")
    }

    return { props: { data } }
  } catch (error) {
    console.log(error)
    return { props: [] }
  }
}
