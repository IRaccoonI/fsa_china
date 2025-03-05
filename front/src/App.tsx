import { Button, Box, TextField, Typography } from "@mui/material";
import { api } from "./services/api";
import { saveAs } from "file-saver";
import { useMemo, useState } from "react";

const getLast7Days = () => {
  const end = new Date(); // Текущая дата
  const start = new Date();
  start.setDate(end.getDate() - 7); // Отнимаем 7 дней от текущей даты

  // Преобразуем обе даты в формат ISO (yyyy-mm-dd)
  const startDate = start.toISOString().split("T")[0];
  const endDate = end.toISOString().split("T")[0];

  return { minDate: startDate, maxDate: endDate };
};

const { minDate, maxDate } = getLast7Days();

const App = () => {
  const [regDate, setRegDate] = useState(() => ({ minDate, maxDate }));
  const [isLoading, setIsLoading] = useState(false);

  const error = useMemo(() => {
    if (new Date(regDate.minDate) > new Date(regDate.maxDate)) {
      return "Минимальная дата не может быть больше максимальной.";
    }

    return "";
  }, [regDate]);

  const warning = useMemo(() => {
    const diffDays =
      (new Date(regDate.maxDate).getTime() -
        new Date(regDate.minDate).getTime()) /
      (1000 * 3600 * 24);

    if (diffDays > 7) {
      return "Не рекомендуется ставить разницу между датами, превышающею 7 дней!";
    }

    return "";
  }, [regDate]);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/get-china", {
        responseType: "blob",
        params: regDate,
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Форматирование дат для использования в имени файла
      const formattedMinDate = new Date(regDate.minDate)
        .toLocaleDateString()
        .replace(/\//g, "-");
      const formattedMaxDate = new Date(regDate.maxDate)
        .toLocaleDateString()
        .replace(/\//g, "-");

      // Используем диапазон дат в качестве имени файла
      const fileName = `china_${formattedMinDate}_to_${formattedMaxDate}.xlsx`;

      saveAs(blob, fileName);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="gray.100"
    >
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" justifyContent="center" gap={2}>
          <TextField
            label="Минимальная дата"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={regDate.minDate}
            onChange={(e) =>
              setRegDate({ ...regDate, minDate: e.target.value })
            }
          />
          <TextField
            label="Максимальная дата"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={regDate.maxDate}
            onChange={(e) =>
              setRegDate({ ...regDate, maxDate: e.target.value })
            }
          />
        </Box>
        {warning && (
          <Box width="100%">
            <Typography color="warning" align="center">
              {warning}
            </Typography>
          </Box>
        )}

        {error && (
          <Box width="100%">
            <Typography color="error" align="center">
              {error}
            </Typography>
          </Box>
        )}
        <Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClick}
            disabled={!!error}
            loading={isLoading}
          >
            Click Me
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
