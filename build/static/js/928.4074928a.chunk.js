/*! For license information please see 928.4074928a.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunknattynites_auth2=self.webpackChunknattynites_auth2||[]).push([[928],{4896:(t,n,e)=>{function r(t,n){const e=btoa(function(t){let n="";for(let e=0;e<t.length;e+=1)n+=String.fromCharCode(t[e]);return n}(t)).replace(/=/g,"");return n?e.replace(/\+/g,"-").replace(/\//g,"_"):e}function o(){return BigInt("115792089210356248762697446949407573530086143415290314195533631308867097853951")}function i(){return BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b")}function c(t){return BigInt("0x"+function(t){let n="";for(let e=0;e<t.length;e++){const r=t[e].toString(16);n+=r.length>1?r:"0"+r}return n}(t))}function s(t,n){const e=t.toString(16),r=2*n;let o="";if(r<e.length)throw new Error(`cannot pack integer with ${e.length} hex chars into ${n} bytes`);return o="0".repeat(r-e.length),function(t){if(t.length%2!=0)throw new Error("Hex string length must be multiple of 2");const n=new Uint8Array(t.length/2);for(let e=0;e<t.length;e+=2)n[e/2]=parseInt(t.substring(e,e+2),16);return n}(o+e)}function u(t,n){return(t&BigInt(1)<<BigInt(n))!==BigInt(0)}function a(t,n){if(n<=BigInt(0))throw new Error("p must be positive");const e=t%n;if(u(n,0)&&u(n,1)){const t=function(t,n,e){if(n===BigInt(0))return BigInt(1);let r=t;const o=n.toString(2);for(let i=1;i<o.length;++i)r=r*r%e,"1"===o[i]&&(r=r*t%e);return r}(e,n+BigInt(1)>>BigInt(2),n);if(t*t%n!==e)throw new Error("could not find a modular square root");return t}throw new Error("unsupported modulus value")}function l(t){if(33!==t.length&&65!==t.length)throw new Error("Invalid length: point is not in compressed or uncompressed format");if((2===t[0]||3===t[0])&&33==t.length){const n=3===t[0],e=c(t.subarray(1,t.length)),l=o();if(e<BigInt(0)||e>=l)throw new Error("x is out of range");const g=function(t,n){const e=o();let r=a(((t*t+(e-BigInt(3)))*t+i())%e,e);return n!==u(r,0)&&(r=(e-r)%e),r}(e,n);return{kty:"EC",crv:"P-256",x:r(s(e,32),!0),y:r(s(g,32),!0),ext:!0}}if(4===t[0]&&65==t.length){const n=c(t.subarray(1,33)),e=c(t.subarray(33,65)),u=o();if(n<BigInt(0)||n>=u||e<BigInt(0)||e>=u||!function(t,n){const e=o(),r=((t*t+(e-BigInt(3)))*t+i())%e;return n**BigInt(2)%e===r}(n,e))throw new Error("invalid uncompressed x and y coordinates");return{kty:"EC",crv:"P-256",x:r(s(n,32),!0),y:r(s(e,32),!0),ext:!0}}throw new Error("invalid format")}e.d(n,{S:()=>h});var g=e(1315);function h(t){const{uncompressedPrivateKeyHex:n,compressedPublicKeyHex:e}=t,r=l((0,g.Ks)(e));return r.d=(0,g.el)(n,g.Ev),r}},2928:(t,n,e)=>{e.r(n),e.d(n,{signWithApiKey:()=>i});var r=e(4896),o=e(1315);const i=async t=>{const{content:n,publicKey:e,privateKey:i}=t,s=await async function(t){const{uncompressedPrivateKeyHex:n,compressedPublicKeyHex:e}=t,o=(0,r.S)({uncompressedPrivateKeyHex:n,compressedPublicKeyHex:e});return await crypto.subtle.importKey("jwk",o,{name:"ECDSA",namedCurve:"P-256"},!1,["sign"])}({uncompressedPrivateKeyHex:i,compressedPublicKeyHex:e});return await async function(t){const{key:n,content:e}=t,r=await crypto.subtle.sign({name:"ECDSA",hash:"SHA-256"},n,(new TextEncoder).encode(e)),i=function(t){if(t.length%2!=0||0==t.length||t.length>132)throw new Error("Invalid IEEE P1363 signature encoding. Length: "+t.length);const n=c(t.subarray(0,t.length/2)),e=c(t.subarray(t.length/2,t.length));let r=0;const o=2+n.length+1+1+e.length;let i;o>=128?(i=new Uint8Array(o+3),i[r++]=48,i[r++]=129,i[r++]=o):(i=new Uint8Array(o+2),i[r++]=48,i[r++]=o);return i[r++]=2,i[r++]=n.length,i.set(n,r),r+=n.length,i[r++]=2,i[r++]=e.length,i.set(e,r),i}(new Uint8Array(r));return(0,o.pD)(i)}({key:s,content:n})};function c(t){let n=0;for(;n<t.length&&0==t[n];)n++;n==t.length&&(n=t.length-1);let e=0;128==(128&t[n])&&(e=1);const r=new Uint8Array(t.length-n+e);return r.set(t.subarray(n),e),r}}}]);
//# sourceMappingURL=928.4074928a.chunk.js.map