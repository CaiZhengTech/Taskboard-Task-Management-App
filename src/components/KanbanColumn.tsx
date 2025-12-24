import { Status, COLUMNS } from '@/types/task';
import { Droppable } from '@hello-pangea/dnd';
import { TaskCard } from './TaskCard';
import { useTaskStore } from '@/stores/taskStore';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  status: Status;
  onAddTask: (status: Status) => void;
}

export function KanbanColumn({ status, onAddTask }: KanbanColumnProps) {
  const getTasksByStatus = useTaskStore(state => state.getTasksByStatus);
  const tasks = getTasksByStatus(status);
  const columnConfig = COLUMNS.find(c => c.id === status)!;

  const statusColorClasses: Record<Status, string> = {
    backlog: 'bg-status-backlog',
    ready: 'bg-status-ready',
    in_progress: 'bg-status-in-progress',
    completed: 'bg-status-completed',
  };

  return (
    <div className="flex flex-col h-full min-w-[280px] w-[280px] lg:w-[300px] flex-shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between px-2 py-2 mb-2">
        <div className="flex items-center gap-2">
          <span className={cn('w-2 h-2 rounded-full', statusColorClasses[status])} />
          <h2 className="text-sm font-semibold text-foreground">{columnConfig.title}</h2>
          <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={() => onAddTask(status)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              'flex-1 rounded-lg p-2 space-y-2 overflow-y-auto scrollbar-thin',
              'bg-column transition-colors duration-200',
              snapshot.isDraggingOver && 'bg-primary/5 ring-2 ring-primary/20 ring-inset'
            )}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <p className="text-xs">No tasks in {columnConfig.title}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-xs h-7"
                  onClick={() => onAddTask(status)}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add task
                </Button>
              </div>
            )}
            
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
