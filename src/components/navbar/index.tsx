import * as Select from '@radix-ui/react-select';
import * as Dialog from '@radix-ui/react-dialog';
import {
  useEffect,
  useMemo,
  useState
} from "react";
import {
  ChevronsUpDownIcon,
  CopyIcon,
  FileTextIcon,
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
import { toast } from 'sonner'

interface ExpiryOption {
  value: string;
  label: string,
}

interface LanguageProps {
  label: string;
  value: string;
  icon: any;
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
  const { duplicateData, editorData, language, updateLanguage, updateEditorData } = zustStore()

  const [searchTerm, setSearchTerm] = useState('');
  const [expireOption, setExpireOption] = useState('168');
  const [dialogState, setDialogState] = useState(false)
  const [languageState, setLanguageState] = useState<LanguageProps | undefined>(undefined)
  const [submitLoading, setSubmitLoading] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageSelection = (data: any) => {
    setDialogState(false)
    updateLanguage(data.value)
  }

  const handleDuplicate = () => {
    updateEditorData(duplicateData)
    navigate("/")
  }

  const submitPaste = async () => {
    const data = {
      lang: language,
      expirey: expireOption,
      paste_data: editorData
    }
    try {
      setSubmitLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        updateEditorData("")
        updateLanguage("")
        toast.success("Paste created")
        navigate(`/${data.paste_id}`)
        setSubmitLoading(false)
      } else {
        throw Error("Failed to upload paste. Server responded with status: " + response.status)
      }
    } catch (error) {
      toast.error('Error uploading paste. Try again.')
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

  useEffect(() => {
    const findLanguageDataByValue = (value: string) => {
      return Languages.find(language => language.value === value)
    }
    const languageData = findLanguageDataByValue(language)
    setLanguageState(languageData)
  }, [language])

  return (
    <div className={clsx(
      "fixed top-0 left-0 z-50 h-[50px] px-3 w-full",
      "flex border-box items-center justify-between border-b",
      "bg-[#0a0a0a] border-neutral-800"
    )}>
      <Link to="/" className="flex items-center gap-2">
        <Logo size="20" />
        <div className="text-md font-[CircularBold] hidden md:block">Ayame</div>
      </Link>
      <div>
        <div className="flex gap-2">
          {location.pathname !== '/' &&
            <>
              <button
                onClick={handleDuplicate}
                className={clsx(
                  "border border-neutral-800",
                  "hover:border-neutral-700 hover:bg-neutral-800",
                  "p-2 flex items-center rounded"
                )}>
                <CopyIcon
                  strokeWidth={1.5}
                  size={"18"}
                  color="white"
                />
              </button>
              <Link to="/" className={clsx(
                "border border-neutral-800",
                "hover:border-neutral-700 hover:bg-neutral-800",
                "p-2 flex items-center rounded"
              )}>
                <FileTextIcon strokeWidth={1.5} size={"18"} color="white" />
              </Link>
              <div className={clsx(
                "border border-neutral-800",
                "p-2 flex items-center rounded"
              )}>
                {
                  languageState &&
                  <languageState.icon
                    strokeWidth={1.5}
                    size={"18"}
                    color="white"
                    className="rounded"
                  />
                }
              </div>
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
                  {
                    languageState &&
                    <languageState.icon
                      strokeWidth={1.5}
                      size={"18"}
                      color="white"
                      className="rounded"
                    />
                  }
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
                      "w-[90%] md:w-full max-w-lg flex flex-col overflow-hidden",
                      "fixed h-[400px] left-[50%] top-[50%] z-50 p-4 md:p-6",
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
              <Select.Root
                defaultValue={expireOption}
                onValueChange={(value) => { setExpireOption(value) }}>
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
                  "hover:bg-gray-100 rounded-md text-xs p-2",
                  "w-28 font-[CircularMedium] flex justify-center items-center"
                )}
                onClick={submitPaste}
                disabled={submitLoading}
              >
                {submitLoading ?
                  <div className="flex items-center justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-900"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>
                  :
                  <div>Create Paste</div>
                }
              </button>
            </>
          }
        </div>
      </div>
    </div>
  )
}
export default Navbar
