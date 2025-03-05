import axios from "axios";
import { BEARER_TOKEN } from "../constants/bearer";
import { getBearer } from "./getBearer";

export const getFsa = async (
  startDate: string,
  endDate: string,
  page: number
) => {
  const bearer = await getBearer();

  return await axios.post<{ items: Record<string, any>[] }>(
    "https://pub.fsa.gov.ru/api/v1/rds/common/declarations/get",
    {
      size: 1000,
      page: page,
      filter: {
        status: [6, 3],
        idDeclType: [],
        idCertObjectType: [],
        idProductType: [],
        idGroupRU: [],
        idGroupEEU: [],
        idTechReg: [],
        idApplicantType: [],
        regDate: { minDate: startDate, maxDate: endDate },
        endDate: { minDate: null, maxDate: null },
        columnsSearch: [{ name: "number", search: "", type: 9 }],
        idProductOrigin: ["156"],
        idProductEEU: [],
        idProductRU: [],
        idDeclScheme: [],
        awaitForApprove: null,
        awaitOperatorCheck: null,
        editApp: null,
        violationSendDate: null,
        isProtocolInvalid: null,
        checkerAIResult: null,
        checkerAIProtocolsResults: null,
        checkerAIProtocolsMistakes: null,
        hiddenFromOpen: null,
      },
      columnsSort: [{ column: "declDate", sort: "DESC" }],
    },
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        Authorization: bearer, // Замени на свой токен
        lkId: "",
        orgId: "",
        Pragma: "no-cache",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        Origin: "https://pub.fsa.gov.ru",
        Connection: "keep-alive",
        Referer: "https://pub.fsa.gov.ru/rds/declaration",
        Cookie:
          "_ym_uid=1739612986374266140; _ym_d=1739612986; _ym_isad=1; show_new_design=no; show_old_design=always",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
      },
    }
  );
};
