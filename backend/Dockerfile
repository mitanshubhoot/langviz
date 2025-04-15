FROM python:3.10

# Install dependencies
RUN apt-get update && apt-get install -y docker.io

# Set up app directory
WORKDIR /app
COPY . .

# Install FastAPI and Uvicorn
RUN pip install fastapi uvicorn pydantic

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
