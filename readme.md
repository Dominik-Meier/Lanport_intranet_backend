This is the backend service of the lanport intranet.

`Important set first a jwt secret to sign jwts`

<h2>Run local</h2>
- Install node.js 
- run 'npm install'
- run 'npm run `mode`'
- mode -> `dev` or `prod`

<h2>Deployment</h2>
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
