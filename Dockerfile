FROM readytalk/nodejs:latest
ADD . /app/
WORKDIR /app
RUN npm install -g npm && /nodejs/bin/npm install
ENTRYPOINT /nodejs/bin/npm start
