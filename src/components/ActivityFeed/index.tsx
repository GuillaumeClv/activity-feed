import { useState } from "react";
import { useFilters } from "../../context";
import activitiesData from "../../data.json";
import {
  useFilterChange,
  useFilteredAndSortedActivities,
  usePagination,
} from "./utils";
import {
  StatusFilterComponent,
  DateFilterComponent,
  TypeFilter,
  SearchInput,
  ActiveFilters,
  ActivityCard,
  Pagination,
} from "..";

export const ActivityFeed = () => {
  const { filters } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);
  useFilterChange(filters, () => setCurrentPage(1));

  const filteredActivities = useFilteredAndSortedActivities(
    activitiesData,
    filters
  );
  const { totalPages, paginatedItems } = usePagination(
    filteredActivities,
    currentPage
  );

  return (
    <main>
      <header>
        <h1>Hostname</h1>
        <p>Console / Projects / Websites / Configuration / Activity Feed</p>
      </header>

      <section className="filters-section">
        <div className="filters-row">
          <StatusFilterComponent />
          <DateFilterComponent />
          <TypeFilter />
        </div>

        <SearchInput />
        <ActiveFilters />
      </section>

      <aside className="number-events">
        Showing {paginatedItems.length} of {filteredActivities.length} events
      </aside>

      <section className="card-list">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="no-results">
            <p>No activities found matching your filters.</p>
          </div>
        )}
      </section>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  );
};
