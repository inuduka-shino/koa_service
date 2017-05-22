#!/bin/sh
# ref: http://tech.sanwasystem.com/entry/2015/08/31/234131
# CA局で署名するServer証明書
openssl genrsa 2048 -sha256 > server001/server.key
openssl req -new -key server001/server.key  -config server001.conf  -subj "//C=JP\ST=Kanagawa\O=Tama\OU=Nakanoshima\CN=bansaku.mskinkk.private" > server001/server.csr

#署名
#openssl フォルダ、初期ファイルが必要
openssl ca -days 365 -cert ca/ca.crt -keyfile ca/ca_server.key -config server001.conf -in server001/server.csr  > server001/server.crt
