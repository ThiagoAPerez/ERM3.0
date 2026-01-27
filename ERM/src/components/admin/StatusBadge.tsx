import { cn } from "@/lib/utils";

type StatusType =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING"
  | "success"
  | "warning"
  | "error"
  | "active"
  | "inactive"
  | "SUSPENDED"
  | "DELETED";

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusConfig: Record<
  StatusType,
  { bg: string; text: string; dot: string; label: string }
> = {
  ACTIVE: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    label: "Activo",
  },
  active: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    label: "Activo",
  },
  INACTIVE: {
    bg: "bg-warning/10",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Inactivo",
  },
  DELETED: {
    bg: "bg-warning/10",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Inactivo",
  },
  inactive: {
    bg: "bg-warning/10",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Inactivo",
  },
  PENDING: {
    bg: "bg-emphasis/10",
    text: "text-emphasis",
    dot: "bg-emphasis",
    label: "Pendiente",
  },
  success: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    label: "Completado",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
    dot: "bg-warning",
    label: "En proceso",
  },
  SUSPENDED: {
    bg: "bg-warning/10",
    text: "text-warning",
    dot: "bg-warning",
    label: "En proceso",
  },
  error: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    dot: "bg-destructive",
    label: "Error",
  },
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.bg,
        config.text,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {label || config.label}
    </span>
  );
};

export default StatusBadge;
