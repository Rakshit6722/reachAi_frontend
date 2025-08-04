import CustomTooltip from '@components/common/CustomTooltip'
import { Button } from '@components/components/ui/button'
import { AlertCircle, CalendarClock, Clock, Mail, Send } from 'lucide-react'
import React from 'react'
import StatusBadge from './StatusBadge'
import type { EmailSent } from '@t/campaign/emailSent'
import type { campaign } from '@t/campaign/campign'

type EmailCardProp = {
    index: number;
    email: EmailSent;
    details: campaign
}

function EmailCard({index, email, details, handleSendImmediately, handleSchedule}: any) {
    return (
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
        </div>
    )
}

export default EmailCard
