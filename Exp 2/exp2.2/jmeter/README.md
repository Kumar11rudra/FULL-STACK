# JMeter Benchmark Guide

Create a Thread Group with 50 users, 10-second ramp-up, and 10 loops. Add a GET sampler for `http://localhost:8081/api/v1/posts?page=0&size=20&sortBy=createdAt&direction=desc`, then add Summary and Aggregate Report listeners. Record throughput, mean response time, and error rate for different page sizes.

The pageable list uses `JOIN FETCH` to avoid an N+1 category lookup. `GET /api/v1/posts/{id}` is cached with Caffeine for 10 minutes, and every write evicts the cache.
