FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
wireshark \ 
tcpdump \ 
nmap \ 
openssh-client

WORKDIR /app

CMD ["/bin/bash"]
