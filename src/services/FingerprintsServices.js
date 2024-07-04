import { BASE_URI } from "@/variables/Global";
import OAuth from "../utils/OAuth";

const URL = BASE_URI + "rdkit/similarity";
export default {
  calculateSimilarity: async (smiles1, smiles2, fp_type, meetric, radius) => {
    const response = await fetch(
      `${URL}/?smiles1=${smiles1}&smiles2=${smiles2}&fp_type=${fp_type}&metric=${meetric}&radius=${radius}`
    );
    return await OAuth.parseResponse(response);
  },
};
