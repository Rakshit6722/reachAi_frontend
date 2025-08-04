import React, { useState } from 'react'
import { Button } from '@components/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from '@components/components/ui/dialog'
import { Input } from '@components/components/ui/input'
import { Label } from '@components/components/ui/label'
import { Textarea } from '@components/components/ui/textarea'
import { Send, Info } from 'lucide-react'
import type { campaign } from '@t/campaign/campign'

interface CreateEmailDialogProps {
  isOpen: boolean
  onClose: () => void
  campaign: campaign
  onSubmit: (data: { subject?: string; body?: string }) => void
}

function CreateEmailDialog({
  isOpen,
  onClose,
  campaign,
  onSubmit
}: CreateEmailDialogProps) {
  const [subject, setSubject] = useState(campaign.subject || '')
  const [body, setBody] = useState(campaign.body || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ 
      subject: subject.trim() || undefined, 
      body: body.trim() || undefined 
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Email</DialogTitle>
          <DialogDescription>
            Create a new email for your campaign. Leave fields empty to use campaign defaults.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="subject" className="font-medium">
              Subject Line
            </Label>
            <Input
              id="subject"
              placeholder={campaign.subject ? "Using campaign default subject" : "Enter email subject"}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full"
            />
            {campaign.subject && (
              <div className="flex items-start gap-2 mt-1.5">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-500">
                  {!subject.trim() 
                    ? <span>Will use campaign default: "<span className="font-medium text-gray-600">{campaign.subject}</span>"</span>
                    : <span>Campaign default: "{campaign.subject}"</span>}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="body" className="font-medium">
              Email Body
            </Label>
            <Textarea
              id="body"
              placeholder={campaign.body ? "Using campaign default body" : "Enter email content"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[100px] w-full resize-y"
            />
            {campaign.body && (
              <div className="flex items-start gap-2 mt-1.5">
                <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-500">
                  {!body.trim() 
                    ? "Will use campaign default body content" 
                    : "Campaign has a default body that will be used if this field is left empty"}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              <Send className="mr-2 h-4 w-4" />
              Create Email
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEmailDialog