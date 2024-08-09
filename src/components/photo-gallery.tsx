import {PhotoCard} from "@/components/photo-card";
import {AnimatePresence, motion} from "framer-motion";
import {PhotoInfo} from "@/utilities/photo-info";

type Props = {
  photos: PhotoInfo[]
}

export const PhotoGallery = (props: Props) => {

  return <div className={"flex flex-row flex-wrap gap-3"}>
    <AnimatePresence>
      {
        props.photos.map(photo => {
          return <PhotoCard key={photo.convertedBlobURI} photo={photo}/>
        })
      }
    </AnimatePresence>
  </div>
}
