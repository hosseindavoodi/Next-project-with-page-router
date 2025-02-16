import { NextApiRequest, NextApiResponse } from "next"

interface RequestBody {
  name: string
  email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  try {
    const { name, email }: RequestBody = req.body

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" })
    }

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })

    if (!response.ok) {
      throw new Error("Failed to send data")
    }

    const data = await response.json()
    return res.status(200).json({ message: "Message sent successfully", data })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}
