interface LogoProps {
  size: string
}
const Logo = (props: LogoProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} fill="none" viewBox="0 0 37 35">
      <path fill="#fff" d="M16.124 17.057a3.15 3.15 0 0 1 1.13-.752 10.495 10.495 0 0 1-.628-4.046.274.274 0 0 1 .216-.258c.182-.038.345.112.338.298a9.94 9.94 0 0 0 .61 3.853 3.165 3.165 0 0 1 1.658.126c.918-2.257 2.568-4.159 4.72-5.339A10.176 10.176 0 0 0 18.388 0a10.177 10.177 0 0 0-5.92 9.246 10.15 10.15 0 0 0 3.656 7.812Z" />
      <path fill="#fff" d="M15.9 17.317c-1.864-1.57-3.163-3.728-3.62-6.139A10.177 10.177 0 0 0 .09 13.294a10.177 10.177 0 0 0 6.963 8.487c2.985.97 6.094.486 8.56-1.062a3.128 3.128 0 0 1-.365-1.308c-1.371.05-2.747-.17-4.043-.652a.274.274 0 0 1-.178-.286c.019-.184.212-.293.386-.229a9.94 9.94 0 0 0 3.854.61 3.13 3.13 0 0 1 .632-1.537Z" />
      <path fill="#fff" d="M15.79 21.013c-2.069 1.286-4.522 1.855-6.957 1.545A10.176 10.176 0 0 0 7.08 34.805a10.18 10.18 0 0 0 10.224-4 10.154 10.154 0 0 0 1.634-8.468 3.168 3.168 0 0 1-1.357-.057 10.497 10.497 0 0 1-1.869 3.643.274.274 0 0 1-.327.081c-.17-.075-.213-.293-.098-.438a9.939 9.939 0 0 0 1.771-3.476 3.158 3.158 0 0 1-1.267-1.077Z" />
      <path fill="#fff" d="M19.272 22.259c.584 2.365.366 4.874-.68 7.093a10.177 10.177 0 0 0 11.106 5.453 10.176 10.176 0 0 0-.646-10.96 10.153 10.153 0 0 0-7.549-4.17c-.064.464-.23.896-.474 1.272a10.497 10.497 0 0 1 2.888 2.904c.07.105.06.242-.024.336-.124.138-.344.112-.447-.042a9.938 9.938 0 0 0-2.76-2.76 3.137 3.137 0 0 1-1.414.874Z" />
      <path fill="#fff" d="M21.532 19.332c2.43.175 4.749 1.158 6.536 2.84a10.176 10.176 0 0 0 8.618-8.877 10.177 10.177 0 0 0-10.622-2.774 10.153 10.153 0 0 0-6.3 5.89c.414.202.777.491 1.064.845a10.496 10.496 0 0 1 3.654-1.85.274.274 0 0 1 .312.127c.093.16.001.362-.178.412a9.94 9.94 0 0 0-3.476 1.771 3.13 3.13 0 0 1 .392 1.616Z" />
      <path fill="#fff" d="M18.388 22.015a2.775 2.775 0 1 0 0-5.55 2.775 2.775 0 0 0 0 5.55Z" />
    </svg>
  )
}
Logo.defaultProps = {
  size: "30"
}
export default Logo