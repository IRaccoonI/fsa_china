import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import axios from "axios";
import { BEARER_TOKEN } from "../constants/bearer";
import { jsonToXlsx } from "../services/saveXlsx";
import { getFsa } from "../services/getFsa";
import { prepareData } from "../services/prepareData";

const router = express.Router();

router.get<{}, MessageResponse>("/get-china", async (req, res) => {
  try {
    const { minDate, maxDate } = {
      minDate: req.query.minDate as string,
      maxDate: req.query.maxDate as string,
    };

    let items: Record<string, any>[] = [];
    let page = 0;

    while (true) {
      const { data } = await getFsa(minDate, maxDate, page);
      page += 1;

      if (!data.items.length) {
        break;
      }

      items.push(...prepareData(data.items));
      console.log(items.length);
    }

    const filePath = jsonToXlsx(items);
    res.download(filePath, "china.xlsx", (err) => {
      if (err) {
        console.error("Ошибка при отправке файла:", err);
        res.status(500).send({ message: "Ошибка при скачивании файла" });
      }
    });
  } catch (e) {
    res.status(500).send({ message: String(e) });
  }
});

export default router;
