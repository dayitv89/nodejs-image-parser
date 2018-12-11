/**
 * Copyright (c) 2017-Present, Gaurav D. Sharma
 * All rights reserved.
 *
 * @flow
 */
'use strict';

const fs = require('fs');
const changeCase = require('change-case');
const Jimp = require('jimp');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

/// mode would be x = 1, 2, 3
const parseFileName = (dest, fileName, mode) => {
	const removedUnused = fileName.replace('@3x', '');
	const newFileName = changeCase.snakeCase(removedUnused.substr(0, removedUnused.lastIndexOf('.png')));
	const mode_val = mode == 3 ? '@3x' : mode == 2 ? '@2x' : '';
	return `${dest}${newFileName}${mode_val}.png`;
};

const getFiles = srcDir => {
	return new Promise((resolve, reject) => {
		fs.readdir(srcDir, (error, files) => {
			if (error) {
				reject(error);
				console.log(error);
				throw error;
			} else {
				resolve(files.filter(i => i.endsWith('.png')));
			}
		});
	});
};

const changeImage = ({ srcDir, destDir, file, red, green, blue }) => {
	return new Promise((resolve, reject) => {
		Jimp.read(srcDir + file, (err, image) => {
			if (err) {
				reject(err);
				console.log(err);
				throw err;
			}
			image
				.color([
					{ apply: 'red', params: [red] },
					{ apply: 'green', params: [green] },
					{ apply: 'blue', params: [blue] }
				])
				.write(parseFileName(destDir, file, 3))
				.scale(2 / 3)
				.write(parseFileName(destDir, file, 2))
				.scale(1 / 2)
				.write(parseFileName(destDir, file, 1));
			resolve();
		});
	});
};

const compressImages = ({ destDir, compressionSize }) => {
	return new Promise((resolve, reject) => {
		imagemin([destDir + '*.{jpg,JPG,jpeg,JPEG,png}'], destDir, {
			plugins: [imageminPngquant({ quality: compressionSize })]
		})
			.then(resolve)
			.catch(err => {
				reject(err);
				console.log(err);
				throw err;
			});
	});
};

const ImageParser = ({ srcDir, destDir, compressionSize = '50', color = { red: 255, green: 255, blue: 255 } }) => {
	return new Promise((resolve, reject) => {
		getFiles(srcDir)
			.then(files => Promise.all(files.map(file => changeImage({ srcDir, destDir, file, ...color }))))
			.then(() => compressImages({ destDir, compressionSize }))
			.then(resolve)
			.catch(reject);
	});
};

ImageParser.parseFileName = parseFileName;
ImageParser.getFiles = getFiles;
ImageParser.changeImage = changeImage;
ImageParser.compressImages = compressImages;

module.exports = ImageParser;
