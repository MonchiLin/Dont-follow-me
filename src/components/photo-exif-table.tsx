import {Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip} from "@nextui-org/react";
import React, {useMemo} from "react";
import {Tags} from "exifreader";
import {ExifInfo} from "@/utilities/exif";
import {nanoid} from "nanoid";
import {GoLinkExternal} from "react-icons/go";
import {MdOutlinePhoneIphone} from "react-icons/md";

enum PhotoExifType {
  None,
  GPS,
  DeviceModel,
  Date,
}

type PhotoExifTableDataRow = {
  label: string
  value: string
  description: string
  uid: string
  type: PhotoExifType
  metaData: Record<string, string>
}

type Props = {
  tags: Tags
}

export function PhotoExifTable(props: Props) {
  const exifInfo = ExifInfo

  const rows = useMemo<PhotoExifTableDataRow[]>(() => {
    if (!props.tags) {
      return []
    }

    return exifInfo
      .map(item => {
        const tag = props.tags[item.key]

        if (!tag) {
          return null
        }

        const rowItem: PhotoExifTableDataRow = {
          label: item.displayName,
          value: tag.description,
          description: item.description,
          uid: nanoid(),
          type: PhotoExifType.None,
          metaData: {},
        }

        if (
          item.key === "GPSLatitude"
          || item.key === "GPSLongitude"
          || item.key === "GPSLatitudeRef"
          || item.key === "GPSLongitudeRef"
          || item.key === "GPSDateStamp"
        ) {
          rowItem.type = PhotoExifType.GPS
          rowItem.metaData.longitude = props.tags["GPSLongitude"].description
          rowItem.metaData.latitude = props.tags["GPSLatitude"].description
          rowItem.metaData.googleMapURL = `https://maps.google.com?q=${rowItem.metaData.latitude},${rowItem.metaData.longitude}`
          rowItem.label = "GPS 信息"
          rowItem.description = "图片拍摄时的设备 GPS 信息"

          if (item.key !== "GPSLatitude") {
            return null
          }
        }

        if (
          item.key === "Model"
          || item.key === "Make"
        ) {
          rowItem.type = PhotoExifType.DeviceModel
          rowItem.metaData.maker = props.tags["Make"].description
          rowItem.metaData.model = props.tags["Model"].description

          if (item.key !== "Make") {
            return null
          }
        }

        if (
          item.key === "DateTime"
        ) {
          rowItem.type = PhotoExifType.Date
        }

        return rowItem
      })
      .filter(i => !!i)
  }, [props.tags])

  return <Table isStriped aria-label="Exif Table">
    <TableHeader>
      <TableColumn>属性</TableColumn>
      <TableColumn>内容</TableColumn>
    </TableHeader>
    <TableBody>
      {
        rows.map(item => {
          let ValueJSX: React.ReactNode = item.value

          switch (item.type) {
            case PhotoExifType.GPS:
              ValueJSX = <Chip color={"danger"}>
                <a className={"underline flex flex-row items-center"} href={item.metaData.googleMapURL} target="_blank">
                  在 Google Map 查看详细位置
                  <GoLinkExternal/>
                </a>
              </Chip>
              break;
            case PhotoExifType.DeviceModel:
              ValueJSX = <Chip color={"secondary"}> <span className={"flex flex-row items-center"}><MdOutlinePhoneIphone/> {item.metaData.maker} {item.metaData.model}</span></Chip>
              break;
            case PhotoExifType.Date:
              ValueJSX = <Chip color="primary" className={"flex flex-row items-center"}> {item.value} </Chip>
              break;
          }

          return <TableRow key={item.uid}>
            <TableCell>
              <Tooltip content={item.description}>
                <span className={"cursor-pointer"}>{item.label}</span>
              </Tooltip>
            </TableCell>
            <TableCell>{ValueJSX}</TableCell>
          </TableRow>
        })
      }
    </TableBody>
  </Table>
}
