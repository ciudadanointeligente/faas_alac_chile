zip -rq temp.zip authenticate.js creds.json package.json node_modules
wsk action create alac_chile_auth --kind nodejs:6 temp.zip --web true
rm temp.zip
