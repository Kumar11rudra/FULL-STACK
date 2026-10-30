package com.example.kafkareliability.service;

import com.example.kafkareliability.entity.ProcessedPost;
import com.example.kafkareliability.model.FailureMode;
import com.example.kafkareliability.model.PostEvent;
import com.example.kafkareliability.repository.ProcessedPostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PostProcessingServiceTest {
    @Mock
    private ProcessedPostRepository repository;
    private PostProcessingService service;

    @BeforeEach
    void setUp() {
        service = new PostProcessingService(repository);
    }

    @Test
    void normalEventProcessesOnce() {
        PostEvent event = new PostEvent("normal-1", "Hello", FailureMode.NONE);
        assertDoesNotThrow(() -> service.process(event));
        verify(repository, times(1)).saveAndFlush(any(ProcessedPost.class));
    }

    @Test
    void duplicateEventIsSkipped() {
        when(repository.existsById("duplicate-1")).thenReturn(true);
        PostEvent event = new PostEvent("duplicate-1", "Hello again", FailureMode.NONE);
        assertDoesNotThrow(() -> service.process(event));
        verify(repository, never()).saveAndFlush(any(ProcessedPost.class));
    }

    @Test
    void transientEventRecoversAfterTwoFailures() {
        PostEvent event = new PostEvent("transient-1", "Retry me", FailureMode.TRANSIENT);
        assertThrows(IllegalStateException.class, () -> service.process(event));
        assertThrows(IllegalStateException.class, () -> service.process(event));
        assertDoesNotThrow(() -> service.process(event));
        verify(repository, times(1)).saveAndFlush(any(ProcessedPost.class));
    }

    @Test
    void permanentEventAlwaysFailsAndIsNotSaved() {
        PostEvent event = new PostEvent("permanent-1", "DLQ me", FailureMode.PERMANENT);
        for (int i = 0; i < 4; i++) {
            assertThrows(IllegalStateException.class, () -> service.process(event));
        }
        verify(repository, never()).saveAndFlush(any(ProcessedPost.class));
    }
}
