# Install
#### install chrome
sudo apt-get install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome*.deb
sudo apt-get install -f
npm install -g chrome-remote-interface
#### start chrome
google-chrome --headless --remote-debugging-port=9222 --disable-gpu
