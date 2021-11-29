import { createApi } from "unsplash-js";
const unsplash = createApi({
  accessKey: "4b01d6ff2904ca041c09ea00217760de754e92fa3167fb6074f51ad530f3c01d",
});
// non-feed example
export default {
  getPhotos(page, perPage, orderBy) {
    console.log(page, perPage, orderBy);
    // feed example
    unsplash.collections
      .getPhotos({ collectionId: "16122867" })
      .then((result) => {
        if (result.errors) {
          // handle error here
          console.log("error occurred: ", result.errors[0]);
        } else {
          const feed = result.response;

          // extract total and results array from response
          const { total, results } = feed;

          // handle success here
          console.log(`received ${results.length} photos out of ${total}`);
          console.log("first photo: ", results[0]);
        }
      });
  },
};
