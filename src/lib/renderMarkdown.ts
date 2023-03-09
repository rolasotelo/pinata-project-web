import {serialize} from "next-mdx-remote/serialize";


export async function renderMarkdown(markdown: string) {
  return serialize(markdown || '')
}