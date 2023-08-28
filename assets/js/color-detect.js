// vim: set ts=4 sw=4:
/*jshint esversion: 8 */

/* 
   Photo color detection with color-thief
*/

const colorThief = new ColorThief();

// Determine dominant color from a given image id. Problem is we
// have a base64 encoded image in a URL which color-thief does not
// support natively. So we have to apply a workaround from
//
// https://hinty.io/devforth/get-dominant-color-from-base64-encoded-string-using-colorthief/

function rgbToHex(r, g, b) {

        const hexStr = [r, g, b].map((x) => {

          const hex = x.toString(16);

          return hex.length === 1 ? `0${hex}` : hex;

        }).join('');

       return `#${hexStr}`;

      }

async function getImageFromBase64str(b64str) {

        const img = document.createElement('img');

        await new Promise((r) => {
                img.src = b64str;
                img.onload = r;
        })

        const colorThief = new ColorThief();
        const rgba = colorThief.getColor(img, 5);

        if (!rgba) {
                return 'rgba(0,0,0,0)'; // seems to happen on white image
        } else {
                return rgbToHex(rgba[0], rgba[1], rgba[2]);
        }
}

async function detectColor(id) {       
        var color;
        var s = document.getElementById(id).src;
        s.substring("data:image/png;base64,".length, s.length)
        color = await getImageFromBase64str(document.getElementById(id).src);

        console.log("detected color "+color);
        document.getElementById('color').value = color;
}
