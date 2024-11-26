from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
import google.generativeai as genai

# Configure Google API
genai.configure(api_key="AIzaSyDQYTgy2zH_dkPMjlDALjUHrro4k82Ya4U")  # Replace with your actual API key

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for all domains (or specify the domains as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust to restrict specific origins)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Input schema for patient data
class PatientData(BaseModel):
    risk_score: float
    age: int
    gender: str
    height: int
    weight: int
    ap_hi: int
    ap_lo: int
    cholesterol: int
    gluc: int

# Function to generate personalized precautions using Google's Gemini model
def generate_precautions(data: PatientData):
    try:
        # Create a prompt to generate precautions based on patient details
        prompt = (
            f"Provide a short, actionable healthcare precaution (max 100 words) to reduce cardiovascular disease risk for the following patient:\n\n"
            f"Age: {data.age}, Gender: {data.gender}, Height: {data.height} cm, Weight: {data.weight} kg,\n"
            f"Blood Pressure: {data.ap_hi}/{data.ap_lo} mmHg, Cholesterol: {data.cholesterol}, Glucose: {data.gluc},\n"
            f"Risk Score: {data.risk_score}%. Provide 1 concise tip."
        )       

        # Generate content using Google's Gemini model
        model = genai.GenerativeModel("gemini-1.5-flash")  # Use Gemini model
        response = model.generate_content(prompt)

        # Extract the generated content (precautions)
        precautions = response.text.strip()

        # Validate the output
        if len(precautions) < 20:  # If the output is too short or nonsensical
            precautions = "The recommendations could not be generated. Please consult a medical professional for guidance."

        return precautions
    except Exception as e:
        raise RuntimeError(f"Error generating precautions: {e}")

# API endpoint to get personalized precautions
@app.post("/precautions")
def get_precautions(data: PatientData):
    try:
        # Validate risk score
        if not (0 <= data.risk_score <= 100):
            raise ValueError("Risk score must be between 0 and 100.")
        
        # Generate precautions using the generative AI model
        precautions = generate_precautions(data)
        return {
            "risk_score": data.risk_score,
            "precautions": precautions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Health check endpoint
@app.get("/status")
def get_status():
    return {"status": "API is running"}
