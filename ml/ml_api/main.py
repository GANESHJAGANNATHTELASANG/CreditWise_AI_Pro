
from pydantic import BaseModel
from pathlib import Path

import joblib
import pandas as pd

from fastapi import FastAPI


app = FastAPI(
    title="CreditWise ML API",
    description="Machine Learning API for CreditWise",
    version="1.0.0"
)


# Get the project root path
BASE_DIR = Path(__file__).resolve().parent.parent

# Path to the trained model
MODEL_PATH = BASE_DIR / "models" / "creditwise_final_model.pkl"


# Load the trained model
model = joblib.load(MODEL_PATH)
class LoanApplication(BaseModel):
    no_of_dependents: float
    income_annum: float
    loan_amount: float
    loan_term: float
    cibil_score: float
    residential_assets_value: float
    commercial_assets_value: float
    luxury_assets_value: float
    bank_asset_value: float
    total_assets: float
    loan_to_income_ratio: float
    asset_to_loan_ratio: float
    asset_to_income_ratio: float

    education: str
    self_employed: str


@app.get("/")
def root():
    return {
        "success": True,
        "message": "CreditWise ML API is running"
    }


@app.post("/predict")
def predict(application: LoanApplication):

    data = application.model_dump()

    model_input = {
        "no_of_dependents": data["no_of_dependents"],
        " income_annum": data["income_annum"],
        " loan_amount": data["loan_amount"],
        " loan_term": data["loan_term"],
        " cibil_score": data["cibil_score"],
        " residential_assets_value": data["residential_assets_value"],
        " commercial_assets_value": data["commercial_assets_value"],
        " luxury_assets_value": data["luxury_assets_value"],
        " bank_asset_value": data["bank_asset_value"],
        " total_assets": data["total_assets"],
        " loan_to_income_ratio": data["loan_to_income_ratio"],
        " asset_to_loan_ratio": data["asset_to_loan_ratio"],
        " asset_to_income_ratio": data["asset_to_income_ratio"],
        " education": data["education"],
        " self_employed": data["self_employed"]
    }

    model_input_df = pd.DataFrame([model_input])

    prediction = model.predict(model_input_df)

    prediction_value = int(prediction[0])

    status = "Approved" if prediction_value == 1 else "Rejected"

    return {
    "success": True,
    "prediction": prediction_value,
    "status": status
    }

    