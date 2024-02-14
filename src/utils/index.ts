import Item from "@/models/items";

export default function makeId(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

//Is not finished yet
export async function ratingItemByComments(itemId: string) {
  return new Promise((resolve, reject) => {
    try {
      const comments = Item.findById({ itemId });
      console.log(comments);
      let totalRating = 0;
      let totalComments = 0;
      // comments.forEach((comment) => {
      //   totalRating += comment.rating;
      //   totalComments++;
      // });
      const newRating = totalRating / totalComments;
      Item
        .findOneAndUpdate({ _id: itemId }, { rating: newRating })
        .then((item) => {
          resolve(item);
        });
    } catch (error) {
      reject(error);
    }
  }
  )
}