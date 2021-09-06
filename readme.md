This is the backend service of the lanport intranet.

`Important set first a jwt secret to sign jwts`

<h2>Run local</h2>
- Install node.js 
- run 'npm install'
- run 'npm run `mode`'
- mode -> `dev` or `prod`

<h2>Deployment</h2>
- Start process with: `nohup npm run prod &`
- Use reverse proxy of nginx to serve request
