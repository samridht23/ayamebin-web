import * as Select from '@radix-ui/react-select';
import * as Dialog from '@radix-ui/react-dialog';
import {
  useMemo,
  useState
} from "react";
import {
  ChevronsUpDownIcon,
  CopyIcon,
  FileTextIcon
} from "lucide-react"
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";
import { zustStore } from "../../App";
import Languages from "../../utils/languages";
import Logo from "../logo/"
import clsx from "clsx"

interface ExpiryOption {
  value: string;
  label: string,
}

const expiryOptions: ExpiryOption[] = [
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

  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageSelection = (data: any) => {
    setSelectedLang(data)
    setDialogState(false)
    updateLang(data.value)
  }

  const submitPaste = async () => {
    const data = {
      lang: selectedLang.value,
      expirey: selectedExpirey,
      paste_data: editorValue
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        navigate(`/${data.paste_id}`)
      }
      else {
        throw new Error("Failed to upload paste.Server responded with status" + response.status)
      }
    } catch (error) {
      console.log("Error submitting paste:", error)
    }
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
    <div className={clsx(
      "fixed top-0 left-0 z-50 h-[50px] px-3 w-full",
      "flex border-box items-center justify-between border-b",
      "bg-[#0a0a0a] border-neutral-800"
    )}>
      <Link to="/" className="flex items-center gap-2">
        <Logo size="20" />
        <div className="text-md font-[CircularBold]">Ayame</div>
      </Link>
      <div>
        <div className="flex gap-2">
          {location.pathname !== '/' &&
            <>
              <div className={clsx(
                "border border-neutral-800",
                "hover:border-neutral-700 hover:bg-neutral-800",
                "p-2 flex items-center rounded"
              )}>
                <CopyIcon strokeWidth={1.5} size={"18"} color="white" />
              </div>
              <div className={clsx(
                "border border-neutral-800",
                "hover:border-neutral-700 hover:bg-neutral-800",
                "p-2 flex items-center rounded"
              )}>
                {<selectedLang.icon strokeWidth={1.5} size={"18"} color="white" />}
              </div>
              <Link to="/" className={clsx(
                "border border-neutral-800",
                "hover:border-neutral-700 hover:bg-neutral-800",
                "p-2 flex items-center rounded"
              )}>
                <FileTextIcon strokeWidth={1.5} size={"18"} color="white" />
              </Link>
            </>
          }
          {location.pathname === '/' &&
            <>
              <Dialog.Root
                open={dialogState}
                onOpenChange={() => {
                  setDialogState(dialogState => !dialogState)
                  setSearchTerm('')
                }}
              >
                <Dialog.Trigger className={clsx(
                  "border border-neutral-800",
                  "hover:border-neutral-700 hover:bg-neutral-800",
                  "p-2 flex items-center rounded"
                )}>
                  {<selectedLang.icon strokeWidth={1.5} size={"18"} color="white" className="rounded" />}
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className={clsx(
                    "fixed inset-0 z-50 bg-black/80",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                  )}
                  />
                  <Dialog.Content
                    className={clsx(
                      "w-full max-w-lg flex flex-col overflow-hidden",
                      "fixed h-[400px] left-[50%] top-[50%] z-50 p-6",
                      "translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg",
                      "border border-neutral-800 bg-[#0a0a0a] shadow-lg",
                      "duration-200 data-[state=open]:animate-in",
                      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
                      "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 ",
                      "data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2",
                      "data-[state=closed]:slide-out-to-top-[48%]",
                      "data-[state=open]:slide-in-from-left-1/2 ",
                      "data-[state=open]:slide-in-from-top-[48%]"
                    )}
                  >
                    <div className="w-full">
                      <input
                        type="text"
                        className={clsx(
                          "bg-[#0a0a0a] border border-neutral-800 text-[#FAFAFA]",
                          "text-sm rounded-lg hover:border-neutral-700 ",
                          "focus:border-neutral-700 outline-none block",
                          "w-full p-2.5 placeholder-neutral-400"
                        )}
                        placeholder="Search Language"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="w-full overflow-y-auto grid grid-cols-2 gap-2">
                      {filteredLang.map((data, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "rounded-lg border border-neutral-800 p-4",
                            "hover:border-neutral-700 flex items-center",
                            "gap-4 hover:cursor-pointer h-14"
                          )}
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
                  className={clsx(
                    "flex items-center justify-between rounded-md",
                    "border border-input bg-background w-44 px-3",
                    "text-xs box-border font-[CircularMedium] border-neutral-800",
                    "hover:border-neutral-700 outline-none"
                  )}
                >
                  <Select.Value />
                  <Select.Icon className="flex items-center">
                    <ChevronsUpDownIcon strokeWidth={1.5} size={16} />
                  </Select.Icon>
                </Select.Trigger>
                <Select.Content
                  className={clsx(
                    "w-[var(--radix-select-trigger-width)] relative shadow-xl",
                    "border border-neutral-800 text-xs font-[CircularMedium]",
                    "fixed top-1 left-0 right-0 bottom-0 z-50 rounded-md p-2 bg-black",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ",
                    "data-[side=bottom]:slide-in-from-top-2",
                    "data-[side=left]:slide-in-from-right-2",
                    "data-[side=right]:slide-in-from-left-2",
                    "data-[side=top]:slide-in-from-bottom-2"
                  )}
                  position='popper'
                  avoidCollisions={true}
                >
                  <Select.Viewport>
                    {expiryOptions.map((data, index) => (
                      <Select.Item
                        value={data.value}
                        key={index}
                        className={clsx(
                          "flex p-2 rounded-md hover:bg-neutral-800",
                          "cursor-pointer outline-none"
                        )}
                      >
                        <Select.ItemText>{data.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Root>
              <button
                type="button"
                className={clsx(
                  "text-gray-900 bg-white border border-gray-300",
                  "hover:bg-gray-100 rounded-md text-xs px-5 py-2",
                  "w-32 font-[CircularMedium]"
                )}
                onClick={submitPaste}
              >
                Create Paste
              </button>
            </>
          }
        </div>
      </div>
    </div>
  )
}
export default Navbar
