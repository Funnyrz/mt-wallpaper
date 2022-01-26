import { createApi } from "unsplash-js";
const unsplash = createApi({
  accessKey: "4b01d6ff2904ca041c09ea00217760de754e92fa3167fb6074f51ad530f3c01d",
});
// non-feed example
export default {
  /**
   *  获取集合图片
   * @param {*} page
   * @param {*} perPage
   * @param {*} orderBy
   * @returns
   */
  async getCollections(page, perPage, orderBy) {
    const resp = await unsplash.collections.getPhotos({
      collectionId: "16122867",
      page: page,
      perPage: perPage,
      orderBy: orderBy,
    });
    return resp.response;
  },
  async trackDownload(download_location) {
    let resp = await unsplash.photos.trackDownload({
      downloadLocation: download_location,
    });
    return resp.response;
  },
};
