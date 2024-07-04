import { BASE_URI } from "@/variables/Global";
import OAuth from "../utils/OAuth";

const URL = BASE_URI + "rdkit";
export default {
  getMoleculeSmiles: async (smiles) => {
    const response = await fetch(`${URL}/read/simple/smiles/?smiles=${smiles}`);
    return await OAuth.parseResponseAsBlob(response);
  },
  postMoleculeFile: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${URL}/read/simple/files/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        // No establezcas 'Content-Type' aquí; déjalo para el navegador
      },
      body: formData,
    });

    return await OAuth.parseResponseAsBlob(response);
  },
  deleteMolecule: async (id) => {
    const response = await fetch(`${URL}/molecule/?id_molecule=${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await OAuth.parseResponse(response);
  },

  postMoleculeInfo: async (info) => {
    const response = await fetch(`${URL}/molecule/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    const value = await OAuth.parseResponse(response);
    return value;
  },
  updateMolecule: async (info) => {
    const response = await fetch(`${URL}/molecule/`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    const value = await OAuth.parseResponse(response);
    return value;
  },





  getMoleculeSmilesInfo: async (userId) => {
    const response = await fetch(`${URL}/molecules/?userId=${userId}`);
    return await OAuth.parseResponse(response);
  },
};
