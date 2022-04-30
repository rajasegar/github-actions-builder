import { fileOpen } from 'browser-nativefs'

export async function loadFromYml() {
  const blob = await fileOpen({
    extensions: ['.yml'],
    mimeTypes: ['application/yml'],
  })

  const contents = await new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(blob, 'utf8')
    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        resolve(reader.result)
      }
    }
  })

  try {
			return contents;
  } catch (error) {
    console.error(error)
  }
}
