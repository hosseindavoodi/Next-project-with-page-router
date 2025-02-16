import Link from "next/link"
import React from "react"

const Navbar = () => {
  return (
    <div className="flex gap-6 mb-8">
      <Link href="/">Home</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/gallery">Gallery</Link>
    </div>
  )
}

export default Navbar
