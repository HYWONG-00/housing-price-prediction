### Follow this link: https://www.youtube.com/watch?v=q8NOmLD5pTU&t=768s

!!! No need to use WinSCP

1. Launch EC2 instance + setup security group
2. When connecting EC2 instance,

- update all packages: sudo apt-get update
- install nginx: sudo apt-get install nginx

3. Clone github repo. (git clone <your-github-url>)
4. Setup nginx config file

- Unlink default config: go to /etc/nginx/sites-enabled, type "sudo unlink default"
- Go to sites-available: cd ../sites-available
- Add your own config file: sudo nano bhp.conf. All settings can be found in <references github>
- Link this custom config in sites-enabled:
  - cd ../sites-enabled
  - sudo ln -v -s /etc/nginx/sites-available/bhp.conf /etc/nginx/sites-enabled/bhp.conf
  - ll (to see if it is linked)
- Restart nginx server:

  - sudo service nginx restart
  - sudo service nginx status

- Reload website link (http://), It should be available/ have 403 forbinden error

### If 403 forbinden:

Potential issues: restricted file permission to client folder because nginx runs as the www-data user

1. Change Ownership of Files and Directories to www-data:

- sudo chown -R www-data:www-data /home/ubuntu/housing-price-prediction/client

2. Set Correct File Permissions

- sudo find /home/ubuntu/housing-price-prediction/client -type f -exec chmod 644 {} \;
- sudo find /home/ubuntu/housing-price-prediction/client -type d -exec chmod 755 {} \;

3. Verify Parent Directory Permissions

- sudo chmod +x /home /home/ubuntu /home/ubuntu/housing-price-prediction

4. Test and Restart Nginx

- sudo nginx -t (https://prnt.sc/cAwPEdPTFefV)
- sudo service nginx restart
- sudo service nginx status

After: https://prnt.sc/3WING4qK7QPF

### If 403 forbidden issues still there, you need to try other issues, but at least it points to the right file (Else, it should show 404, Not found)

### Start Flask server now:

1. Install python3 and pip

- python: 3.12, pip: 24.0, https://prnt.sc/YvERK2e24bxL

2. Install virtual environment

- apt install python<version>-venv
- python3 -m venv myenv
- source myenv/bin/activate
- pip install -r requirements.txt (numpy==1.26.4, python version==3.12)

3. If you see "ModuleNotFoundError: No module named 'distutils'", that's because distutils is no longer exist in python3.12

- pip install setuptools
- then try, pip install -r requirements.txt

4. Extra: If you see AttributeError: module 'pkgutil' has no attribute 'ImpImporter'. Did you mean: 'zipimporter', means package conflict

- check if requirements.txt are correct (Do not keep pip install -r requirements.txt as you just repeat the error)
- try manually install pip: https://stackoverflow.com/questions/77364550/attributeerror-module-pkgutil-has-no-attribute-impimporter-did-you-mean, then try python3 server.py

5. Make it 24/7 available now:

- Start a 24/7 service in /etc/systemd/system/:
- sudo nano /etc/systemd/system/myserver.service
  In the myserver.service:
  [Unit]
  Description=My Python Server
  After=network.target

[Service]
ExecStart=/home/ubuntu/housing-price-prediction/server/myenv/bin/python3 /home/ubuntu/housing-price-prediction/server/server.py
WorkingDirectory=/home/ubuntu/housing-price-prediction/server
Environment=PATH=/home/ubuntu/housing-price-prediction/server/myenv/bin
StandardOutput=inherit
StandardError=inherit
SyslogIdentifier=python-server
Restart=always
User=ubuntu
Group=ubuntu

[Install]
WantedBy=multi-user.target

### !!! Disclaimer:

ExecStart=<venv's python3> <server file>
WorkingDirectory=<server folder>
Environment=PATH=<your virtual environment>

Continue....

- sudo systemctl daemon-reload
- sudo systemctl start myserver.service
- sudo systemctl enable myserver.service
- sudo systemctl status myserver.service (https://prnt.sc/nRQehJ34trJ6)
- Close the terminal and check: http://ec2-13-211-164-71.ap-southeast-2.compute.amazonaws.com/

### Before that, please check if both https:// and http:// are accessible

- Example: [http:///](http://13.211.164.71/) and [https:///](https://13.211.164.71/)
-

# Congratulations. You are Done!!!
