import { useAppDispatch, useAppSelector } from './useRedux';
import { setSearchTerm, setSortBy, resetSorting } from 'app/taskList/service/reducers/filtersSlice';

export const useSorting = () => {
  const dispatch = useAppDispatch();
  const sorting = useAppSelector((state) => state.sorting);

  return {
    sorting,
    setSearchTerm: (term: string) => dispatch(setSearchTerm(term)),
    setSortBy: (sortBy: 'isCompleted' | 'isImport' | '') => dispatch(setSortBy(sortBy)),
    resetSorting: () => dispatch(resetSorting()),
  };
};
