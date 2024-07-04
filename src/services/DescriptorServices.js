import { BASE_URI } from "@/variables/Global";
import OAuth from "../utils/OAuth";

const URL = BASE_URI + "rdkit/descriptors";
export default {
  getDescriptors: async (smiles) => {
    const response = await fetch(`${URL}/?smiles=${smiles}`);
    return await OAuth.parseResponse(response);
  }
}