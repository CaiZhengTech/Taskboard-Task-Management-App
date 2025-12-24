import { Priority, Status } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-[10px] font-medium px-1.5 py-0 h-5 border',
        priority === 'high' && 'border-priority-high/30 text-priority-high bg-priority-high/10',
        priority === 'medium' && 'border-priority-medium/30 text-priority-medium bg-priority-medium/10',
        priority === 'low' && 'border-priority-low/30 text-priority-low bg-priority-low/10',
        className
      )}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const labels: Record<Status, string> = {
    backlog: 'Backlog',
    ready: 'Ready',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        'text-[10px] font-medium px-1.5 py-0 h-5',
        status === 'backlog' && 'bg-status-backlog/10 text-status-backlog',
        status === 'ready' && 'bg-status-ready/10 text-status-ready',
        status === 'in_progress' && 'bg-status-in-progress/10 text-status-in-progress',
        status === 'completed' && 'bg-status-completed/10 text-status-completed',
        className
      )}
    >
      {labels[status]}
    </Badge>
  );
}
