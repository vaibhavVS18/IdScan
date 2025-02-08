// function dataURItoBlob(dataURI) {
//     const byteString = atob(dataURI.split(',')[1]);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const uintArray = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//         uintArray[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([arrayBuffer], { type: 'image/jpeg' });
// }


//  voice generate for flash msg
// document.addEventListener('DOMContentLoaded', () => {
//     const flashMessage = document.querySelector('.flash-message');
//     if (flashMessage) {
//         const messageText = flashMessage.textContent || flashMessage.innerText;
//         speakText(messageText);
//     }
// });
