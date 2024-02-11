import Logo from "../logo/"
import * as Select from '@radix-ui/react-select';
import * as Dialog from '@radix-ui/react-dialog';
import { useMemo, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react"
import Languages from "../../utils/languages";
import { zustStore } from "../../App";
import { Link } from "react-router-dom";

interface ExpireyProps {
  value: string;
  label: string,
}


const expirey: ExpireyProps[] = [
  {
    value: "0",
    label: "Burn after read"
  },
  {
    value: "24",
    label: "Expire in 1 Day"
  },
  {
    value: "168",
    label: "Expire in 1 Week"
  },
  {
    value: "1720",
    label: "Expire in 1 Month"
  },
  {
    value: "8760",
    label: "Expire in 1 Year"
  },
]

const Navbar = () => {
  const { editorValue, updateLang } = zustStore()

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpirey, setSelectedExpirey] = useState('168');
  const [selectedLang, setSelectedLang] = useState(Languages[0]);
  const [dialogState, setDialogState] = useState(false)

  const handleLanguageSelection = (data: any) => {
    setSelectedLang(data)
    setDialogState(false)
    updateLang(data.value)
  }
  const handleSubmit = () => {
    const data = {
      value: editorValue,
      expirey: selectedExpirey,
      language: selectedLang.value
    }
    console.log(data)
  }

  const filteredLang = useMemo(() => {
    if (searchTerm === '') {
      return Languages;
    }
    return Languages.filter((lang) => {
      return lang.value.includes(searchTerm.toLowerCase());
    })
  }, [searchTerm]);

  return (
    <div className="z-50 fixed top-0 left-0 w-full bg-[#0a0a0a] border-b border-neutral-800 flex box-border justify-between px-3 h-[50px] items-center">
      <Link to="/" className="flex items-center gap-2">
        <Logo size="20" />
        <div className="text-md font-[CircularBold]">Ayame</div>
      </Link>
      <div>
        <div className="flex gap-2">
          <Dialog.Root
            open={dialogState}
            onOpenChange={() => {
              setDialogState(dialogState => !dialogState)
              setSearchTerm('')
            }}
          >
            <Dialog.Trigger className="border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 py-1 px-2 flex items-center rounded">
              {<selectedLang.icon strokeWidth={1.5} size={"18"} />}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
              />
              <Dialog.Content
                className="overflow-hidden gap-2 flex flex-col h-[400px] fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-neutral-800 bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
              >
                <div className="w-full">
                  <input
                    type="text"
                    className="bg-black border border-neutral-800 text-[#FAFAFA] text-sm rounded-lg hover:border-neutral-700 focus:border-neutral-700 outline-none block w-full p-2.5 placeholder-neutral-400" placeholder="Search Language"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="w-full overflow-y-auto grid grid-cols-2 gap-2">
                  {filteredLang.map((data, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-neutral-800 p-4 hover:border-neutral-700 flex items-center gap-4 hover:cursor-pointer h-14"
                      onClick={() => handleLanguageSelection(data)}
                    >
                      <div className="overflow-hidden rounded">
                        {<data.icon size={"20"} color="white" />}
                      </div>
                      <div className="text-sm font-[CircularMedium]">{data.label}</div>
                    </div>
                  ))}
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <Select.Root defaultValue={selectedExpirey} onValueChange={(value) => { setSelectedExpirey(value) }}>
            <Select.Trigger
              className="flex items-center justify-between rounded-md border border-input bg-background w-44 px-3 text-xs box-border font-[CircularMedium] border-neutral-800 hover:border-neutral-700 outline-none"
            >
              <Select.Value />
              <Select.Icon className="flex items-center">
                <ChevronsUpDownIcon strokeWidth={1.5} size={16} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Content
              className="w-[var(--radix-select-trigger-width)] relative shadow-xl border border-neutral-800 text-xs font-[CircularMedium] fixed top-1 left-0 right-0 bottom-0 z-50 rounded-md px-2 py-2 bg-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              position='popper'
              avoidCollisions={true}
            >
              <Select.Viewport>
                {expirey.map((data, index) => (
                  <Select.Item
                    value={data.value}
                    key={index}
                    className="flex py-2 px-2 rounded-md hover:bg-neutral-800 cursor-pointer outline-none"
                  >
                    <Select.ItemText>{data.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 rounded-md text-xs px-5 py-2 w-32 font-[CircularMedium]"
            onClick={handleSubmit}
          >
            Create Paste
          </button>
        </div>
      </div>
    </div>
  )
}
export default Navbar
