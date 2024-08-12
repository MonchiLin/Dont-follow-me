import {Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs} from "@nextui-org/react";
import {useRecoilState} from "recoil";
import {appStates} from "@/utilities/app-states";
import {PhotoExifTable} from "@/components/photo-exif-table";

export function PhotoExifView() {
  const [appStateValue, setAppState] = useRecoilState(appStates)

  const onClose = () => {
    setAppState(state => ({...state, exifModalVisible: false}))
  }

  return <Modal
    backdrop={"blur"}
    isOpen={appStateValue.exifModalVisible}
    onClose={onClose}
  >
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader title={"Exif 信息"}/>
          <ModalBody className={"max-h-[60vh] overflow-y-scroll scrollbar-thin px-2"}>
            <Tabs>
              <Tab key="photos" title="原始">
                <PhotoExifTable tags={appStateValue.focusedPhoto?.originalExif}/>
              </Tab>
              <Tab key="music" title="新 New">
                <PhotoExifTable tags={appStateValue.focusedPhoto?.privacySecurityExif}/>
              </Tab>
            </Tabs>
          </ModalBody>
        </>
      )}
    </ModalContent>
  </Modal>
}
