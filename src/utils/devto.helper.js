const axios = require("axios")

const client = axios.create({
  baseURL: "https://dev.to/api/",
  timeout: 3000,
})

export const getDevArticles = async () => {
  try {
    const response = await client.get(`articles?username=makahernandez&page=1`)
    return response.data
  } catch (err) {
    console.log("ERROR:", err)
    throw err
  }
}
