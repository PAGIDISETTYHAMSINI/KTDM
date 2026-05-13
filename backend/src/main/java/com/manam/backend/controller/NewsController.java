package com.manam.backend.controller;

import com.manam.backend.model.News;
import com.manam.backend.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    @Autowired
    private NewsRepository newsRepository;

    @PostMapping
    public ResponseEntity<News> createNews(@RequestBody News news) {
        return ResponseEntity.ok(newsRepository.save(news));
    }

    @GetMapping
    public List<News> getNews(@RequestParam(required = false) String category, 
                               @RequestParam(defaultValue = "Approved") String status) {
        if (category != null && !category.equals("All")) {
            return newsRepository.findByCategoryAndStatusOrderByCreatedAtDesc(category, status);
        }
        return newsRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    @GetMapping("/trending")
    public List<News> getTrending() {
        return newsRepository.findTop5ByStatusOrderByViewsDesc("Approved");
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approveNews(@PathVariable Long id) {
        News news = newsRepository.findById(id).orElse(null);
        if (news == null) return ResponseEntity.notFound().build();
        news.setStatus("Approved");
        return ResponseEntity.ok(newsRepository.save(news));
    }
}
