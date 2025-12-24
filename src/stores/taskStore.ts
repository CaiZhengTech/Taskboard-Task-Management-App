import { create } from 'zustand';
import { Task, Status, Priority, User } from '@/types/task';

// Demo users
const demoUsers: User[] = [
  { id: '1', name: 'Alex Chen', email: 'alex@example.com', avatar: '' },
  { id: '2', name: 'Jordan Lee', email: 'jordan@example.com', avatar: '' },
  { id: '3', name: 'Sam Wilson', email: 'sam@example.com', avatar: '' },
];

// Demo tasks
const demoTasks: Task[] = [
  {
    id: '1',
    title: 'Set up project repository',
    description: 'Initialize the GitHub repository with proper folder structure and documentation.',
    status: 'completed',
    priority: 'high',
    assignee: demoUsers[0],
    dueDate: '2024-12-20',
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-18T14:30:00Z',
    orderIndex: 0,
    projectId: '1',
  },
  {
    id: '2',
    title: 'Design system implementation',
    description: 'Create color tokens, typography scale, and component variants following GitHub Projects aesthetic.',
    status: 'completed',
    priority: 'high',
    assignee: demoUsers[1],
    dueDate: '2024-12-22',
    createdAt: '2024-12-16T09:00:00Z',
    updatedAt: '2024-12-21T16:00:00Z',
    orderIndex: 1,
    projectId: '1',
  },
  {
    id: '3',
    title: 'Implement drag and drop',
    description: 'Add smooth drag and drop functionality between columns using @hello-pangea/dnd library.',
    status: 'in_progress',
    priority: 'high',
    assignee: demoUsers[0],
    dueDate: '2024-12-25',
    createdAt: '2024-12-18T11:00:00Z',
    updatedAt: '2024-12-24T09:00:00Z',
    orderIndex: 0,
    projectId: '1',
  },
  {
    id: '4',
    title: 'Task detail panel',
    description: 'Create a slide-out panel for viewing and editing task details with markdown support.',
    status: 'in_progress',
    priority: 'medium',
    assignee: demoUsers[1],
    dueDate: '2024-12-26',
    createdAt: '2024-12-19T14:00:00Z',
    updatedAt: '2024-12-24T10:00:00Z',
    orderIndex: 1,
    projectId: '1',
  },
  {
    id: '5',
    title: 'Add filtering and search',
    description: 'Implement search by title/description and filters for status, priority, assignee, and due date.',
    status: 'ready',
    priority: 'medium',
    assignee: demoUsers[2],
    dueDate: '2024-12-27',
    createdAt: '2024-12-20T10:00:00Z',
    updatedAt: '2024-12-20T10:00:00Z',
    orderIndex: 0,
    projectId: '1',
  },
  {
    id: '6',
    title: 'Authentication flow',
    description: 'Implement login/register pages with JWT-based authentication.',
    status: 'ready',
    priority: 'high',
    assignee: demoUsers[0],
    dueDate: '2024-12-28',
    createdAt: '2024-12-21T09:00:00Z',
    updatedAt: '2024-12-21T09:00:00Z',
    orderIndex: 1,
    projectId: '1',
  },
  {
    id: '7',
    title: 'Mobile responsive layout',
    description: 'Ensure columns are horizontally scrollable on mobile devices.',
    status: 'backlog',
    priority: 'medium',
    dueDate: '2024-12-30',
    createdAt: '2024-12-22T11:00:00Z',
    updatedAt: '2024-12-22T11:00:00Z',
    orderIndex: 0,
    projectId: '1',
  },
  {
    id: '8',
    title: 'Keyboard navigation',
    description: 'Add keyboard shortcuts for common actions like creating tasks, navigating between columns.',
    status: 'backlog',
    priority: 'low',
    createdAt: '2024-12-22T12:00:00Z',
    updatedAt: '2024-12-22T12:00:00Z',
    orderIndex: 1,
    projectId: '1',
  },
  {
    id: '9',
    title: 'Dark mode support',
    description: 'Implement theme toggle with proper dark mode colors.',
    status: 'backlog',
    priority: 'low',
    assignee: demoUsers[2],
    createdAt: '2024-12-22T13:00:00Z',
    updatedAt: '2024-12-22T13:00:00Z',
    orderIndex: 2,
    projectId: '1',
  },
];

