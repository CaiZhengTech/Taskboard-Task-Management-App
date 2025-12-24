import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useTaskStore } from '@/stores/taskStore';
import { Priority, PRIORITY_LABELS } from '@/types/task';

export function BoardFilters() {
  const {
    searchQuery,
    filterPriority,
    filterAssignee,
    filterDueDate,
    users,
    setSearchQuery,
    setFilterPriority,
    setFilterAssignee,
    setFilterDueDate,
  } = useTaskStore();

  const hasActiveFilters = filterPriority !== 'all' || filterAssignee !== 'all' || filterDueDate !== 'all';
  const activeFilterCount = [filterPriority !== 'all', filterAssignee !== 'all', filterDueDate !== 'all'].filter(Boolean).length;

  const clearFilters = () => {
    setFilterPriority('all');
    setFilterAssignee('all');
    setFilterDueDate('all');
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filter Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-4" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Priority
              </label>
              <Select 
                value={filterPriority} 
                onValueChange={(v) => setFilterPriority(v as Priority | 'all')}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All priorities</SelectItem>
                  {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Assignee
              </label>
              <Select 
                value={filterAssignee} 
                onValueChange={setFilterAssignee}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All assignees</SelectItem>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Due date
              </label>
              <Select 
                value={filterDueDate} 
                onValueChange={(v) => setFilterDueDate(v as 'all' | 'overdue' | 'this_week')}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All dates</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="this_week">Due this week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={clearFilters}
              >
                <X className="h-3 w-3 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1">
          {filterPriority !== 'all' && (
            <Badge variant="secondary" className="gap-1 pr-1">
              {PRIORITY_LABELS[filterPriority]}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => setFilterPriority('all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filterAssignee !== 'all' && (
            <Badge variant="secondary" className="gap-1 pr-1">
              {users.find(u => u.id === filterAssignee)?.name}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => setFilterAssignee('all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filterDueDate !== 'all' && (
            <Badge variant="secondary" className="gap-1 pr-1">
              {filterDueDate === 'overdue' ? 'Overdue' : 'This week'}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => setFilterDueDate('all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
