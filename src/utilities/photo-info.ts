import {Tags} from "exifreader";
import FileSaver, {saveAs} from 'file-saver';
import {nanoid} from "nanoid";
import NProgress from "nprogress";
import JSZip from "jszip";

export class PhotoInfo {
  // 原始文件
  sourceFile: File;

  // 转换后的 blob URI
  convertedBlobURI: string;

  // exif 信息
  exif: Tags

  constructor(sourceFile: File, convertedBlobURI: string, exif: Tags) {
    this.sourceFile = sourceFile
    this.convertedBlobURI = convertedBlobURI
    this.exif = exif
  }

  static async download(photoInfo: PhotoInfo) {
    NProgress.start()
    let type = photoInfo.sourceFile.type === "image/heic" ? "jpeg" : photoInfo.sourceFile.type
    if (type.includes("/")) {
      type = type.split("/")[1]
    }

    const blob = await fetch(photoInfo.convertedBlobURI).then(r => r.blob());

    FileSaver.saveAs(blob, `potato_${nanoid()}.${type}`);

    setTimeout(() => {
      NProgress.done()
    }, 1000)
  }

  static async downloadPhotos(photoInfos: PhotoInfo[]) {
    NProgress.start();

    const zip = new JSZip();

    // 遍历每个照片信息，下载并添加到 zip 文件中
    for (let i = 0; i < photoInfos.length; i++) {
      const photoInfo = photoInfos[i];
      let type = photoInfo.sourceFile.type === "image/heic" ? "jpeg" : photoInfo.sourceFile.type;
      if (type.includes("/")) {
        type = type.split("/")[1];
      }

      // 下载图片数据
      const blob = await fetch(photoInfo.convertedBlobURI).then((r) => r.blob());

      // 添加图片到 zip 文件中
      zip.file(`potato_${nanoid()}.${type}`, blob);
    }

    // 生成 zip 文件的 Blob 对象
    zip.generateAsync({type: "blob"}).then((content) => {
      // 保存 zip 文件
      saveAs(content, `photos_${nanoid()}.zip`);

      // 完成进度条
      setTimeout(() => {
        NProgress.done();
      }, 1000);
    });
  }


}
