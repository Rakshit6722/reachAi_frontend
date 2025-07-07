import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/components/ui/card'
import { TabsContent } from '@components/components/ui/tabs'
import type EmailSent from './EmailSentTab'
import { Calendar, Clock, Mail, Send, AlertCircle, CheckCircle, Ban, Loader2, CalendarClock } from 'lucide-react'
import CustomTooltip from '@components/common/CustomTooltip'
import { Button } from '@components/components/ui/button'
import StatusBadge from './StatusBadge'
import type { campaign } from '@t/campaign/campign'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@components/components/ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'

interface EmailTabContentProps{
    details: campaign;
    handleSendImmediately: () => void;
    handleSchedule: () => void

}

function EmailTabContent({ details, handleSendImmediately,handleSchedule, showScheduleDialog, setShowScheduleDialog, scheduledDate, setScheduledDate, formattedDate, handleConfirmSchedule, scheduledTime, setScheduledTime }: any) {
    return (
        <TabsContent value="attachments" className="space-y-3 mt-3">
            <Card className="border-gray-200 shadow-sm">
                <CardHeader className="py-2 px-4 bg-gradient-to-r from-purple-50 to-white border-b border-gray-100">
                    <CardTitle className="text-gray-800 text-sm">Sent Emails</CardTitle>
                    <CardDescription className="text-xs">
                        Email delivery history for this campaign
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                    {details?.emailSent && details.emailSent.length > 0 ? (
                        <div className="space-y-4">
                            {details.emailSent.map((email: EmailSent, index: number) => (
                                <div
                                    key={index}
                                    className="flex flex-col p-4 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100 transition-colors duration-200 shadow-sm"
                                >
                                    {/* Email Subject Header */}
                                    <div className="mb-3 pb-2 border-b border-gray-200">
                                        <h3 className="text-sm font-medium text-gray-800">
                                            {email?.subject ? (
                                                email.subject.length > 60 ?
                                                    `${email.subject.substring(0, 60)}...` :
                                                    email.subject
                                            ) : (
                                                details.subject || "No subject"
                                            )}
                                        </h3>
                                    </div>

                                    {/* Email Details */}
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shadow-sm">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    To: <span className="font-medium text-gray-700">{email?.recipient || email?.email || "Recipient"}</span>
                                                </p>
                                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                                    {email.status === 'PENDING' ? (
                                                        <span className="flex items-center">
                                                            <Clock className="h-3 w-3 mr-1" /> Pending
                                                            {email.scheduledAt && (
                                                                <>, scheduled for {new Date(email.scheduledAt).toLocaleString()}</>
                                                            )}
                                                        </span>
                                                    ) : email?.sentAt ? (
                                                        <span className="flex items-center">
                                                            <Send className="h-3 w-3 mr-1" />
                                                            Sent: {new Date(email.sentAt).toLocaleString()}
                                                        </span>
                                                    ) : (
                                                        "Not sent yet"
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 md:self-end">
                                            {email.status === 'PENDING' ? (
                                                <div className="flex items-center gap-2">
                                                    <CustomTooltip content='Send email immediately'>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                                            onClick={() => handleSendImmediately(email.id)}
                                                        >
                                                            <Send className="h-3 w-3 mr-1" />
                                                            <span className="hidden sm:inline">Send Now</span>
                                                        </Button>
                                                    </CustomTooltip>

                                                    <CustomTooltip content='Schedule this email for later'>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                                                            onClick={() => handleSchedule(email.id)}
                                                        >
                                                            <CalendarClock className="h-3 w-3 mr-1" />
                                                            <span className="hidden sm:inline">Schedule</span>
                                                        </Button>
                                                    </CustomTooltip>
                                                </div>
                                            ) : (
                                                StatusBadge(email.status)
                                            )}

                                            {email.failureReason && (
                                                <CustomTooltip content={email.failureReason}>
                                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                                </CustomTooltip>

                                            )}
                                        </div>
                                    </div>

                                    {/* Delivery Timeline (for non-pending emails)
                  {email.status !== 'PENDING' && (email.deliveredAt || email.openedAt || email.clickedAt) && (
                    <div className="mt-3 pt-2 border-t border-gray-200">
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                        {email.deliveredAt && (
                          <span className="flex items-center text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" /> 
                            Delivered: {new Date(email.deliveredAt).toLocaleString()}
                          </span>
                        )}
                        {email.openedAt && (
                          <span className="flex items-center text-blue-600">
                            <Mail className="h-3 w-3 mr-1" /> 
                            Opened: {new Date(email.openedAt).toLocaleString()}
                          </span>
                        )}
                        {email.clickedAt && (
                          <span className="flex items-center text-purple-600">
                            <CheckCircle className="h-3 w-3 mr-1" /> 
                            Clicked: {new Date(email.clickedAt).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )} */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <Mail className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                            <p className="text-gray-500 text-sm">No emails have been sent in this campaign yet</p>
                            {details?.status?.toLowerCase() === 'draft' && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Emails will appear here once the campaign is sent
                                </p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Schedule Dialog */}
            <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Schedule Email</DialogTitle>
                        <DialogDescription>
                            Choose when this email should be sent
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="schedule-date" className="text-right text-sm font-medium">
                                Date
                            </label>
                            <input
                                id="schedule-date"
                                type="date"
                                value={scheduledDate}
                                onChange={(e) => setScheduledDate(e.target.value)}
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                min={formattedDate}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="schedule-time" className="text-right text-sm font-medium">
                                Time
                            </label>
                            <input
                                id="schedule-time"
                                type="time"
                                value={scheduledTime}
                                onChange={(e) => setScheduledTime(e.target.value)}
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmSchedule}>
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </TabsContent>
    )
}

export default EmailTabContent
