import { cn } from "@/lib/utils";

/* ===================== DOMAIN STATUS ===================== */
type BusinessStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING"
  | "SUSPENDED"
  | "DELETED";

/* ===================== UI STATUS ===================== */
type StatusType =
  | "active"
  | "inactive"
  | "pending"
  | "success"
  | "warning"
  | "error";

/* ===================== PROPS ===================== */
interface StatusBadgeProps {
  status: StatusType | BusinessStatus;
  label?: string;
}

/* ===================== CONFIG ===================== */
const statusConfig: Record<
  StatusType,
  { bg: string; text: string; dot: string; label: string }
> = {
  active: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    label: "Activo",
  },
  inactive: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    label: "Inactivo",
  },
  pending: {
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
  error: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    dot: "bg-destructive",
    label: "Error",
  },
};

/* ===================== ADAPTER ===================== */
const mapBusinessStatusToUI = (status: BusinessStatus): StatusType => {
  switch (status) {
    case "ACTIVE":
      return "active";
    case "INACTIVE":
      return "inactive";
    case "PENDING":
      return "pending";
    case "SUSPENDED":
      return "error";
    case "DELETED":
      return "error";
    default:
      return "inactive";
  }
};

/* ===================== COMPONENT ===================== */
const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const uiStatus: StatusType =
    status === "ACTIVE" ||
    status === "INACTIVE" ||
    status === "PENDING" ||
    status === "DELETED" ||
    status === "SUSPENDED"
      ? mapBusinessStatusToUI(status)
      : status;

  const config = statusConfig[uiStatus];

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
