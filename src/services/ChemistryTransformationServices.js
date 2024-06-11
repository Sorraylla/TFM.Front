import { BASE_URI } from "@/variables/Global";
import OAuth from "../utils/OAuth";

const URL = BASE_URI + "rdkit/transformations";
export default {
  removeSubstructure: async (baseType, mol, subType, sub) => {
    const response = await fetch(`${URL}/removeSubstructure?baseType=${baseType}&mol=${mol}&subType=${subType}&sub=${sub}`);
    return await OAuth.parseResponseAsBlob(response);
  },
  replaceSubstructure: async (baseType, mol, pattType, patt, replType, repl) => {
    const response = await fetch(`${URL}/replaceSubstructure?baseType=${baseType}&mol=${mol}&pattType=${pattType}&patt=${patt}&replType=${replType}&repl=${repl}`);
    return await OAuth.parseResponseAsBlob(response);
  },
  removeLateralChains: async (baseType, mol, coreType, core) => {
    const response = await fetch(`${URL}/removeLateralChains?baseType=${baseType}&mol=${mol}&coreType=${coreType}&core=${core}`);
    return await OAuth.parseResponseAsBlob(response);
  },
  removeCore: async (baseType, mol, coreType, core) => {
    const response = await fetch(`${URL}/removeCore?baseType=${baseType}&mol=${mol}&coreType=${coreType}&core=${core}`);
    return await OAuth.parseResponseAsBlob(response);
  }
}