# Experiment 2.2 - Scalable Read APIs and Performance Optimization

This project implements Experiment 2.2.1 and 2.2.2 with Spring Data pagination, sorting, fetch-join query optimization, Caffeine caching, and a native SQL aggregation query.

## Run

```bash
mvn spring-boot:run
```

The service starts at `http://localhost:8081` with 60 seed posts and three categories.

## APIs

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/v1/posts?page=0&size=10&sortBy=createdAt&direction=desc` | Paginated and sortable posts |
| GET | `/api/v1/posts/{id}` | Cached post lookup |
| GET | `/api/v1/posts/category-stats` | Native SQL aggregation |
| POST | `/api/v1/posts` | Create a post |
| PUT | `/api/v1/posts/{id}` | Update a post |
| DELETE | `/api/v1/posts/{id}` | Delete a post |

Allowed sort fields: `id`, `title`, `createdAt`, and `viewCount`; max page size: 100.

```json
{"title":"Caching in Spring Boot","content":"A scalable read API example.","categoryId":1}
```

`JOIN FETCH` retrieves each post and category together, avoiding the N+1 relation lookup. Repeated `GET /{id}` responses use a Caffeine cache and writes evict stale cache entries. See `jmeter/README.md` for benchmark steps.
