export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "alive":
      return "bg-green-500";
    case "dead":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export function getStatusText(status: string): string {
  switch (status.toLowerCase()) {
    case "alive":
      return "Vivo";
    case "dead":
      return "Muerto";
    default:
      return "Desconocido";
  }
}
