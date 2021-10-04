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
