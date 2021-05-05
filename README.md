# File Versioning

## Purpose

As there is apparently no simple file versioning module in this repository, I will hereby contribute my very basic version for Node.js.
To keep previous file versions, an already existing file will be assigned a unique consecutive version number.

## Installation

<pre>
  npm install file-versioning
</pre>

## Example

<pre>
  
  import FileVersioning from 'file-versioning'

  const fv = FileVersioning()

  async function saveVersion(filename, content) {
    try {
      await fv.writeFileVersion(filename, content)
    }
    catch (e) {
      console.error(e)
    }
  }
  
  await saveVersion('./files/file.txt', 'content of file')
  // ...
  await saveVersion('./files/file.txt', 'more recent content of file')

</pre>

## API

### fv.createFileVersion(filename)

If the file already exists, this method renames the existing file. A unique consecutive version number will be appended to this file.


### fv.writeFileVersion(filename, content)

Writes the content to the specified file and keeps a previously existing file version. Internally calls the method 'fv.createFileVersion'.

