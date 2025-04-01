"use client"

import Auth from "@/models/Auth"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa"
import { MdOutlineDoneOutline, MdWarningAmber } from "react-icons/md"
import { checkCode, markDownloaded } from "@/action/state.action"
import { generateImage } from "@/action/image.action"

function Home() {
  const [process, setProcess] = useState<"checking" | "success" | "error">("checking")
  const [username, setUsername] = useState<string | null>(null)

  const state = useSearchParams().get("state")
  const code = useSearchParams().get("code")

  const handleDownload = async () => {  
    if(username === null || state === null) return
    const image = await generateImage(username)

    const blob = new Blob([image], { type: "image/png" })

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `tac-${username}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
    await markDownloaded(state)
  }

  useEffect(() => {
    if (state === null || code === null) return
    const findRequest = async () => {
      try{
        const request = await checkCode(state, code)
        setUsername(request)
        setProcess("success")
      }catch(err){
        setProcess("error")
      }
    }

    findRequest()
  }, [])

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100 font-montserrat">
      <Image
        src="/tac.png"
        alt="background"
        width={800}
        height={800}
        className="absolute z-0 transform max-h-screen"
      ></Image>
      <p className="text-sm absolute bottom-3">~ nawadotdev</p>
      <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center space-y-2 z-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">TAC.Build</h1>
        {(state === null || code === null) ? (
          <div className="flex items-center space-x-2 flex-col">
            <MdWarningAmber size={24} />
            <p>Invalid request.</p>
          </div>
        ) : (
          <>
            {process === "checking" && (
              <div className="flex items-center space-x-2 flex-col">
                <FaSpinner className="animate-spin" size={24} />
                <p>Checking...</p>
              </div>
            )}
            {process === "success" && (
              <div className="flex items-center space-y-4 flex-col">
                <div className="flex items-center space-x-2">
                  <MdOutlineDoneOutline size={24}/>
                  <p>Authenticated</p>
                </div>
                <button
                  onClick={handleDownload}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 active:bg-blue-300">
                  Download Image
                </button>
              </div>
            )}
            {process === "error" && (
              <div className="flex items-center space-x-2 flex-col">
                <MdWarningAmber size={24} />
                <p>Authentication failed</p>
              </div>
            )}
          </>)}
      </div>
    </div>
  )


}

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  )
}
