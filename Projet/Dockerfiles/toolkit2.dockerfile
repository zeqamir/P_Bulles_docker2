FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    openssh-server \
    netcat-openbsd \
    iperf3 \
    apache2

# Configuration du serveur SSH
RUN mkdir /var/run/sshd
RUN echo 'root:root' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
EXPOSE 22 80 443 5201

CMD ["/usr/sbin/sshd", "-D"]
