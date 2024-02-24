import Editor, { loader } from "@monaco-editor/react"
import { BRILLIANCE_THEME } from "../../utils/theme"
import type { editor } from "monaco-editor"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { zustStore } from "../../App"
import clsx from "clsx"
import { toast } from 'sonner'

const Paste = () => {
  const [editorData, setEditorData] = useState("")
  const [editorLanguage, setEditorLanguage] = useState("")
  const [editorLoading, setEditorLoading] = useState(true)
  const [docNotFound, setDocNotFound] = useState(false)

  const opts: editor.IStandaloneEditorConstructionOptions = {
    minimap: {
      enabled: false,
    },
    quickSuggestions: false,
    readOnly: true,
  }

  loader.init().then(async (monaco) => {
    monaco.editor.defineTheme("brilliance", BRILLIANCE_THEME)
  })

  var urlParams = useParams()

  const { updateDuplicateData, updateLanguage } = zustStore()

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/document/${urlParams.pasteId}`, {
        method: 'GET'
      })
      if (response.ok) {
        const data = await response.json()
        setEditorData(data.paste_data)
        setEditorLanguage(data.lang)
        updateLanguage(data.lang)
        updateDuplicateData(data.paste_data)

        setEditorLoading(false)
      } else if (response.status === 400) {
        setEditorLoading(false)
        setDocNotFound(true)
      }
      else {
        setEditorLoading(false)
        toast.error("Error fetching document. Server responded with status: " + response.status)
        throw Error("Error fetching document")
      }
    }
    catch (error) {
      toast.error("Error fetching document.")
      console.log("Error fetching document:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="mt-[50px] fixed h-[100vh] w-[100vw]">
      {
        docNotFound ?
          <div
            className={clsx(
              "w-full h-[90%] flex items-center justify-center"
            )}>
            <div className="flex flex-col w-full justify-center items-center">
              <div className={clsx(
                "flex flex-col w-5/6 sm:w-3/4 md:w-2/5 border",
                "rounded-md border-neutral-800 p-4 sm:p-6 bg-black"
              )}>
                <div className="text-neutral-400">
                  <span className="font-[CircularBold]">Error :</span> 404 Not Found
                </div>
                <div className="text-neutral-400">
                  <span className="font-[CircularBold]">Message :</span> Either the document has expired or it never existed.
                </div>
              </div>
            </div>
          </div>
          :
          <>
            {editorLoading ?
              <div className="py-2 px-4 box-border flex flex-col gap-2 animate-pulse">
                <div className="block w-12 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-24 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-60 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-32 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-24 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-40 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-12 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-24 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-60 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-32 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-24 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-40 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-24 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-40 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-60 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
                <div className="block w-24 h-[12px] bg-neutral-600 opacity-75 rounded-full" />
              </div>
              :
              <Editor
                height="100%"
                options={opts}
                theme="brilliance"
                language={editorLanguage}
                defaultValue={editorData}
              />
            }
          </>
      }
    </div>
  )
}
export default Paste
