import axios from "axios";

async function getQuiz() {
  return axios.get("/api/get-quiz").then((response) => response.data);
}

export default getQuiz;
