import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-full text-white">
      <Head />
      <body className="h-full bg-pink-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
