export const image2jpeg = (file: File): Promise<Blob> => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext('2d');

  return new Promise(resolve => {
    const img = document.createElement("img")
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const dataURI = canvas.toDataURL('image/jpeg', 1)

      let byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else
        byteString =  decodeURIComponent(dataURI.split(',')[1]);

      // separate out the mime component
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      resolve(new Blob([ia], {type:mimeString}))
    }
    img.src = URL.createObjectURL(file)
  })
}
