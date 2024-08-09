export const ArrayUtility = {
  isEmptyOrNil<T>(array: any): boolean {
    return array === undefined || array === null || array.length === 0
  },
  /**
   * 通过索引更新数组元素，然后返回新的数组
   * @param array
   * @param item
   * @param index
   */
  updateItemByIndex<T>(array: T[], item: T, index: number): T[] {
    return [
      ...array.slice(0, index),
      item,
      ...array.slice(index + 1)
    ];
  }

}
