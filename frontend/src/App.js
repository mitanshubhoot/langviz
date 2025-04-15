import React, { useState } from "react";
import axios from "axios";
import {
  Box, Button, Container, CssBaseline, FormControl, InputLabel,
  MenuItem, Select, TextField, Typography
} from "@mui/material";

const samplePython = `import matplotlib.pyplot as plt
plt.plot([1, 2, 3], [4, 5, 6])
plt.title("Sample Python Plot")
plt.savefig("output.png")`;

const sampleR = `library(ggplot2)
library(plotly)
df <- data.frame(x=1:5, y=c(2, 5, 3, 7, 4))
p <- ggplot(df, aes(x, y)) + geom_line() + ggtitle("Sample R Plot")
htmlwidgets::saveWidget(plotly::ggplotly(p), "output.html", selfcontained=TRUE)`;

export default function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(samplePython);
  const [vizUrl, setVizUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setVizUrl(null);
    try {
      const response = await axios.post("http://localhost:8000/execute", {
        language,
        code,
      });
      setVizUrl(response.data.viz_url);
    } catch (error) {
      alert("Something went wrong while generating the visualization.");
    }
    setLoading(false);
  };

  const handleSample = () => {
    setCode(language === "python" ? samplePython : sampleR);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", pb: 5 }}>
        <Box sx={{ backgroundColor: "white", py: 2, boxShadow: 2 }}>
          <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold" color="primary">LangViz</Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl size="small">
                <InputLabel>Language</InputLabel>
                <Select value={language} onChange={(e) => setLanguage(e.target.value)} label="Language">
                  <MenuItem value="python">Python</MenuItem>
                  <MenuItem value="r">R</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={handleSample} variant="outlined">Load Sample</Button>
              <Button onClick={handleGenerate} variant="contained" disabled={loading}>
                {loading ? "Generating..." : "Generate"}
              </Button>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <TextField
            fullWidth multiline minRows={10}
            variant="outlined" value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />

          {vizUrl && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" mb={1}>Visualization Output</Typography>
              {vizUrl.endsWith(".html") ? (
                <iframe
                  src={`http://localhost:8080/${vizUrl}`}
                  title="Visualization"
                  style={{ width: "100%", height: "600px", border: "1px solid #ccc", borderRadius: "8px" }}
                />
              ) : (
                <img
                  src={`http://localhost:8080/${vizUrl}`}
                  alt="Visualization Output"
                  style={{ width: "100%", border: "1px solid #ccc", borderRadius: "8px" }}
                />
              )}
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}
