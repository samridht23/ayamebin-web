import Editor, { loader } from "@monaco-editor/react"
import { BRILLIANCE_THEME } from "../../utils/theme"
import type { editor } from "monaco-editor"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
const Paste = () => {
  const [editorValue, setEditorValue] = useState("")
  const [lang, setLang] = useState("")
  const [loading, setLoading] = useState(true)
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
  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/document/${urlParams.pasteId}`, {
        method: 'GET'
      })
      if (response.ok) {
        const data = await response.json()
        setEditorValue(data.paste_data)
        setLang(data.lang)
        setLoading(false)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="mt-[50px] fixed h-[100vh] w-[100vw]">
      {!loading && (
        <Editor
          height="100%"
          options={opts}
          theme="brilliance"
          language={lang}
          defaultValue={editorValue}
        />
      )}
    </div>
  )
}
export default Paste
