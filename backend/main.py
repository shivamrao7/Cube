from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class KeywordRequest(BaseModel):
    brand_url: str
    competitor_url: str
    locations: List[str]
    shopping_budget: int
    search_budget: int
    pmax_budget: int

class KeywordResponse(BaseModel):
    ad_groups: List[str]
    keywords: List[dict]
    suggested_cpc: float
    pmax_themes: List[str]

@app.post("/generate_keywords", response_model=KeywordResponse)
async def generate_keywords(req: KeywordRequest):
    # Placeholder logic. Replace with Google Ads API integration.
    ad_groups = ["Brand", "Category", "Competitor", "Location-based", "Informational"]
    keywords = [
        {
            "keyword": "brand shoes",
            "ad_group": "Brand",
            "avg_monthly_searches": 1200,
            "cpc_low": 10.5,
            "cpc_high": 25.0,
            "competition": "High",
        },
        {
            "keyword": "competitor shoes",
            "ad_group": "Competitor",
            "avg_monthly_searches": 800,
            "cpc_low": 9.0,
            "cpc_high": 22.0,
            "competition": "Medium",
        },
        {
            "keyword": f"shoes in {req.locations[0] if req.locations else 'Delhi'}",
            "ad_group": "Location-based",
            "avg_monthly_searches": 500,
            "cpc_low": 8.0,
            "cpc_high": 20.0,
            "competition": "Low",
        },
    ]
    suggested_cpc = (req.shopping_budget + req.search_budget + req.pmax_budget) / 3 / 100
    pmax_themes = ["Brand Awareness", "Product Promotion", "Competitor Targeting"]
    return KeywordResponse(
        ad_groups=ad_groups,
        keywords=keywords,
        suggested_cpc=suggested_cpc,
        pmax_themes=pmax_themes,
    )
