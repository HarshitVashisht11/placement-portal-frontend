import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StudentAttribute, Task } from '@/lib/store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// export interface Task {
//   id: UniqueIdentifier;
//   columnId: ColumnId;
//   content: string;
// }

interface TaskCardProps {
  task: StudentAttribute;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: StudentAttribute;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task'
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary'
      }
    }
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn( variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      }), "py-0 my-1")}
    >
      <CardHeader className="py-1 space-between relative flex flex-row items-center justify-between border-b-2 border-secondary px-3">
        <span className="whitespace-pre-wrap px-3 text-left">
          {task.title || task.label}
        </span>
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="-mr-2 h-auto cursor-grab text-secondary-foreground/50"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
      </CardHeader>
    </Card>
  );
}
