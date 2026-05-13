package com.manam.backend.repository;

import com.manam.backend.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Long> {
    List<News> findByStatusOrderByCreatedAtDesc(String status);
    List<News> findByCategoryAndStatusOrderByCreatedAtDesc(String category, String status);
    List<News> findTop5ByStatusOrderByViewsDesc(String status);
}
