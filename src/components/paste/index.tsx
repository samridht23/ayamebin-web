import Editor, { loader } from "@monaco-editor/react"
import { BRILLIANCE_THEME } from "../../utils/theme"
import type { editor } from "monaco-editor"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { zustStore } from "../../App"
import clsx from "clsx"
import Logo from "../logo"

const Paste = () => {
  const [editorData, setEditorData] = useState("")
  const [editorLanguage, setEditorLanguage] = useState("")
  const [editorLoading, setEditorLoading] = useState(true)
  const [noPasteError, setNoPasteError] = useState(false)

  const opts: editor.IStandaloneEditorConstructionOptions = {
    minimap: {
      enabled: false,
    },
    quickSuggestions: false,
    readOnly: true
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
        setEditorLoading(false)
        updateLanguage(data.lang)
        updateDuplicateData(data.paste_data)
      } else if (response.status === 400) {
        setNoPasteError(true)
      }
      else {
        throw Error("Error fetching document")
      }
    }
    catch (error) {
      console.log("Error fetching document:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="mt-[50px] fixed h-[100vh] w-[100vw]">
      {!editorLoading && (
        <Editor
          height="100%"
          options={opts}
          theme="brilliance"
          language={editorLanguage}
          defaultValue={editorData}
        />
      )}
      {noPasteError &&
        <div
          className={clsx(
            "w-full h-[90%] flex items-center justify-center"
          )}>
          <div className="flex flex-col w-full justify-center items-center gap-4">
            <div><Logo /></div>
            <div className="w-1/2 text-center">
              This paste does not exists or expired and is no longer avaliable.
            </div>

          </div>
        </div>
      }
    </div>
  )
}
export default Paste
