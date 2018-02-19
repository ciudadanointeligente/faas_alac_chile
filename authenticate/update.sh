zip -rq temp.zip authenticate.js creds.json package.json node_modules templates
wsk action update alac_chile_auth --kind nodejs:6 temp.zip --web raw
rm temp.zip
