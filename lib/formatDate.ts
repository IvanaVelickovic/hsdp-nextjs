export default function formatDate (dateString: string) : string {
    return new Date(dateString).toLocaleDateString("hr-HR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };