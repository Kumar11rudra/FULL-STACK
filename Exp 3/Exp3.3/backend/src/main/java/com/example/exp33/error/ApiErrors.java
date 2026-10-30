package com.example.exp33.error;
import java.util.Map;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
@RestControllerAdvice
public class ApiErrors {
 @ExceptionHandler(ResponseStatusException.class)
 public ResponseEntity<Map<String,String>> handleStatus(ResponseStatusException ex){
  return ResponseEntity.status(ex.getStatusCode()).body(Map.of("error",ex.getReason()==null?"Request failed":ex.getReason()));
 }
 @ExceptionHandler(MethodArgumentNotValidException.class)
 public ResponseEntity<Map<String,String>> handleValidation(MethodArgumentNotValidException ex){
  return ResponseEntity.badRequest().body(Map.of("error","Invalid input: "+ex.getBindingResult().getFieldErrors().stream()
    .map(f->f.getField()+" "+f.getDefaultMessage()).findFirst().orElse("invalid")));
 }
}
