This is the backend service of the lanport intranet.

`Important set first a jwt secret to sign jwts`

<h2>Run local</h2>
- Install node.js 
- run 'npm install'
- run 'npm run `mode`'
- mode -> `dev` or `prod`

<h1>Deployment</h1>

- create a env file at `/home/intranet/backend/Dominik-Meier/.env`
```
APP_PORT=3000
APP_JSON_PARSER_LIMIT=50mb
APP_URL_ENCODER_LIMIT=50mb
JWT_SECRET=<jwt_secret>
JWT_ISSUER=backend.intranet.lanport.ch
JWT_TIMER_TOKEN=5min
JWT_TIMER_REFRESH_TOKEN=30d
CHALLONGE_API_KEY=<challonge_token>
```

<h2>As node js as Background process</h2>

- Start process with: `nohup npm run prod &`
- At vm use systemctl `sudo systemctl start lp_backend` `sudo systemctl stop lp_backend` `sudo systemctl restart lp_backend`
- be sure the following script is placed inside `/usr/lib//systemd/system/lp_backend.service`:

```
[Unit]
Description=lp intranet backend
After=network.target

[Service]
Type=simple
User=lanport
WorkingDirectory=/home/intranet/backend/Dominik-Meier
ExecStart=npm run prod
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

<h2>Served with Nginx</h2>
- Use reverse proxy of nginx to serve request
- Use the following nginx config inside `/etc/nginx/conf.d/app.conf`
- this sets up any nginx server for the frontend backend with websockets all secured by ssl
```
server {
 listen 8444 ssl;
 ssl_certificate intranet.lanport.ch.crt;
 ssl_certificate_key intranet.lanport.ch.key;
 server_name 172.16.30.8;

 location / {
   proxy_pass https://localhost:3000;
   proxy_http_version 1.1;
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection 'upgrade';
   proxy_set_header Host $host;
   proxy_cache_bypass $http_upgrade;
  }

 location /ws {
   proxy_pass https://localhost:3000;
   proxy_http_version 1.1;
   proxy_set_header Upgrade $http_upgrade;
   proxy_set_header Connection 'upgrade';
   proxy_set_header Host $host;
   proxy_cache_bypass $http_upgrade;
  }
}


server {
 listen 8443 ssl;
 server_name 172.16.30.8;
 ssl_certificate intranet.lanport.ch.crt;
 ssl_certificate_key intranet.lanport.ch.key;
 root /etc/nginx/dist/intranet;
 location / {
  try_files $uri $uri/ /index.html;
 }
}
```


<h2>DB Backup</h2>
- For the Db backup make sure that a crontab exsist us cmd `crontab -e`
```
0 * * * * /home/intranet/backend/Dominik-Meier/db_backup_script.sh
```

- make sure the following script exists `/home/intranet/backend/Dominik-Meier/db_backup_script.sh`
```
#!/bin/bash

# Get the day of week
_dow="$(date +'%T')"

# open database, wait up to 20 seconds for any activity to end and create a backup file
sqlite3 /home/intranet/backend/Dominik-Meier/prod.sqlite << EOF
.timeout 20000
.backup /home/intranet/backend/Dominik-Meier/db_backups/prod_${_dow}.sqlite
EOF
```
