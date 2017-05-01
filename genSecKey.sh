#!/bin/sh
echo 'start update sec key file!'
read INPUT
openssl genrsa 2048 -ase256 > sec/server.key
openssl req -new -sha256 -key sec/server.key -out sec/server.csr
openssl x509 -days 3650 -req -signkey sec/server.key < sec/server.csr > sec/server.crt
