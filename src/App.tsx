import Navbar from "./components/navbar"
import { create } from "zustand"
import { Outlet } from "react-router-dom"

interface ContextProps {
  language: string
  editorValue: string
  updateLang: (newLang: string) => void
  updateEditorValue: (newValue: string) => void
}

export const zustStore = create<ContextProps>()((set) => (
  {
    language: "text",
    editorValue: "",
    updateLang: (newLang) => set(() => ({ language: newLang })),
    updateEditorValue: (newEditorValue) => set(() => ({ editorValue: newEditorValue })),
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
