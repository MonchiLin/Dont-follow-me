import {Button, Card, CardFooter, Image} from "@nextui-org/react";
import {motion} from "framer-motion";
import {HiOutlineDownload} from "react-icons/hi";
import {PhotoInfo} from "@/utilities/photo-info";
import {appStates} from "@/utilities/app-states";
import {useSetRecoilState} from "recoil";

type Props = {
  photo: PhotoInfo
}

export const PhotoCard = (props: Props) => {
  const set = useSetRecoilState(appStates)

  const handleClick = () => {
    PhotoInfo.download(props.photo)
  }

  return <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.3 }}
    className="child cursor-pointer"
    onClick={() => set({exifModalVisible: true, focusedPhoto: props.photo})}
  >
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none group/bento hover:shadow-xl transition duration-200"
    >
      <Image
        alt=""
        className="object-cover"
        height={200}
        src={props.photo.convertedBlobURI}
        width={200}
      />
      <CardFooter className="group-hover/bento:bottom-1 bottom-[-45px] transition-all duration-200 justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80 uppercase">privacy security</p>

        <Button onClick={handleClick} radius={"full"} isIconOnly aria-label="Like">
          <HiOutlineDownload />
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
}
