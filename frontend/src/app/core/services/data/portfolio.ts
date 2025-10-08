import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BaseDataService } from './base-data';
import { PaginatedPortfolioResponse, PortfolioData } from '../../models/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService extends BaseDataService<PortfolioData> {
  // Private signal for pagination info
  private readonly _pagination = signal({ current_page: 1, last_page: 1, per_page: 10, total: 0 });

  // Public readonly signals for components to consume portfolio data and pagination info.
  public readonly portfolios = this.data;
  public readonly pagination = this._pagination.asReadonly();

  constructor() {
    // The endpoint 'portfolios' and the ID key 'id_portfolio' are passed to the base service.
    super('portfolios', 'id_portfolio');
  }

  // Simulated paginated fetch since we are using static JSON files.
  fetchPortfolios(options: { page?: number, per_page?: number } = {}): Observable<PaginatedPortfolioResponse> {
    // With static JSON, we perform pagination on the client side.
    // Ensure data is loaded first.
    return this.dataLoaded().pipe(
      map(() => {
        const allItems = this.portfolios();
        const page = options.page ?? 1;
        const perPage = options.per_page ?? 10;
        const total = allItems.length;
        const last_page = Math.ceil(total / perPage);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const data = allItems.slice(start, end);

        // Create the paginated response structure.
        const paginatedResponse: PaginatedPortfolioResponse = {
          current_page: page,
          data: data,
          last_page: last_page,
          per_page: perPage,
          total: total,
        };

        // Update the pagination signal.
        const { data: responseData, ...paginationInfo } = paginatedResponse;
        this._pagination.set(paginationInfo);

        return paginatedResponse;
      })
    );
  }

  // Client-side filtering, sorting, and pagination signals
  public getPortfolioItemById(id: string): PortfolioData | undefined {
    return this.portfolios().find(item => item.id_portfolio === id);
  }

  public getPortfolioItemBySlug(slug: string): PortfolioData | undefined {
    return this.portfolios().find(item => item.slug_portfolio === slug);
  }
}
