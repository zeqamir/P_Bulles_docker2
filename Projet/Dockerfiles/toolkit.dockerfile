FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    openssh-client\    
    tcpdump \
    tshark \ 
    nmap

WORKDIR /app

CMD ["/bin/bash"]
