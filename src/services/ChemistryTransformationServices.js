import { BASE_URI } from "@/variables/Global";
import OAuth from "../utils/OAuth";

const URL = BASE_URI + "rdkit/transformations/";
export default {
  removeSubstructures: async (baseType, mol, subType, sub) => {
    const response = await fetch(`${URL}/read/simpe/smiles/?smiles=${smiles}`);
    return await OAuth.parseResponseAsBlob(response);
  }
}