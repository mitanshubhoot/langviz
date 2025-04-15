from fastapi import FastAPI
from pydantic import BaseModel
import uuid
import os
import subprocess
from fastapi.middleware.cors import CORSMiddleware
import shutil

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ScriptRequest(BaseModel):
    language: str
    code: str

@app.post("/execute")
async def execute_script(payload: ScriptRequest):
    ext = "py" if payload.language == "python" else "R"
    uid = str(uuid.uuid4())
    script_path = f"/tmp/script_{uid}.{ext}"
    output_prefix = f"/tmp/output_{uid}"

    with open(script_path, "w") as f:
        f.write(payload.code)

    docker_image = "python-viz" if payload.language == "python" else "r-viz"

    try:
        subprocess.run([
            "docker", "run", "--rm",
            "-v", "/tmp:/scripts",
            docker_image,
            f"/scripts/{os.path.basename(script_path)}",
            f"/scripts/{os.path.basename(output_prefix)}"
        ], check=True)
    except subprocess.CalledProcessError:
        return {"error": "Script execution failed."}

    # Detect which output file was created
    if os.path.exists(output_prefix + ".html"):
        return {"viz_url": os.path.basename(output_prefix + ".html")}
    elif os.path.exists(output_prefix + ".png"):
        return {"viz_url": os.path.basename(output_prefix + ".png")}
    else:
        return {"error": "No visualization was generated."}