interface TaskState {
  tasks: Task[];
  users: User[];
  selectedTaskId: string | null;
  searchQuery: string;
  filterPriority: Priority | 'all';
  filterAssignee: string | 'all';
  filterDueDate: 'all' | 'overdue' | 'this_week';
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'orderIndex'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Status, newIndex: number) => void;
  reorderTask: (taskId: string, newIndex: number) => void;
  setSelectedTaskId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterPriority: (priority: Priority | 'all') => void;
  setFilterAssignee: (assigneeId: string | 'all') => void;
  setFilterDueDate: (filter: 'all' | 'overdue' | 'this_week') => void;
  getFilteredTasks: () => Task[];
  getTasksByStatus: (status: Status) => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: demoTasks,
  users: demoUsers,
  selectedTaskId: null,
  searchQuery: '',
  filterPriority: 'all',
  filterAssignee: 'all',
  filterDueDate: 'all',

  addTask: (taskData) => {
    const tasks = get().tasks;
    const tasksInColumn = tasks.filter(t => t.status === taskData.status);
    const maxOrderIndex = tasksInColumn.length > 0 
      ? Math.max(...tasksInColumn.map(t => t.orderIndex)) 
      : -1;
    
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      orderIndex: maxOrderIndex + 1,
    };
    
    set({ tasks: [...tasks, newTask] });
  },

  updateTask: (id, updates) => {
    set({
      tasks: get().tasks.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      ),
    });
  },

  deleteTask: (id) => {
    set({ 
      tasks: get().tasks.filter(task => task.id !== id),
      selectedTaskId: get().selectedTaskId === id ? null : get().selectedTaskId,
    });
  },

  moveTask: (taskId, newStatus, newIndex) => {
    const tasks = get().tasks;
    const taskToMove = tasks.find(t => t.id === taskId);
    if (!taskToMove) return;

    const oldStatus = taskToMove.status;
    
    // Update the moved task
    let updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus, orderIndex: newIndex, updatedAt: new Date().toISOString() };
      }
      return task;
    });

    // Reorder tasks in the destination column
    const destColumnTasks = updatedTasks
      .filter(t => t.status === newStatus && t.id !== taskId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
    
    destColumnTasks.splice(newIndex, 0, { ...taskToMove, status: newStatus, orderIndex: newIndex });
    
    // Update order indices
    updatedTasks = updatedTasks.map(task => {
      if (task.status === newStatus) {
        const idx = destColumnTasks.findIndex(t => t.id === task.id);
        if (idx !== -1) {
          return { ...task, orderIndex: idx };
        }
      }
      return task;
    });

    // Reorder source column if different
    if (oldStatus !== newStatus) {
      const sourceColumnTasks = updatedTasks
        .filter(t => t.status === oldStatus)
        .sort((a, b) => a.orderIndex - b.orderIndex);
      
      updatedTasks = updatedTasks.map(task => {
        if (task.status === oldStatus) {
          const idx = sourceColumnTasks.findIndex(t => t.id === task.id);
          if (idx !== -1) {
            return { ...task, orderIndex: idx };
          }
        }
        return task;
      });
    }

    set({ tasks: updatedTasks });
  },

  reorderTask: (taskId, newIndex) => {
    const tasks = get().tasks;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    get().moveTask(taskId, task.status, newIndex);
  },

  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterPriority: (priority) => set({ filterPriority: priority }),
  setFilterAssignee: (assigneeId) => set({ filterAssignee: assigneeId }),
  setFilterDueDate: (filter) => set({ filterDueDate: filter }),

  getFilteredTasks: () => {
    const { tasks, searchQuery, filterPriority, filterAssignee, filterDueDate } = get();
    
    return tasks.filter(task => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDescription = task.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }

      // Priority filter
      if (filterPriority !== 'all' && task.priority !== filterPriority) {
        return false;
      }

      // Assignee filter
      if (filterAssignee !== 'all' && task.assignee?.id !== filterAssignee) {
        return false;
      }

      // Due date filter
      if (filterDueDate !== 'all' && task.dueDate) {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (filterDueDate === 'overdue') {
          if (dueDate >= today) return false;
        } else if (filterDueDate === 'this_week') {
          const weekFromNow = new Date(today);
          weekFromNow.setDate(weekFromNow.getDate() + 7);
          if (dueDate < today || dueDate > weekFromNow) return false;
        }
      } else if (filterDueDate !== 'all' && !task.dueDate) {
        return false;
      }

      return true;
    });
  },

  getTasksByStatus: (status) => {
    return get().getFilteredTasks()
      .filter(task => task.status === status)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  },
}));
