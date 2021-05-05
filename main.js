/*
 * F I L E   V E R S I O N I N G
 *
 * Provides a basic file versioning system.
 *
 * Author
 * H. R. Baer
 *
 * History
 * 2021-05-05 Created
 *
 */


import fs from 'fs/promises'
import path from 'path'


export default function FileVersioning(version = '-v') {


  /*
   * Creates a file version.
   *
   * If the file already exists, rename it to last version.
   *
   */
  async function createFileVersion(filename) {

    try {

      let stat = await fs.stat(filename)

      // Make sure that it is a file.
      if (!stat.isFile()) {
        throw new Error(`"${ filename }" is not a file.`)
      }

      let dirname = path.dirname(filename)
      let extname = path.extname(filename)

      // Get a list of the files in the directory
      let files = await fs.readdir(dirname)

      let basename = path.basename(filename, path.extname(filename))
      let basenameversion = basename + version

      // Get the file names of all existing versions
      let names = files.map(file => {
        return path.basename(file, path.extname(file))
      }).filter(name => {
        return name.startsWith(basenameversion)
      })

      // Get the existing version numbers
      let numbers = names.map(name => {
        return +name.substring(basenameversion.length)
      })

      // Get the next free version number
      let index = numbers.reduce((acc, cur) => {
        return Math.max(acc, cur)
      }, -1) + 1

      // Create the new file name
      let newfilename = path.format({ dir: dirname, name: `${ basename }${ version }${ index }`, ext: extname })
      
      // Rename the existing file
      await fs.rename(filename, newfilename)

    }

    catch(e) {
      // If the file does not exist we are done.
    }

  }


  /*
   * Writes to the file without overwriting the last version.
   */
  async function writeFileVersion(filename, content) {

    // Rename the last version
    await createFileVersion(filename)
    // Savely write to the file 
    await fs.writeFile(filename, content)

  }

  return {
    createFileVersion,
    writeFileVersion
  }

}

