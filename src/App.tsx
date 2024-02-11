import Navbar from "./components/navbar"
import Home from "./components/home"
import { create } from "zustand"

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
      <Home />
    </>
  )
}

export default App
