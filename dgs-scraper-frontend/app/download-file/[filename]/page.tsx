"use client"

import { useMemo } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DownloadFilePage() {
  const params = useParams() as { filename?: string }
  const filename = params?.filename || ""
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  const downloadHref = useMemo(() => {
    if (!filename) return "#"
    return `${apiBase}/api/downloads/${filename}`
  }, [apiBase, filename])

  if (!filename) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-700">Invalid file.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-6 text-center">
        <h1 className="text-xl font-semibold mb-2">Your report is ready</h1>
        <p className="text-sm text-gray-600 mb-6 break-all">{filename}</p>
        <Button asChild>
          <a href={downloadHref}>Download document</a>
        </Button>
      </div>
    </div>
  )
}
