import Navbar from "./components/navbar"
import { create } from "zustand"
import { Outlet } from "react-router-dom"

interface ContextProps {
  language: string
  editorData: string
  duplicateData: string
  updateDuplicateData: (duplicateData: string) => void
  updateLanguage: (newLang: string) => void
  updateEditorData: (newValue: string) => void
}

export const zustStore = create<ContextProps>()((set) => (
  {
    language: "plaintext",
    editorData: "",
    duplicateData: "",
    updateDuplicateData: (newData) => set(() => ({ duplicateData: newData })),
    updateLanguage: (newLanguage) => set(() => ({ language: newLanguage })),
    updateEditorData: (newEditorData) => set(() => ({ editorData: newEditorData })),
  }
))

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
