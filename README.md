### Microservice written in Node.js and MongoDB, containerized in Docker
It's a microservice that allows http POST to update a database with users' crypto holdings.  
It return the total amount of USD that the different cryptocurrencies make up to.  
  
It uses a mockup of Kafka to simulate streaming events.

To install and start the server you can run  
```
docker-compose up --build
```

To access and edit the data you can visit the url
```
http://localhost:3000/portfolio/client
```
