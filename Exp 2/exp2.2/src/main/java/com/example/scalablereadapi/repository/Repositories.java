package com.example.scalablereadapi.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.scalablereadapi.model.Category;
import com.example.scalablereadapi.model.Post;

public final class Repositories {
    private Repositories() { }
    public interface CategoryRepository extends JpaRepository<Category, Long> { }
    public interface CategoryPostCount { String getCategory(); long getPostCount(); }
    public interface PostRepository extends JpaRepository<Post, Long> {
        @Query(value = "select p from Post p join fetch p.category", countQuery = "select count(p) from Post p")
        Page<Post> findAllWithCategory(Pageable pageable);
        @Query(value = "select c.name as category, count(p.id) as postCount from posts p join categories c on p.category_id = c.id group by c.name order by postCount desc", nativeQuery = true)
        List<CategoryPostCount> countPostsByCategory();
    }
}
