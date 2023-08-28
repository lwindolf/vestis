// vim: set ts=4 sw=4:
/*jshint esversion: 8 */

import removeBackground from './../../node_modules/@imgly/background-removal/dist/browser.mjs';

/* 
   Background removal with @imgly/background-removal
*/

function backgroundRemove(id) {
        console.log(id);
        const e = document.getElementById(id);
        const image_src = e.src;

        console.log("backgroundRemove()");
        return removeBackground(image_src, {
                progress: (key, current, total) => {
                        console.log(`Downloading ${key}: ${current} of ${total}`);
                },
                publicPath: 'node_modules/@imgly/background-removal/dist/',
                proxyToWorker: true,
                debug: true,
                model: 'small'
        }).then((blob) => {
                // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
                const url = URL.createObjectURL(blob);
                console.log(url);
                e.src = url;
        }).catch(function(err) {
                console.error('Could not load image', err);
        });
}

window.backgroundRemove = backgroundRemove;
export { backgroundRemove };
