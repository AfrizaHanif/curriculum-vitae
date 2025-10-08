import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { JumbotronComponent } from '../../../shared/components/jumbotron/jumbotron';
import { BlogService } from '../../../core/services/data/blog';
import { DescriptionService } from '../../../core/services/description';
import { PaginationComponent } from '../../../shared/components/pagination/pagination';
import { BlogListCardComponent } from './components/blog-list-card/blog-list-card';
import { CardComponent } from "../../../shared/components/card/card";

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink, JumbotronComponent, PaginationComponent, BlogListCardComponent, CardComponent],
  templateUrl: './blog-list.html',
  styleUrls: ['./blog-list.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  // Inject Services
  blogService = inject(BlogService);
  private descriptionService = inject(DescriptionService);

  // Get data signals from the service
  posts = this.blogService.paginatedPosts;
  pagination = this.blogService.pagination;
  featuredPost = this.blogService.featuredPost;
  allTags = this.blogService.allTags;
  jumbotronSubtitle = this.descriptionService.blogJumbotronSubtitle;

  // --- Reactive properties for filters ---
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Subscribe to search input changes with debouncing
    this.searchSubject.pipe(
      debounceTime(300), // Add a 300ms delay to avoid excessive filtering
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.blogService.setSearchTerm(searchTerm); // Update the search term in the service
    });
  }

  // Clean up subscriptions on component destroy
  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to complete all subscriptions
    this.destroy$.complete(); // Complete the subject
  }

  // Event handlers for user interactions
  onPageChange(page: number): void {
    this.blogService.goToPage(page);
  }

  // Handle search input changes
  onSearchChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  // Handle tag selection changes
  onTagChange(event: Event): void {
    const selectedTag = (event.target as HTMLSelectElement).value;
    this.blogService.setSelectedTag(selectedTag);
  }

  // Reset filters to default state
  resetFilters(): void {
    this.blogService.resetFilters();
  }
}
