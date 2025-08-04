import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/components/ui/card'
import { TabsContent } from '@components/components/ui/tabs'
import { Button } from '@components/components/ui/button'
import { Badge } from '@components/components/ui/badge'
import { Calendar, Clock, Mail, Send, AlertCircle, CheckCircle, Ban, Loader2, CalendarClock, StepBack } from 'lucide-react'
import React, { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/components/ui/tooltip'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from '@components/components/ui/dialog'
import StatusBadge from './StatusBadge'
import EmailTabContent from './EmailTabContent'

// Types for EmailSent
type EmailStatus = 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'BOUNCED' | 'OPENED' | 'CLICKED'

type EmailSent = {
  id: number
  campaignId: number
  leadId: number
  recipient: string
  email?: string
  subject?: string
  status: EmailStatus
  sentAt?: string
  scheduledAt?: string
  deliveredAt?: string
  openedAt?: string
  clickedAt?: string
  failureReason?: string
}

type EmailSpentProps = {
  details: {
    id: number,
    userId: number,
    name: string,
    body: string,
    subject: string,
    status: string,
    createdAt: string,
    emailSent: Array<EmailSent>,
    leads: Array<any>
  },
  setActiveTab: (value: string) => void
}

function EmailSent({details, setActiveTab}: EmailSpentProps) {
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null)
  const [scheduledDate, setScheduledDate] = useState<string>('')
  const [scheduledTime, setScheduledTime] = useState<string>('')

  // Get the current date and time for default schedule values
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const formattedDate = tomorrow.toISOString().split('T')[0]
  const formattedTime = '09:00'
  
  // UI-only function to handle the send immediately button
  const handleSendImmediately = (emailId: number) => {
    console.log('Send immediately:', emailId)
    // This would call an API in a real implementation
  }
  
  // UI-only function to open the schedule dialog
  const handleSchedule = (emailId: number) => {
    setSelectedEmailId(emailId)
    setScheduledDate(formattedDate)
    setScheduledTime(formattedTime)
    setShowScheduleDialog(true)
  }
  
  // UI-only function to handle scheduling
  const handleConfirmSchedule = () => {
    console.log('Schedule email:', selectedEmailId, scheduledDate, scheduledTime)
    setShowScheduleDialog(false)
    // This would call an API in a real implementation
  }


  return (
    <EmailTabContent
      details={details}
      handleSendImmediately={handleSendImmediately}
      handleSchedule={handleSchedule}
      showScheduleDialog={showScheduleDialog}
      setShowScheduleDialog={setShowScheduleDialog}
      scheduledDate={scheduledDate}
      setScheduledDate={setScheduledDate}
      formattedDate={formattedDate}
      handleConfirmSchedule={handleConfirmSchedule}
      scheduledTime={scheduledTime}
      setScheduledTime={setScheduledTime}
      setActiveTab={setActiveTab}
    />
  )
}

export default EmailSent
