'use client';

import {ChangeEvent, useRef, useState} from "react";
import {Card, Spinner} from "@nextui-org/react";
import {CardBody} from "@nextui-org/card";
import heic2any from "heic2any";
import {motion} from "framer-motion";
import classNames from "classnames";
import ExifReader from 'exifreader';
import {PhotoInfo} from "@/utilities/photo-info";

type Props = {
  onChange: (photoInfos: PhotoInfo[]) => void
}

export function PhotoZone(props: Props) {
  const [processing, setProcessing] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const onFileChosen = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    setProcessing(true)
    const photos = await Promise
      .all(
        Array.from(files)
          .map(async (file) => {
            let blobResult: Blob

            if (file.type === "image/heic") {
              blobResult = await heic2any({
                blob: file,
                toType: "image/jpeg",
              }) as Blob
            } else if (file.type.startsWith("image")) {
              blobResult = file
            } else {
              console.error("unknown file type", file)
              return Promise.reject()
            }

            const tags = await ExifReader.load(await file.arrayBuffer())

            const photoInfo = new PhotoInfo(
              file,
              URL.createObjectURL(blobResult),
              tags
            )

            return Promise.resolve(photoInfo)
          })
      )
      .finally(() => {
        setProcessing(false)
      })

    props.onChange(photos)
  }

  // jpg jpeg png heic
  const accept = "image/*,.heic"

  const onContainerClick = () => {
    if (processing) {
      return
    }
    fileInput.current.click()
  }

  return <Card
    className='w-full h-20 bg-white cursor-pointer'
  >
    <CardBody onClick={onContainerClick} className={"flex items-center justify-center relative"}>
      <span className={"font-cyberpunk"}>Keep clear</span>
      <motion.div
        className={classNames("absolute w-full h-full flex justify-center items-center left-0 top-0 backdrop-blur backdrop-saturate-150 bg-overlay-30", processing ? "" : "hidden")}
      >
        <Spinner/>
      </motion.div>
      <input
        type='file'
        role='presentation'
        name='_upload'
        onChange={onFileChosen}
        accept={accept}
        multiple
        ref={fileInput}
        className={"hidden invisible"}
      />
    </CardBody>
  </Card>
}
