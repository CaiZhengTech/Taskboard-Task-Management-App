import { useState, useCallback } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { KanbanColumn } from './KanbanColumn';
import { CreateTaskModal } from './CreateTaskModal';
import { TaskDetailPanel } from './TaskDetailPanel';
import { BoardFilters } from './BoardFilters';
import { useTaskStore } from '@/stores/taskStore';
import { COLUMNS, Status } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Plus, LayoutGrid } from 'lucide-react';
import { toast } from 'sonner';

export function KanbanBoard() {
  const moveTask = useTaskStore(state => state.moveTask);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalStatus, setCreateModalStatus] = useState<Status>('backlog');

  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a droppable
    if (!destination) return;

    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as Status;
    moveTask(draggableId, newStatus, destination.index);
    
    if (destination.droppableId !== source.droppableId) {
      const statusLabels: Record<Status, string> = {
        backlog: 'Backlog',
        ready: 'Ready',
        in_progress: 'In Progress',
        completed: 'Completed',
      };
      toast.success(`Task moved to ${statusLabels[newStatus]}`);
    }
  }, [moveTask]);

  const handleAddTask = (status: Status) => {
    setCreateModalStatus(status);
    setCreateModalOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-5 w-5 text-primary" />
                <h1 className="text-lg font-semibold text-foreground">TaskBoard</h1>
              </div>
              <span className="hidden sm:inline-block text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                Demo Project
              </span>
            </div>
            <Button size="sm" onClick={() => handleAddTask('backlog')} className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New task</span>
            </Button>
          </div>
          <BoardFilters />
        </div>
      </header>

      {/* Board */}
      <main className="flex-1 overflow-hidden">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="h-full overflow-x-auto scrollbar-thin">
            <div className="flex gap-4 p-4 lg:p-6 h-full min-w-max">
              {COLUMNS.map(column => (
                <KanbanColumn
                  key={column.id}
                  status={column.id}
                  onAddTask={handleAddTask}
                />
              ))}
            </div>
          </div>
        </DragDropContext>
      </main>

      {/* Modals & Panels */}
      <CreateTaskModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        initialStatus={createModalStatus}
      />
      <TaskDetailPanel />
    </div>
  );
}
