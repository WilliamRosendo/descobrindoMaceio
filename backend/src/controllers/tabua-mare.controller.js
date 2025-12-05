import axios from "axios";

export const getTideInfo = async (req, res) => {
  try {
    const { lat, lon, estado } = req.query;

    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

    const url = `https://tabuamare.devtu.qzz.io/api/v1/geo-tabua-mare/[${lat},${lon}]/${estado}/${mesAtual}/[${diaAtual}]`;

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    res.json(response.data);

  } catch (err) {
    console.error("Erro API Tábua:", err.response?.data || err);
    res.status(500).json({ error: "Erro ao consultar maré" });
  }
};
