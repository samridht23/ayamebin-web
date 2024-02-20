import { GlobeIcon } from "lucide-react"
import {
  TypescriptPlain,
  JavascriptPlain,
  PythonPlain,
  GoPlain,
  CPlain,
  CplusplusPlain,
  CsharpPlain,
  Html5Plain,
  Css3Plain,
  FsharpPlain,
  GraphqlPlain,
  JavaPlain,
  KotlinPlain,
  LuaPlain,
  YamlPlain,
  PerlPlain,
  PhpPlain,
  RPlain,
  RedisPlain,
  RubyPlain,
  SwiftPlain,
  ObjectivecPlain,
  DockerPlain,
  LessPlainWordmark,
  XmlPlain,
  VisualbasicPlain,
  AzurePlain,
  AzuresqldatabasePlain,
  BashPlain,
  PowershellPlain,
  PostgresqlPlain,
  JsonPlain,
} from "devicons-react"

import {
  ApexIcon,
  ClojureIcon,
  CoffeeScriptIcon,
  HandlebarsIcon,
  MarkdownIcon,
  MySqlIcon,
  RustIcon,
  SASSIcon
} from "./icons"


const Languages = [
  {
    label: "Text",
    value: "plaintext",
    icon: GlobeIcon,
  },
  {
    label: "Typescript",
    value: "typescript",
    icon: TypescriptPlain,
  },
  {
    label: "Javascript",
    value: "javascript",
    icon: JavascriptPlain,
  },
  {
    label: "Python",
    value: "python",
    icon: PythonPlain,
  },
  {
    label: "Go",
    value: "go",
    icon: GoPlain,
  },
  {
    label: "C",
    value: "c",
    icon: CPlain,
  },
  {
    label: "C++",
    value: "cpp",
    icon: CplusplusPlain,
  },
  {
    label: "C#",
    value: "csharp",
    icon: CsharpPlain,
  },
  {
    label: "HTML",
    value: "html",
    icon: Html5Plain,
  },
  {
    label: "CSS",
    value: "css",
    icon: Css3Plain,
  },
  {
    label: "Coffee Script",
    value: "coffeescript",
    icon: CoffeeScriptIcon,
  },
  {
    label: "Clojure",
    value: "clojure",
    icon: ClojureIcon,
  },
  {
    label: "F#",
    value: "fsharp",
    icon: FsharpPlain,
  },
  {
    label: "GraphQL",
    value: "graphql",
    icon: GraphqlPlain,
  },
  {
    label: "Handlebars",
    value: "handlebars",
    icon: HandlebarsIcon,
  },
  {
    label: "Java",
    value: "java",
    icon: JavaPlain,
  },
  {
    label: "Kotlin",
    value: "kotlin",
    icon: KotlinPlain,
  },
  {
    label: "Less",
    value: "less",
    icon: LessPlainWordmark,
  },
  {
    label: "Lua",
    value: "lua",
    icon: LuaPlain,
  },
  {
    label: "MySQL",
    value: "mysql",
    icon: MySqlIcon,
  },
  {
    label: "Perl",
    value: "perl",
    icon: PerlPlain,
  },
  {
    label: "PHP",
    value: "php",
    icon: PhpPlain,
  },
  {
    label: "R",
    value: "r",
    icon: RPlain,
  },
  {
    label: "Redis",
    value: "redis",
    icon: RedisPlain,
  },
  {
    label: "Ruby",
    value: "ruby",
    icon: RubyPlain,
  },
  {
    label: "Rust",
    value: "rust",
    icon: RustIcon,
  },
  {
    label: "Swift",
    value: "swift",
    icon: SwiftPlain,
  },
  {
    label: "Objective C",
    value: "objective-c",
    icon: ObjectivecPlain,
  },
  {
    label: "Docker",
    value: "dockerfile",
    icon: DockerPlain,
  },
  {
    label: "Apex",
    value: "apex",
    icon: ApexIcon,
  },
  {
    label: "Azcli",
    value: "azcli",
    icon: AzurePlain,
  },
  {
    label: "Bat",
    value: "bat",
    icon: GlobeIcon,
  },
  {
    label: "CSP",
    value: "csp",
    icon: GlobeIcon,
  },
  {
    label: "INI",
    value: "ini",
    icon: GlobeIcon,
  },
  {
    label: "JSON",
    value: "json",
    icon: JsonPlain,
  },
  {
    label: "Markdown",
    value: "markdown",
    icon: MarkdownIcon,
  },
  {
    label: "Msdax",
    value: "msdax",
    icon: GlobeIcon,
  },
  {
    label: "Pascal",
    value: "pascal",
    icon: GlobeIcon,
  },
  {
    label: "PostgreSQL",
    value: "pgsql",
    icon: PostgresqlPlain,
  },
  {
    label: "Postiats",
    value: "postiats",
    icon: GlobeIcon,
  },
  {
    label: "Powerquery",
    value: "powerquery",
    icon: GlobeIcon,
  },
  {
    label: "Powershell",
    value: "powershell",
    icon: PowershellPlain,
  },
  {
    label: "Pug",
    value: "pug",
    icon: GlobeIcon,
  },
  {
    label: "Razor",
    value: "razor",
    icon: GlobeIcon,
  },
  {
    label: "Redshift",
    value: "redshift",
    icon: GlobeIcon,
  },
  {
    label: "SB",
    value: "sb",
    icon: GlobeIcon,
  },
  {
    label: "Scheme",
    value: "scheme",
    icon: GlobeIcon,
  },
  {
    label: "SCSS",
    value: "scss",
    icon: SASSIcon,
  },
  {
    label: "Shell",
    value: "shell",
    icon: BashPlain,
  },
  {
    label: "SOL",
    value: "sol",
    icon: GlobeIcon,
  },
  {
    label: "SQL",
    value: "sql",
    icon: AzuresqldatabasePlain,
  },
  {
    label: "ST",
    value: "st",
    icon: GlobeIcon,
  },
  {
    label: "TCL",
    value: "tcl",
    icon: GlobeIcon,
  },
  {
    label: "VB",
    value: "vb",
    icon: VisualbasicPlain,
  },
  {
    label: "XML",
    value: "xml",
    icon: XmlPlain,
  },
  {
    label: "YAML",
    value: "yaml",
    icon: YamlPlain,
  },
]
export default Languages
