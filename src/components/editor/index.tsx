import Editor, { loader } from "@monaco-editor/react"
import { BRILLIANCE_THEME } from "../../utils/theme"
import type { editor } from "monaco-editor"
import { zustStore } from "../../App"

const opts: editor.IStandaloneEditorConstructionOptions = {
  minimap: {
    enabled: false,
  },
  fontFamily: 'JetBrains',
  quickSuggestions: false,
}

const MonacoEditor = () => {

  function handleEditorChange(value: any) {
    updateEditorData(value)
  }

  const { editorData, language, updateEditorData } = zustStore()
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
      defaultValue={editorData}
    />
  )
}
export default MonacoEditor
