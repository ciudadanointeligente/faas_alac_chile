zip -rq temp.zip authenticate.js creds.json package.json node_modules
wsk action create alac_auth --kind nodejs:6 temp.zip --web raw
rm temp.zip
