import { BASE_URI } from "@/variables/Global";
import OAuth from "../utils/OAuth";

const URL = BASE_URI + "rdkit/reaction";
export default {
  getReactionImage: async (reaction) => {
    const response = await fetch(`${URL}/?reaction=${encodeURIComponent(reaction)}`);
    return await OAuth.parseResponseAsBlob(response);
  }
}