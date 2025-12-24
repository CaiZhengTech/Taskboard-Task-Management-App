import { Task } from '@/types/task';
import { Draggable } from '@hello-pangea/dnd';
import { PriorityBadge } from './TaskBadges';
import { UserAvatar } from './UserAvatar';
import { Calendar, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, isPast, isToday } from 'date-fns';
import { useTaskStore } from '@/stores/taskStore';

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  const setSelectedTaskId = useTaskStore(state => state.setSelectedTaskId);

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate)) && task.status !== 'completed';
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            'group bg-card border border-border rounded-md p-3 cursor-pointer',
            'transition-all duration-150',
            'hover:border-primary/30 hover:shadow-md',
            snapshot.isDragging && 'shadow-lg border-primary/50 rotate-[2deg]',
          )}
          onClick={() => setSelectedTaskId(task.id)}
        >
          <div className="flex items-start gap-2">
            <div
              {...provided.dragHandleProps}
              className="mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                {task.title}
              </h3>
              
              {task.description && (
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {task.description}
                </p>
              )}
              
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <PriorityBadge priority={task.priority} />
                
                {task.dueDate && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded',
                      isOverdue && 'text-destructive bg-destructive/10',
                      isDueToday && 'text-priority-medium bg-priority-medium/10',
                      !isOverdue && !isDueToday && 'text-muted-foreground bg-muted'
                    )}
                  >
                    <Calendar className="h-3 w-3" />
                    {format(new Date(task.dueDate), 'MMM d')}
                  </span>
                )}
              </div>
            </div>
            
            {task.assignee && (
              <UserAvatar user={task.assignee} size="sm" />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
