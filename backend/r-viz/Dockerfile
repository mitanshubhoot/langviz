FROM r-base

# 🛠 Install system dependencies for plotly, curl, openssl, etc.
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libpng-dev \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    libx11-dev \
    libxt-dev \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y pandoc

# ✅ Install required R packages with dependencies
RUN R -e "install.packages(c('ggplot2', 'plotly', 'rgl', 'htmlwidgets'), repos='http://cran.us.r-project.org')"

# Copy script runner
COPY run.R /run.R

# Execute user script
ENTRYPOINT ["Rscript", "/run.R"]
