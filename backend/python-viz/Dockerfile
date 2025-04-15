FROM python:3.10

# Install required Python packages
RUN pip install matplotlib plotly pandas  # 👈 Add pandas

COPY run.py /run.py
ENTRYPOINT ["python", "/run.py"]
