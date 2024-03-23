import Navbar from "./components/navbar"
import { create } from "zustand"
import { Outlet } from "react-router-dom"

interface ContextProps {
  language: string
  editorData: string
  duplicateData: string
  responseNotFound: boolean
  updateDuplicateData: (duplicateData: string) => void
  updateResponseNotFound: (response: boolean) => void
  updateLanguage: (newLang: string) => void
  updateEditorData: (newValue: string) => void
}

export const zustStore = create<ContextProps>()((set) => (
  {
    language: "plaintext",
    editorData: "",
    duplicateData: "",
    responseNotFound: false,
    updateDuplicateData: (newData) => set(() => ({ duplicateData: newData })),
    updateResponseNotFound: (response) => set(() => ({ responseNotFound: response })),
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
