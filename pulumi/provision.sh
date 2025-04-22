#!/usr/bin/env bash

apt-get update -y
apt-get upgrade -y

apt-get install -y net-tools git curl

# Configure Firewall
ufw allow ssh
ufw enable

# Install Docker
curl -fsSL https://get.docker.com | CHANNEL=stable bash
systemctl enable --now docker