'use client';

import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import {appStates} from "@/utilities/app-states";
import {useMemo} from "react";
import {ExifInfo} from "@/utilities/exif";

type DataRow = {
  title: string
  value: string
}

export function PhotoExifView() {
  const [appStateValue, setAppState] = useRecoilState(appStates)

  const onClose = () => {
    setAppState(state => ({...state, exifModalVisible: false}))
  }

  const rows = useMemo<DataRow[]>(() => {
    if (!appStateValue.focusedPhoto) {
      return []
    }

    const exifInfo = ExifInfo()

    return Object.entries(appStateValue.focusedPhoto.exif)
      .map(([key, tag]) => {
        return {
          title: exifInfo[key]?.name ?? "Unknown",
          value: tag.description || ""
        }
      })
  }, [appStateValue.focusedPhoto])

  return <Modal
    backdrop={"blur"}
    isOpen={appStateValue.exifModalVisible}
    onClose={onClose}
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Exif 原始信息</ModalHeader>
          <ModalBody className={"max-h-[60vh] overflow-y-scroll scrollbar-thin"}>
            <hr/>
            {
              rows.map(row => {
                return <p key={row.title}>
                  <b>{row.title}</b>: {row.value}
                </p>
              })
            }
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
}
