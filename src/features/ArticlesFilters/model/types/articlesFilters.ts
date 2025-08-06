export interface ArticlesFiltersSchema {
    search?: string;
    sort?: 'asc_date' | 'desc_date' | 'most_popular';
    categories?: any[];
    tags?: any[];
    currentFilters: any | undefined;
    __filters_ready: boolean;
}
