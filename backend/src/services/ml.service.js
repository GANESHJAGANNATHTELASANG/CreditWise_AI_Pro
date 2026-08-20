import axios from "axios";

const ML_API_URL = "http://127.0.0.1:8000";

const predictCreditApproval = async (data) => {
  try {
    const response = await axios.post(`${ML_API_URL}/predict`, data);

    return response.data;
  } catch (error) {
    console.error("ML API Error:", error.response?.data || error.message);

    throw new Error("ML prediction service is unavailable");
  }
};

export { predictCreditApproval };
