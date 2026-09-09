package com.example.scalablereadapi.dto;

import java.time.Instant;
import java.util.List;
import jakarta.validation.constraints.*;
import org.springframework.data.domain.Page;

public final class ApiDtos {
    private ApiDtos() { }
    public record PostRequest(@NotBlank @Size(min = 3, max = 100) String title, @NotBlank @Size(min = 5, max = 2000) String content, @NotNull Long categoryId) { }
    public record PostResponse(Long id, String title, String content, String category, Instant createdAt, long viewCount) { }
    public record CategoryStatsResponse(String category, long postCount) { }
    public record PageResponse<T>(List<T> content, int page, int size, long totalElements, int totalPages, boolean first, boolean last, String sort) {
        public static <T> PageResponse<T> from(Page<T> value) { return new PageResponse<>(value.getContent(), value.getNumber(), value.getSize(), value.getTotalElements(), value.getTotalPages(), value.isFirst(), value.isLast(), value.getSort().toString()); }
    }
}
