import Editor, { loader } from "@monaco-editor/react"
import { BRILLIANCE_THEME } from "../../utils/theme"
import type { editor } from "monaco-editor"
import { zustStore } from "../../App"

const opts: editor.IStandaloneEditorConstructionOptions = {
  minimap: {
    enabled: false,
  },
  quickSuggestions: false,
}

const MonacoEditor = () => {
  const { updateEditorValue } = zustStore()

  function handleEditorChange(value: any) {
    updateEditorValue(value)
  }
  const { language } = zustStore()
  loader.init().then(async (monaco) => {
    monaco.editor.defineTheme("brilliance", BRILLIANCE_THEME)
  })
  return (
    <Editor
      height="100%"
      options={opts}
      theme="brilliance"
      language={language}
      onChange={handleEditorChange}
    />
  )
}
export default MonacoEditor
