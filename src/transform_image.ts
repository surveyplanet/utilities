export interface TransformOptions {
	background?: string;
	blur?: number;
	fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
	flatten?: string;
	flip?: boolean;
	flop?: boolean;
	gamma?: number;
	grayscale?: boolean;
	height?: number;
	median?: number;
	negate?: boolean;
	normalize?: boolean;
	rotate?: number;
	sharpen?: number;
	threshold?: number;
	tint?: string;
	width?: number;
}

const SHORTCUTS: Record<keyof TransformOptions, string> = {
	background: 'bg',
	blur: 'b',
	fit: 'f',
	flatten: 'fl',
	flip: 'fi',
	flop: 'fo',
	gamma: 'ga',
	grayscale: 'g',
	height: 'h',
	median: 'm',
	negate: 'n',
	normalize: 'no',
	rotate: 'ro',
	sharpen: 's',
	threshold: 'th',
	tint: 't',
	width: 'w',
};

const ROOT_URL = 'https://media.surveyplanet.com';

/**
 * Resize SurveyPlanet media server images
 *
 * @function transformImage
 * @param url {string} - The url of the image to transform
 * @param options {TransformOptions} - The image transform options
 * @param options.background {string} -	Adjusts the backfill color of an image that has been resized and scaled to fit the new dimensions, usually when resize is set to f_contain. Value should be in the form of hex string e.g.: bg_ff00ff.
 * @param options.blur {number} -	Blur the image.
 * @param options.fit {'cover' | 'contain' | 'fill' | 'inside' | 'outside'} -	The possible methods by which the image should fit width and height. Both width and height must be present. See fit details below.
 * cover: (default) Preserving aspect ratio, ensure the image covers both provided dimensions by cropping/clipping to fit.
 * contain: Preserving aspect ratio, contain within both provided dimensions using "letterboxing" where necessary.
 * fill: Ignore the aspect ratio of the input and stretch to both provided dimensions.
 * inside: Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
 * outside: Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified. Some of these values are based on the object-fit CSS property.
 * @param options.flatten {string} -	Merge alpha transparency channel, if any, with a background, then remove the alpha channel. Value should be in the form of hex string e.g.: fl_ff00ff.
 * @param options.flip {boolean} -	Flip the image about the vertical on the Y axis.
 * @param options.flop {boolean} -	Flop the image horizontally on the X axis.
 * @param options.gamma {number} -	Apply a gamma correction by reducing the encoding (darken) pre-resize at a factor of 1/gamma then increasing the encoding (brighten) post-resize at a factor of gamma.
 * @param options.grayscale {boolean} -	Change the image to grayscale.
 * @param options.height {number} -	Change the height of the image
 * @param options.median {number} -	Apply median filter.
 * @param options.negate {boolean} -	Create a 'negative' by inverting the colors of the image.
 * @param options.normalize {boolean} -	Enhance output image contrast by stretching its luminance to cover the full dynamic range.
 * @param options.rotate {number} -	Rotate the output image by either an explicit angle or auto-orient based on the EXIF Orientation tag.
 * @param options.sharpen {number} -	Sharpen the image.
 * @param options.threshold {number} -	Any pixel value greater than or equal to the threshold value will be set to 255, otherwise it will be set to 0.
 * @param options.tint {string} -	Adjust the tint or coloring of your image. For example, setting a value of 255:0:0 will yield an image with only red channels and no greens/blues.
 * @param options.width {number} -	Change the width of the image.
 * @async
 * @returns string
 */
export default (
	url: string,
	options: TransformOptions = {},
	format?: 'png' | 'jpg' | 'jpeg' | 'gif'
): string => {
	// console.log('transformImage', url, options, format);
	if (url.length <= 0 || !url.startsWith(ROOT_URL)) {
		return url;
	}

	if (Object.entries(options).length === 0 && !format) {
		return url;
	}

	if (format) {
		if (/\.(?:jpe?g|webp|gif|a?png|svg|avif)$/.test(url)) {
			console.warn(
				`transformImage() cannot change format of legacy images with extension in file name: ${url}.`
			);
		} else {
			url = `${url}.${format}`;
		}
	}

	const transformations: string = Object.keys(options)
		.filter((key) => key in SHORTCUTS)
		.map((key) => {
			const prop = SHORTCUTS[key as keyof TransformOptions];
			const val = options[key as keyof TransformOptions] ?? '';

			if (typeof val === 'boolean') {
				return prop;
			}

			return `${prop}_${val.toString()}`;
		})
		.join(',');

	if (transformations.length > 0) {
		url = url.replace(ROOT_URL + '/', `${ROOT_URL}/${transformations}/`);
	}

	return url;
};
