
import FileVersioning from './main.js'

const filename = './files/file.txt'
const fv = FileVersioning()


async function run(filename, content) {

  try {
    await fv.writeFileVersion(filename, content)
  }
  catch (e) {
    console.error(e.name)
    console.error(e.message)
  }

}

for (let i = 0; i < 10; i++) {
  await run(filename, `File version number is ${ i }`)
}

