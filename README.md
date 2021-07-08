# docker-puppeteer-tor

# To Run
sudo docker run -it -p 8118:8118 -p 9050:9050 -d dockerpuppeteertor:latest

# To Test from within the containers shell
curl -Lx http://127.0.0.1:8118 https://check.torproject.org/api/ip
