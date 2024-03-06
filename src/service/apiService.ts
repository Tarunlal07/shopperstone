import axios from "axios";
export async function getData(url: string, method = "post", requestData = {}) {
  try {
    const response = await axios({
      url,
      method,
      data: requestData,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
