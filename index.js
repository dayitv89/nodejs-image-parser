/**
 * Copyright (c) 2017-Present, Gaurav D. Sharma
 * All rights reserved.
 *
 * @flow
 */
'use strict';

const ImageParser = require('./ImageParser');

const options = { srcDir: './img_src/', destDir: './img_dest/', color: { red: 0, green: 255, blue: 255 } };
ImageParser(options)
	.then(() => {
		console.log('all done');
	})
	.catch(err => {
		console.log(err);
	});
