import { useState, ChangeEvent, FormEvent } from "react"
import { useMutation } from "@tanstack/react-query"

type FormDataType = {
  name: string
  email: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
  })
  const [message, setMessage] = useState<string>("")

  const mutation = useMutation({
    mutationFn: async (data: FormDataType) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      return response.json()
    },
    onSuccess: () => {
      setMessage("Message sent successfully!")
      setFormData({ name: "", email: "" })
    },
    onError: () => {
      setMessage("Error sending message.")
    },
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage("Sending...")
    mutation.mutate(formData)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={mutation.status === "pending"}
        >
          {mutation.status === "pending" ? "Sending..." : "Send"}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </div>
  )
}
