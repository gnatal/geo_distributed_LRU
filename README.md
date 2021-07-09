# geo_distributed_LRU
>At Ormuco, we want to optimize every bits of software we write. Your goal is to write a new library that can be integrated to the Ormuco stack. Dealing with network issues everyday, latency is our biggest problem. Thus, your challenge is to write a new Geo Distributed LRU (Least Recently Used) cache with time expiration. This library will be used extensively by many of our services so it needs to meet the following criteria:         
1. Simplicity. Integration needs to be dead simple.      
2. Resilient to network failures or crashes.      
3. Near real time replication of data across Geolocation. Writes need to be in real time.      
4. Data consistency across regions      
5. Locality of reference, data should almost always be available from the closest region      
6. Flexible Schema      
7. Cache can expire   

## hints
>As a hint, we are not looking for quantity, but rather quality, maintainability, scalability, testability and a code that you can be proud of.   When submitting your code add the necessary documentation to explain your overall design and missing functionalities.  Do it to the best of your knowledge.


## Assumptions

>I'm assuming that I have a bunch of middle servers (CDN's) just to choose the best place to request, also I'm assuming that I have a queue that can hold failed requests to try again. This code actually run at one of this middle servers doing the following:
when asked for a resource, this server search in his cache if the resource is there,
if isn't it will search for the resource at the closest instance, when asked to write
a new resource the server will create a queue with all instances and send a write 
order, if any write order fails, this order go to the end of the queue to be tried again. An update is just a "write operation", the deletion also works in with this queue.

## How to run 

1. download the repositor

2. run yarn

3. run yarn knex:migrate

4. run yarn knex:seed

## testing

You can test with post man (there is the collection file in the root path collection.js)
or you can simply run the unit tests

```
    yarn test

```

