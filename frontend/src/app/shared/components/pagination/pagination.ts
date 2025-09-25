import { Component, input, output, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PaginationData {
  current_page: number;
  last_page: number;
}

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrls: ['./pagination.css']
})
export class PaginationComponent {
  paginationData = input.required<PaginationData>();
  pageChange = output<number>();

  // A computed signal that generates an array of page numbers like [1, '...', 5, 6, 7, '...', 12].
  // It will include ellipsis ('...') if there are too many pages.
  pages = computed<(number | string)[]>(() => {
    const { last_page: totalPages, current_page: currentPage } = this.paginationData();
    const siblingCount = 1; // How many pages to show on each side of the current page
    const boundaryCount = 1; // How many pages to show at the start and end

    // Core pages: current page + siblings on each side
    const corePageCount = 2 * siblingCount + 1;
    // Boundary pages: start and end pages
    const boundaryPageCount = 2 * boundaryCount;
    // Ellipsis placeholders
    const ellipsisCount = 2;

    const totalPageNumbersToShow = corePageCount + boundaryPageCount + ellipsisCount;

    // If there are not enough pages to require truncation, show all pages.
    if (totalPages <= totalPageNumbersToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
    const endPages = Array.from({ length: boundaryCount }, (_, i) => totalPages - boundaryCount + 1 + i);

    const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount);

    const showLeftEllipsis = leftSiblingIndex > boundaryCount + 1;
    const showRightEllipsis = rightSiblingIndex < totalPages - boundaryCount;

    if (!showLeftEllipsis && showRightEllipsis) {
      const end = boundaryCount + corePageCount;
      const centerPages = Array.from({ length: end - boundaryCount }, (_, i) => i + boundaryCount + 1);
      return [...startPages, ...centerPages, '...', ...endPages];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const start = totalPages - boundaryCount - corePageCount + 1;
      const centerPages = Array.from({ length: totalPages - boundaryCount - start }, (_, i) => i + start);
      return [...startPages, '...', ...centerPages, ...endPages];
    }

    // Both ellipses are shown
    const centerPages = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => i + leftSiblingIndex);
    return [...startPages, '...', ...centerPages, '...', ...endPages];
  });

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.paginationData().last_page) {
      this.pageChange.emit(page);
    }
  }
}
