import {InferGetServerSidePropsType} from "next";
import dynamic from "next/dynamic";
import {PhotoGallery} from "@/components/photo-gallery";
import {useState} from "react";
import {PhotoInfo} from "@/utilities/photo-info";
import {HiOutlineDownload} from "react-icons/hi";
import {Button} from "@nextui-org/react";

const PhotoZone = dynamic(
  () => import('../components/photo-zone').then(({PhotoZone}) => PhotoZone),
  {
    ssr: false,
  }
);

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [photos, setPhotos] = useState<PhotoInfo[]>([])

  const onFileChange = (photoInfos: PhotoInfo[]) => {
    setPhotos(state => [...state, ...photoInfos])
  }

  const downloadAll = () => {
    PhotoInfo.downloadPhotos(photos)
  }

  return (
    <main
      className={`flex flex-col p-3 gap-y-2 w-screen h-screen overflow-x-hidden overflow-y-scroll scrollbar-thin`}
    >
      <PhotoZone onChange={onFileChange as any}/>
      <PhotoGallery photos={photos}/>
      {
        (photos.length !== 0) && <div className="fixed bottom-10 right-10 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none">
          <Button onClick={downloadAll} className={"bg-gradient-to-tr from-[#cfc6ca] to-[#232017] text-white"} radius={"full"} aria-label="Like">
            <HiOutlineDownload/> All
          </Button>
        </div>
      }
    </main>
  );
}

export const getServerSideProps = (async (context) => {

  return {props: {}}
})
