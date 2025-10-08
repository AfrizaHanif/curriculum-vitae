import { Injectable, signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { BlogData } from '../../models/blog';
import { BaseDataService } from './base-data';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends BaseDataService<BlogData> {
  // Source of truth for all posts
  public readonly posts = this.data;
  // State for featured post
  private readonly _featuredPost = signal<BlogData | null>(null);
  // State for filtering
  private readonly _searchTerm = signal<string>('');
  private readonly _selectedTag = signal<string>('');
  // --- Pagination State ---
  private readonly _currentPage = signal(1);
  private readonly _itemsPerPage = 5; // Or make it a signal if it needs to be dynamic

  public readonly featuredPost = this._featuredPost.asReadonly();
  public readonly searchTerm = this._searchTerm.asReadonly();
  public readonly selectedTag = this._selectedTag.asReadonly();

  // --- Computed Signals for Pagination ---
  // The paginated list is now a computed signal that reacts to changes in filters or page.
  public readonly paginatedPosts = computed(() => {
    const allItems = this._filteredPosts();
    const start = (this._currentPage() - 1) * this._itemsPerPage;
    const end = start + this._itemsPerPage;
    return allItems.slice(start, end);
  });

  // The pagination metadata is also a computed signal.
  public readonly pagination = computed(() => {
    const total = this._filteredPosts().length;
    const last_page = Math.ceil(total / this._itemsPerPage);
    return {
      current_page: this._currentPage(), last_page, per_page: this._itemsPerPage, total
    };
  });

  // A computed signal that filters posts based on search term and selected tag.
  private readonly _filteredPosts = computed(() => {
    const term = this._searchTerm().toLowerCase();
    const tag = this._selectedTag();
    return this.posts().filter(post => {
      const matchesTag = !tag || (post.tags_blog && post.tags_blog.includes(tag));
      const matchesTerm = !term ||
        post.title_blog.toLowerCase().includes(term) ||
        post.summary_blog.toLowerCase().includes(term);
      return matchesTag && matchesTerm;
    });
  });

  public readonly allTags = computed(() => Array.from(new Set(this.posts().flatMap(p => p.tags_blog || []))).sort());

  constructor() {
    super('blogs', 'id_blog');
  }

  /**
   * Overrides the base dataLoaded to add custom sorting and featured post logic.
   */
  override dataLoaded(): Observable<boolean> {
    return super.dataLoaded().pipe(
      tap(loaded => {
        if (loaded && this.posts().length > 0) {
          this._data.update(posts => [...posts].sort((a, b) => new Date(b.pub_date_blog).getTime() - new Date(a.pub_date_blog).getTime()));
          this._featuredPost.set(this.posts().find(p => p.is_featured) || null);
          this.goToPage(1); // Reset to the first page when data loads
        }
      })
    );
  }

  /**
   * Updates the search term and triggers repagination.
   * @param term The search term.
   */
  public setSearchTerm(term: string): void {
    this._searchTerm.set(term);
    this.goToPage(1); // Go to first page on new search
  }

  /**
   * Updates the selected tag and triggers repagination.
   * @param tag The tag to filter by.
   */
  public setSelectedTag(tag: string): void {
    this._selectedTag.set(tag);
    this.goToPage(1); // Go to first page on new tag filter
  }

  /**
   * Resets the search term and selected tag to their default values and repaginates.
   */
  public resetFilters(): void {
    this._searchTerm.set('');
    this._selectedTag.set('');
    this.goToPage(1); // Go to first page when filters are reset
  }

  /**
   * Sets the current page for pagination.
   * @param page The page number to retrieve.
   */
  public goToPage(page: number): void {
    this._currentPage.set(page);
  }

  getPostById(id_blog: string): BlogData | undefined {
    return this.posts().find(post => post.id_blog === id_blog);
  }

  getPostBySlug(slug: string): BlogData | undefined {
    return this.posts().find(post => post.slug_blog === slug);
  }

  /**
   * Finds posts related to a given post, based on shared tags_blog.
   * @param currentPostId The ID of the post to find related content for.
   * @param maxCount The maximum number of related posts to return.
   * @returns An array of related blog posts.
   */
  getRelatedPosts(currentPostId: string, maxCount: number = 3): BlogData[] {
    const allPosts = this.posts();
    const currentPost = this.getPostById(currentPostId);

    if (!currentPost || !currentPost.tags_blog || currentPost.tags_blog.length === 0) {
      return [];
    }

    const currentPostTags = new Set(currentPost.tags_blog);

    return allPosts
      .filter(post => post.id_blog !== currentPostId) // Exclude the current post
      .map(post => {
        const sharedTagsCount = post.tags_blog?.filter(tag => currentPostTags.has(tag)).length || 0;
        return { post, score: sharedTagsCount };
      })
      .filter(item => item.score > 0) // Only include posts with at least one shared tag
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, maxCount) // Take the top N posts
      .map(item => item.post); // Return just the post data
  }
}
