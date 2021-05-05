# File Versioning

## Purpose

As there is apparently no simple file versioning module in this repository, I will hereby contribute my very basic version for Node.js.
To keep previous file versions, an already existing file will be assigned a unique consecutive version number.

## Installation

```
npm install file-versioning
```

## Example


```  
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
```

The example above will create files similar to this:
```
-rw-r--r--  1 .....  .....    15 May  5 21:00 file-v0.txt
-rw-r--r--  1 .....  .....    27 May  5 21:01 file.txt
```

## API
```
fv.createFileVersion(filename)
```
If the file already exists, this method renames the existing file. A unique consecutive version number will be appended to this file.

```
fv.writeFileVersion(filename, content)
```
Writes the content to the specified file and keeps a previously existing file version. Internally calls the method 'fv.createFileVersion'.

