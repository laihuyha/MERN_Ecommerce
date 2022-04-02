import React from "react";
import { API } from "../config";

//item = {product} and url means the url of the image
const ShowImage = ({ item, url }) => {
  return (
    <div class="img-wrap">
      <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} />
      {/*url = product, item = product*/}
    </div>
  );
};
export default ShowImage;
