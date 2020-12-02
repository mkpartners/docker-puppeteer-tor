# A minimal Docker image with Node, Puppeteer, and Tor
#
# Initially based upon:
# https://github.com/buildkite/docker-puppeteer
# Which in turn is based upon:
# https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-in-docker

FROM node:12.18.3-buster-slim@sha256:dd6aa3ed10af4374b88f8a6624aeee7522772bb08e8dd5e917ff729d1d3c3a4f
    
RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     # We install Chrome to get all the OS level dependencies, but Chrome itself
     # is not actually used as it's packaged in the node puppeteer library.
     && apt-get install -y google-chrome-stable \
     && apt-get install -y tor \
     && rm -rf /var/lib/apt/lists/* \
     # && wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh \
     # && chmod +x /usr/sbin/wait-for-it.sh
     && chmod +x /etc/tor/torrc

RUN sed -i '$a \SocksPort 9050\nSocksPort 9052\nSocksPort 9053\nSocksPort 9054' /etc/tor/torrc \
    && /etc/init.d/tor restart

# Install Puppeteer under /node_modules so it's available system-wide
ADD package.json package-lock.json /
RUN npm install
