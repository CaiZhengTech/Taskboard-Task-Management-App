import { KanbanBoard } from '@/components/KanbanBoard';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TaskBoard - Kanban Task Manager</title>
        <meta name="description" content="A GitHub Projects-style Kanban task manager with drag-and-drop, filtering, and real-time updates." />
      </Helmet>
      <KanbanBoard />
    </>
  );
};

export default Index;
