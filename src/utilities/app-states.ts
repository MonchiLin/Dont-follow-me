import {atom, useSetRecoilState} from "recoil";
import {PhotoInfo} from "@/utilities/photo-info";

export const appStates = atom({
  key: 'AppStates',
  default: {
    exifModalVisible: false,
    focusedPhoto: null as PhotoInfo | null,
  },
});
