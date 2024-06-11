import { BASE_URI } from "@/variables/Global";
import OAuth from "../utils/OAuth";

const URL = BASE_URI + "rdkit/substructures";
export default {
    searchSubstructure: async (typeMol, mol, typeSub, sub) => {
        const response = await fetch(`${URL}/molecules/?typeMol=${typeMol}&mol=${mol}&typeSub=${typeSub}&sub=${sub}`);
        return await OAuth.parseResponse(response);
    }
}