import axios from "axios";

export async function getBearer() {
  const data = {
    username: "anonymous",
    password: "hrgesf7HDR67Bd",
  };

  const response = await axios.post("https://pub.fsa.gov.ru/login", data);

  const authorizationHeader = response.headers["authorization"];

  return authorizationHeader;
}
