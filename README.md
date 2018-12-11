# nodejs-image-parser

![https://www.npmjs.com/package/nodejs-image-parser](https://img.shields.io/badge/npm-v1.0.1-red.svg?style=flat)

Nodejs image parser (convert images as @3x image into desired RGB, compress them, fix the names to snake_case and finally put as 1x,2x, 3x form). Good for react native/ iOS projects.

Source Image: <img src="./img_src/arrowNext@3x.png">

Output: <img src="./img_dest/arrow_next.png">,<img src="./img_dest/arrow_next@2x.png">, <img src="./img_dest/arrow_next@3x.png">

Source Image: <img src="./img_src/search@3x.png">

Output: <img src="./img_dest/search.png">,<img src="./img_dest/search@2x.png">, <img src="./img_dest/search@3x.png">

### Sample code

```javascript
const ImageParser = require('./ImageParser');

const options = { srcDir: './img_src/', destDir: './img_dest/', color: { red: 0, green: 255, blue: 255 } };
ImageParser(options)
	.then(() => {
		console.log('all done');
	})
	.catch(err => {
		console.log(err);
	});
```

### Other options for Separate task

#### Parse File Names : Sync return

```javascript
const ImageParser = require('./ImageParser');

console.log(ImageParser.parseFileName('./img_dest/', 'arrowNext@3x.png', 1)); // ./img_dest/arrow_next.png
console.log(ImageParser.parseFileName('./img_dest/', 'arrowNext@3x.png', 2)); // ./img_dest/arrow_next@2x.png
console.log(ImageParser.parseFileName('./img_dest/', 'arrowNext@3x.png', 3)); // ./img_dest/arrow_next@3x.png
```

#### Get file name : Promise based

```javascript
const ImageParser = require('./ImageParser');

ImageParser.getFiles('./img_src').then(files => console.log(files)); // arrowNext@3x.png, search@3x.png
```

#### Change Image : Promise based

```javascript
const ImageParser = require('./ImageParser');
const options = { srcDir: './img_src/', destDir: './img_dest/', file: 'arrowNext@3x.png' color: { red: 0, green: 255, blue: 255 } };
ImageParser.changeImage(options).then(() => console.log('done'));
```

#### Compress Images : Promise based

```javascript
const ImageParser = require('./ImageParser');
const options = { destDir: './img_dest/', compressionSize: '50' };
ImageParser.compressImages(options).then(() => console.log('done'));
```
