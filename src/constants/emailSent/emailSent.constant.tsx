import { AlertCircle, Ban, CheckCircle, Clock, Mail, Send } from "lucide-react";

export const statusConfig: any = {
    'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="h-3 w-3 mr-1" /> },
    'SENT': { bg: 'bg-blue-100', text: 'text-blue-800', icon: <Send className="h-3 w-3 mr-1" /> },
    'DELIVERED': { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="h-3 w-3 mr-1" /> },
    'FAILED': { bg: 'bg-red-100', text: 'text-red-800', icon: <AlertCircle className="h-3 w-3 mr-1" /> },
    'BOUNCED': { bg: 'bg-orange-100', text: 'text-orange-800', icon: <Ban className="h-3 w-3 mr-1" /> },
    'OPENED': { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: <Mail className="h-3 w-3 mr-1" /> },
    'CLICKED': { bg: 'bg-purple-100', text: 'text-purple-800', icon: <CheckCircle className="h-3 w-3 mr-1" /> }
}