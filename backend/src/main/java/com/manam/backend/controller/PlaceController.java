package com.manam.backend.controller;

import com.manam.backend.model.Place;
import com.manam.backend.model.Review;
import com.manam.backend.repository.PlaceRepository;
import com.manam.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
public class PlaceController {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping
    public ResponseEntity<Place> createPlace(@RequestBody Place place) {
        return ResponseEntity.ok(placeRepository.save(place));
    }

    @GetMapping
    public List<Place> getPlaces(@RequestParam(required = false) String category) {
        if (category != null && !category.equals("All")) {
            return placeRepository.findByCategory(category);
        }
        return placeRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Place> getPlaceById(@PathVariable Long id) {
        return placeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/review")
    public ResponseEntity<Review> addReview(@PathVariable Long id, @RequestBody Review review) {
        Place place = placeRepository.findById(id).orElse(null);
        if (place == null) return ResponseEntity.notFound().build();
        
        review.setPlace(place);
        Review savedReview = reviewRepository.save(review);
        
        // Update average rating
        List<Review> reviews = reviewRepository.findByPlaceId(id);
        double avg = reviews.stream().mapToInt(Review::getRating).average().orElse(0.0);
        place.setRating(avg);
        placeRepository.save(place);
        
        return ResponseEntity.ok(savedReview);
    }
}
