FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
tshark \ 
tcpdump \ 
nmap \ 
openssh-client

WORKDIR /app

CMD ["/bin/bash"]
