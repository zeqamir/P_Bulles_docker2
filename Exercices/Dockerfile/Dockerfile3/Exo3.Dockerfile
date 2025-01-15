FROM python:3.11-slim

WORKDIR /app

COPY Main.java .

EXPOSE 8080

RUN 

ENTRYPOINT ["java"] 

CMD ["Main.java"]