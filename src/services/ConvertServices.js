import { BASE_URI } from "@/variables/Global";
import OAuth from "../utils/OAuth";

const URL = BASE_URI + "rdkit/convert";
export default {
    convert: async (convert) => {
        const response = await fetch(`${URL}/`, {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(convert),
          });
        return await OAuth.parseResponse(response);
    }
}




