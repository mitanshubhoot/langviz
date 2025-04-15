
# 🌐 LangViz - Language-Agnostic Visualization App

**LangViz** is a web application that allows users to write and run **Python** or **R** scripts that generate visualizations. These can be static (e.g., Matplotlib, ggplot2) or interactive (e.g., Plotly), and the output is rendered directly in the frontend.

---

## 🚀 Features

- 🧠 Supports both **Python** and **R** for visualization.
- 📊 Works with **static**, **interactive**, and **3D** visualizations (if the library supports it).
- ✍️ Users can input custom code in the browser or load a sample snippet.
- 🧱 Executions are **Docker-isolated** for safety.
- 🖼 Automatically detects output type (`.png`, `.html`) and renders accordingly.
- ⚡ Clean UI using **Material UI (MUI)**.

---

## 🛠 Tech Stack

| Component   | Technology                      |
|-------------|----------------------------------|
| Frontend    | React, Material UI               |
| Backend     | FastAPI                          |
| Execution   | Python + R inside Docker         |
| Visualization | Matplotlib, Plotly (Python/R), ggplot2 |
| Server      | Nginx                            |
| Orchestration | Docker, Docker Compose         |

---

## 📁 Project Structure

```
language-agnostic-viz-app/
│
├── backend/
│   ├── main.py                # FastAPI backend
│   ├── run.py                 # Executes Python scripts
│   ├── run.r                  # Executes R scripts
│   ├── Dockerfile             # Backend image for Python or R
│
├── frontend/
│   ├── src/
│   │   └── App.jsx            # Main React UI
│   └── Dockerfile
│
├── nginx/
│   └── default.conf           # Serves output files
│
├── docker-compose.yml        # App orchestration
└── README.md                 # (You're here!)
```

---

## 🧑‍💻 Setup & Run Locally

> Prerequisite: Docker & Docker Compose must be installed.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/langviz.git
cd langviz
```

### 2. Start the application

```bash
docker-compose up --build
```

### 3. Open the app in your browser

```bash
http://localhost:3000
```

---

## ✍️ Usage Instructions

1. **Select Language**: Use the dropdown to choose between Python and R.
2. **Write or Load Code**: Type your visualization script, or click **"Load Sample"**.
3. **Click Generate**: The backend will execute your script inside a Docker container.
4. **View Output**: Based on your script, it will render:
   - A **static image** (`.png`)
   - An **interactive chart** (`.html`)

---

## ✅ Example Scripts

### Python (Matplotlib - Static)
```python
import matplotlib.pyplot as plt
plt.plot([1, 2, 3], [4, 5, 6])
plt.title("Sample Python Plot")
plt.savefig("output.png")
```

### Python (Plotly - Interactive)
```python
import plotly.express as px
fig = px.bar(x=["A", "B", "C"], y=[10, 20, 30])
fig.write_html("output.html")
```

### R (ggplot2 + Plotly - Interactive)
```r
library(ggplot2)
library(plotly)
df <- data.frame(x=1:5, y=c(2, 5, 3, 7, 4))
p <- ggplot(df, aes(x, y)) + geom_line() + ggtitle("Sample R Plot")
htmlwidgets::saveWidget(plotly::ggplotly(p), "output.html", selfcontained=TRUE)
```

---

## 🛡️ Security

- All user-submitted code is executed in **isolated containers**.
- No direct file access or system-level access is permitted.

---

## 🧩 Troubleshooting

- **Blank output?** Make sure your script saves to `output.png` or `output.html`.
- **500 Error from backend?** Check Docker logs for script errors.
- **React dev server not loading?** Make sure port 3000 is free and accessible.

---

## 📽️ Demo

_A screen recording link showing working examples for Python and R will go here._  
👉 _[Upload a video to Loom, YouTube, or Drive and paste link here]_

---

## 🧑‍🎓 Author

**Mitanshu Bhoot**  
Feel free to connect on [LinkedIn](https://www.linkedin.com/) or explore more projects on [GitHub](https://github.com/mitanshubhoot)

---
