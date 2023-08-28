// vim: set ts=4 sw=4:
/*jshint esversion: 8 */

import removeBackground from './../../node_modules/@imgly/background-removal/dist/browser.mjs';

/* 
   Background removal with @imgly/background-removal
*/

function backgroundRemove(id) {
        console.log(id);
        const photoStatus = document.getElementById('photoStatus');
        const e = document.getElementById(id);
        const image_src = e.src;

        console.log("backgroundRemove()");
        return removeBackground(image_src, {
                progress: (key, current, total) => {
                        if(-1 !== key.indexOf("fetch"))
                                photoStatus.innerText = `Downloading model (${key}: ${current*100/total}%)...`;
                        else
                                photoStatus.innerText = `Removing background (${key}: ${current} / ${total})...`;
                },
                publicPath: 'node_modules/@imgly/background-removal/dist/',
                proxyToWorker: true,
                debug: true,
                model: 'small'
        }).then((blob) => {
                photoStatus.innerText = `Photo is ready.`;
                // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
                e.src = URL.createObjectURL(blob);
        }).catch(function(err) {
                photoStatus.innerText = `Could not process image: ${err}`;
                console.error('Could not process image', err);
        });
}

window.backgroundRemove = backgroundRemove;
export { backgroundRemove };
