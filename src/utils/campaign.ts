import { format } from "date-fns";

export const getStatusColors = (status: string) => {
    switch (status.toLowerCase()) {
        case 'draft':
            return { badge: "outline", border: "border-gray-200", bg: "bg-gray-50" };
        case 'scheduled':
            return { badge: "secondary", border: "border-purple-200", bg: "bg-purple-50" };
        case 'running':
            return { badge: "default", border: "border-blue-200", bg: "bg-blue-50" };
        case 'completed':
            return { badge: "success", border: "border-green-200", bg: "bg-green-50" };
        case 'sent':
            return { badge: "success", border: "border-green-200", bg: "bg-green-50" };
        case 'paused':
            return { badge: "warning", border: "border-yellow-200", bg: "bg-yellow-50" };
        default:
            return { badge: "outline", border: "border-gray-200", bg: "bg-gray-50" };
    }
};


export const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
        case 'running': return '🔄';
        case 'completed':
        case 'sent': return '✅';
        default: return '';
    }
};


  export const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch (e) {
      return dateString || 'N/A'
    }
  }