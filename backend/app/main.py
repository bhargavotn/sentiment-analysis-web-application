from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from strawberry import Schema
from strawberry.fastapi import GraphQLRouter
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import strawberry

model = AutoModelForSequenceClassification.from_pretrained("./model")
tokenizer = AutoTokenizer.from_pretrained("./model")

@strawberry.type
class Sentiment:
    label: str
    score: float

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "Hello, world!"

@strawberry.type
class Mutation:
    @strawberry.field
    def analyze_sentiment(self, text: str, info: strawberry.Info) -> Sentiment:
        request = info.context["request"]
        api_key = request.headers.get("X-API-Key")
        if api_key != "newsecretkey123":
            raise HTTPException(status_code=401, detail="Invalid API key")
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="Text cannot be empty")
        
        inputs = tokenizer(text, return_tensors="pt", max_length=512, truncation=True)
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = logits.softmax(dim=1)
        predicted_class = probabilities.argmax().item()
        score = probabilities[0][predicted_class].item()
        label = model.config.id2label[predicted_class]
        return Sentiment(label=label, score=score)

schema = Schema(query=Query, mutation=Mutation)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:80"],  # Docker frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow POST, OPTIONS, etc.
    allow_headers=["*"],  # Allow X-API-Key, etc.
)

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")