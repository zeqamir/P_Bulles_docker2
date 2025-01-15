FROM python:3.11-slim

WORKDIR /app

COPY app.py .

COPY requirements.txt .

EXPOSE 5000

RUN pip install -r requirements.txt

ENTRYPOINT ["python"] 

CMD ["app.py"]