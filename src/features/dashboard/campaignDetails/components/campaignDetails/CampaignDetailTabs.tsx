import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/components/ui/tabs'
import { ChevronRight, Paperclip, Users, Pencil, Check, X, Loader2, Mail } from 'lucide-react'
import { Input } from '@components/components/ui/input'
import { Textarea } from '@components/components/ui/textarea'
import { Button } from '@components/components/ui/button'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCampaignSubjectService, updateCampaignBodyService } from '@services/campaign/campaign.api'
import { customToast } from '@utils/toast'
import { Badge } from '@components/components/ui/badge'
import LeadDetailTab from './campaignDetailTabs/LeadDetailTab'
import EmailSent from './campaignDetailTabs/emailSentTab/EmailSentTab'

type TabsProp = {
    details: {
        id: number,
        userId: number,
        name: string,
        body: string,
        subject: string,
        status: string,
        createdAt: string,
        emailSent: Array<any>,
        leads: Array<any>
    },
    leadsCount: number,
}

function CampaignDetailTabs({ details, leadsCount }: TabsProp) {
    const [isEditingSubject, setIsEditingSubject] = useState(false)
    const [isEditingBody, setIsEditingBody] = useState(false)
    const [subjectValue, setSubjectValue] = useState(details?.subject || '')
    const [bodyValue, setBodyValue] = useState(details?.body || '')
    const queryClient = useQueryClient()

    const subjectMutation = useMutation({
        mutationFn: () => updateCampaignSubjectService(details.id, { subject: subjectValue }),
        onSuccess: () => {
            customToast('success', 'Email subject updated successfully')
            queryClient.invalidateQueries({ queryKey: ['campaign', details.id.toString()] })
            setIsEditingSubject(false)
        },
        onError: (error: any) => {
            customToast('error', error?.message || 'Failed to update email subject')
        }
    })

    const bodyMutation = useMutation({
        mutationFn: () => updateCampaignBodyService(details.id, { body: bodyValue }),
        onSuccess: () => {
            customToast('success', 'Email body updated successfully')
            queryClient.invalidateQueries({ queryKey: ['campaign', details.id.toString()] })
            setIsEditingBody(false)
        },
        onError: (error: any) => {
            customToast('error', error?.message || 'Failed to update email body')
        }
    })

    const handleCancelSubject = () => {
        setIsEditingSubject(false)
        setSubjectValue(details?.subject || '')
    }

    const handleCancelBody = () => {
        setIsEditingBody(false)
        setBodyValue(details?.body || '')
    }

    return (
        <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1">
                <TabsTrigger value="email" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                    Email Content
                </TabsTrigger>
                <TabsTrigger value="leads" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                    Leads
                </TabsTrigger>
                <TabsTrigger value="attachments" className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm">
                    Sent Emails
                </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-3 mt-3">
                <Card className="border-gray-200 shadow-sm overflow-hidden">
                    <CardHeader className="py-3 px-4 bg-gradient-to-r from-blue-50 to-white border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-gray-800 text-sm">Email Content</CardTitle>
                                <CardDescription className="text-xs">
                                    The message that will be sent to your {leadsCount} leads
                                </CardDescription>
                            </div>
                            {details?.status?.toLowerCase() !== 'sent' && details?.status?.toLowerCase() !== 'completed' && (
                                <div className="flex items-center gap-2">
                                    {(isEditingSubject || isEditingBody) && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 text-xs border-red-200 text-red-600 hover:bg-red-50"
                                            onClick={() => {
                                                handleCancelSubject();
                                                handleCancelBody();
                                            }}
                                            disabled={subjectMutation.isPending || bodyMutation.isPending}
                                        >
                                            <X className="h-3 w-3 mr-1" /> Cancel
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        variant={isEditingSubject || isEditingBody ? "default" : "outline"}
                                        className={`h-7 text-xs ${isEditingSubject || isEditingBody ? "bg-green-600 hover:bg-green-700" : "text-blue-600 hover:bg-blue-50"}`}
                                        onClick={() => {
                                            if (isEditingSubject || isEditingBody) {
                                                if (isEditingSubject && subjectValue !== details?.subject) {
                                                    subjectMutation.mutate();
                                                }
                                                if (isEditingBody && bodyValue !== details?.body) {
                                                    bodyMutation.mutate();
                                                }
                                            } else {
                                                setIsEditingSubject(true);
                                                setIsEditingBody(true);
                                            }
                                        }}
                                        disabled={subjectMutation.isPending || bodyMutation.isPending}
                                    >
                                        {(subjectMutation.isPending || bodyMutation.isPending) ? (
                                            <>
                                                <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Saving...
                                            </>
                                        ) : isEditingSubject || isEditingBody ? (
                                            <>
                                                <Check className="h-3 w-3 mr-1" /> Save Changes
                                            </>
                                        ) : (
                                            <>
                                                <Pencil className="h-3 w-3 mr-1" /> Edit Email
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        {/* Subject section */}
                        <div className="border-b border-gray-100 p-4">
                            <div className="mb-2">
                                <h3 className="text-sm font-medium text-gray-700 mb-1">Subject Line</h3>
                                {isEditingSubject ? (
                                    <Input
                                        value={subjectValue}
                                        onChange={(e) => setSubjectValue(e.target.value)}
                                        className="bg-white border-gray-200 focus:border-blue-400 text-sm"
                                        placeholder="Enter an attention-grabbing subject line"
                                        autoFocus
                                        disabled={subjectMutation.isPending}
                                    />
                                ) : (
                                    <div className="bg-gray-50 p-3 rounded-md border border-gray-200 text-gray-800 flex items-center">
                                        <p className="text-sm flex-1">{details?.subject || 'No subject'}</p>
                                        {details?.status?.toLowerCase() !== 'sent' && details?.status?.toLowerCase() !== 'completed' && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-6 w-6 p-0 ml-2 text-gray-400 hover:text-blue-600"
                                                onClick={() => setIsEditingSubject(true)}
                                            >
                                                <Pencil className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Body section */}
                        <div className="p-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-700 mb-1">Email Body</h3>
                                {isEditingBody ? (
                                    <div className="space-y-2">
                                        <Textarea
                                            value={bodyValue}
                                            onChange={(e) => setBodyValue(e.target.value)}
                                            className="min-h-[250px] bg-white border-gray-200 focus:border-blue-400 text-sm"
                                            placeholder="Write your email content here..."
                                            disabled={bodyMutation.isPending}
                                        />
                                        <p className="text-xs text-gray-500">
                                            Write a clear and concise message that will resonate with your audience.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <div className="bg-gray-50 p-3 rounded-md border border-gray-200 prose prose-sm max-w-none min-h-[150px]">
                                            {details?.body ? (
                                                <div dangerouslySetInnerHTML={{ __html: details.body }} />
                                            ) : (
                                                <p className="text-gray-500 italic">No content added yet</p>
                                            )}
                                        </div>
                                        {details?.status?.toLowerCase() !== 'sent' && details?.status?.toLowerCase() !== 'completed' && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="absolute top-2 right-2 h-6 w-6 p-0 text-gray-400 hover:text-blue-600 bg-white bg-opacity-75 rounded-full shadow-sm"
                                                onClick={() => setIsEditingBody(true)}
                                            >
                                                <Pencil className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tips section - only show when editing */}
                        {(isEditingSubject || isEditingBody) && (
                            <div className="bg-blue-50 p-4 border-t border-blue-100">
                                <h4 className="text-xs font-medium text-blue-700 mb-2">Email Writing Tips</h4>
                                <ul className="text-xs text-blue-700 space-y-1 pl-5 list-disc">
                                    <li>Keep your subject line short and compelling</li>
                                    <li>Personalize your message to increase engagement</li>
                                    <li>Include a clear call-to-action</li>
                                    <li>Avoid spam trigger words and excessive punctuation</li>
                                    <li>Test your email before sending to a large audience</li>
                                </ul>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            <LeadDetailTab leadsCount={leadsCount} details={details} />
                 
            <EmailSent details={details} />
        </Tabs>
    )
}

export default CampaignDetailTabs
