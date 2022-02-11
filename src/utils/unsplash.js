import { createApi } from "unsplash-js";
import { unsplashConfig } from "config";
const unsplash = createApi({
  accessKey: unsplashConfig.accessKey,
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
      collectionId: unsplashConfig.defaultCollId,
      page: page,
      perPage: perPage,
      orderBy: orderBy,
    });
    return resp.response;
  },
  async searchPhotos(key, page, perPage, orderBy) {
    const resp = await unsplash.search.getPhotos({
      query: key,
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
