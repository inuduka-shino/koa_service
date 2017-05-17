#!/bin/sh
# ref: http://tech.sanwasystem.com/entry/2015/08/31/234131
echo 'start update sec key file for CA.'
read INPUT
# CA局用証明書 crtをインストールする
openssl genrsa 2048 -ase256 > ca/ca_server.key
openssl req -new -subj "//C=JP\ST=Kanagawa\O=Tama\OU=Nakanoshima\CN=cad001" -key ca/ca_server.key  > ca/ca.csr
openssl x509 -days 3650 -req -signkey ca/ca_server.key < ca/ca.csr > ca/ca.crt

#openssl フォルダ、初期ファイルが必要
# certmgr.msc
