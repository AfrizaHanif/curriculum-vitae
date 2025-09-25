import { Component, computed, inject, signal, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from '../../shared/components/jumbotron/jumbotron';
import { CardComponent } from '../../shared/components/card/card';
import { PortfolioCardComponent } from './components/portfolio-card/portfolio-card';
import { PortfolioService } from '../../core/services/portfolio';
import { PaginationComponent, PaginationData } from '../../shared/components/pagination/pagination';
import { PortfolioData } from '../../core/models/portfolio';
import { DescriptionService } from '../../core/services/description';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    JumbotronComponent,
    CardComponent,
    PortfolioCardComponent,
    PaginationComponent,
  ],
  templateUrl: './portfolio.html',
  styleUrls: ['./portfolio.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent implements OnInit, OnDestroy {
  // Inject Services
  private portfolioService = inject(PortfolioService);
  private descriptionService = inject(DescriptionService);

  jumbotronSubtitle = this.descriptionService.portfolioJumbotronSubtitle; // Jumbotron subtitle

  // Signals for portfolio data and categories
  private allPortfolios = this.portfolioService.portfolios;
  categories = computed(() => {
    const items = this.allPortfolios();
    const uniqueCategories = [...new Set(items.map(item => item.category_portfolio))];
    return ['Semua', ...uniqueCategories];
  });

  // Signal to track the active category
  activeCategory = signal('Semua');

  // --- Search and Sort State ---
  searchTerm = signal('');
  sortOption = signal('date-desc'); // Default sort option
  sortOptions = [
    { value: 'date-desc', label: 'Terbaru' },
    { value: 'date-asc', label: 'Terlama' },
    { value: 'title-asc', label: 'Judul (A-Z)' },
    { value: 'title-desc', label: 'Judul (Z-A)' },
  ];

  // --- New properties for debouncing ---
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  // --- Pagination State ---
  currentPage = signal(1);
  itemsPerPage = signal(6); // Default items per page
  itemsPerPageOptions = [6, 9, 12];

  // 1. A computed signal that holds the full list of items for the currently selected category.
  private categoryFilteredPortfolios = computed<PortfolioData[]>(() => {
    const category = this.activeCategory();
    if (category === 'Semua') {
      return this.allPortfolios();
    }
    return this.allPortfolios().filter(item => item.category_portfolio === category);
  });

  // 2. A computed signal that filters and sorts the items from the active category.
  private processedPortfolios = computed<PortfolioData[]>(() => {
    const categoryFiltered = this.categoryFilteredPortfolios();
    const search = this.searchTerm().toLowerCase();
    const sort = this.sortOption();

    // Filter by search term
    const searched = !search
      ? categoryFiltered
      : categoryFiltered.filter(item =>
          item.title_portfolio.toLowerCase().includes(search) ||
          item.subcategory_portfolio.toLowerCase().includes(search) ||
          item.tags_portfolio?.some(tag => tag.toLowerCase().includes(search))
        );

    // Sort the results
    return [...searched].sort((a, b) => {
      switch (sort) {
        case 'date-asc':
          return new Date(a.f_period_portfolio).getTime() - new Date(b.f_period_portfolio).getTime();
        case 'date-desc':
          return new Date(b.f_period_portfolio).getTime() - new Date(a.f_period_portfolio).getTime();
        case 'title-asc':
          return a.title_portfolio.localeCompare(b.title_portfolio);
        case 'title-desc':
          return b.title_portfolio.localeCompare(a.title_portfolio);
        default:
          return 0;
      }
    });
  });

  // --- Pagination Info Signals (derived from processed portfolios) ---
  totalItems = computed(() => this.processedPortfolios().length);

  // Calculate start and end item indices for display
  startItemIndex = computed(() => {
    if (this.totalItems() === 0) {
      return 0;
    }
    return (this.currentPage() - 1) * this.itemsPerPage() + 1;
  });

  // Calculate end item index, ensuring it does not exceed total items
  endItemIndex = computed(() => {
    return Math.min(this.currentPage() * this.itemsPerPage(), this.totalItems());
  });

  // Calculate total pages based on total items and items per page
  totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  });

  // Data for the pagination component
  paginationData = computed<PaginationData>(() => {
    return {
      current_page: this.currentPage(),
      last_page: this.totalPages()
    };
  });

  // 3. The final computed signal that slices the processed list for the current page.
  filteredPortfolios = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.processedPortfolios().slice(start, end);
  });

  /**
   * Sets the active category for filtering and resets pagination to the first page.
   * @param category The category to set as active.
   * @param event The mouse event to prevent default anchor behavior.
   */
  setActiveCategory(category: string, event: MouseEvent): void {
    event.preventDefault();
    this.activeCategory.set(category);
    this.currentPage.set(1); // Reset to first page when category changes
  }

  // Lifecycle hooks for setting up and tearing down the debounced search
  ngOnInit(): void {
    // Subscribe to search input changes with debouncing
    this.searchSubject.pipe(
      debounceTime(300), // Wait for 300ms of silence before emitting the last value
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.searchTerm.set(value);
      this.currentPage.set(1); // Reset to first page on new search
    });
  }

  // Clean up subscriptions on component destroy
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Pushes the search term to the search subject on user input.
   * The actual search term signal is updated reactively via the debounced subscription.
   * @param event The input event from the search field.
   */
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }


  /**
   * Updates the sort option signal when the user selects a new sort order.
   * @param event The change event from the sort dropdown.
   */
  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.sortOption.set(value);
    this.currentPage.set(1); // Reset to first page on sort change
  }

  /**
   * Updates the number of items to display per page.
   * @param event The change event from the items per page selector.
   */
  onItemsPerPageChange(event: Event): void {
    const value = +(event.target as HTMLSelectElement).value;
    this.itemsPerPage.set(value);
    this.currentPage.set(1); // Reset to first page
  }

  /**
   * Navigates to a specific page when the pagination component emits a change.
   * @param page The page number to go to.
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
  }
}
