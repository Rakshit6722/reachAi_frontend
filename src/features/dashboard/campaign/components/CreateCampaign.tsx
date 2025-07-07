import React, { useState } from 'react';
import { Button } from "@components/components/ui/button";
import { Input } from "@components/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/components/ui/dialog";
import { Plus, HelpCircle } from "lucide-react";
import { Label } from "@components/components/ui/label";
import { Textarea } from "@components/components/ui/textarea";
import type { CampaignFormData } from '@t/campaign/campign';
import CustomTooltip from '@components/common/CustomTooltip';

export function CreateCampaignButton({
  onSubmit,
  children
}: {
  onSubmit: (data: CampaignFormData) => Promise<void>;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gap-1">
            <Plus size={16} /> New Campaign
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const campaignData: CampaignFormData = {
            name: formData.get('name') as string,
            subject: formData.get('subject') as string,
            body: formData.get('body') as string,
          };

          onSubmit(campaignData)
            .then(() => setIsOpen(false))
            .catch(err => console.error(err));
        }}>
          <DialogHeader>
            <DialogTitle>Create a New Campaign</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new email campaign.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex items-center gap-1.5">
                Campaign name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter a descriptive name for your campaign"
                required
              />
              <p className="text-xs text-gray-500">
                This is for your reference only and won't be visible to recipients.
              </p>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="subject" className="flex items-center gap-1.5">
                  Email Subject
                  <CustomTooltip customStyle={true} content='This will appear as the subject line of your email. Keep it concise and compelling.'>
                    <HelpCircle size={14} className="text-gray-400" />
                  </CustomTooltip>
                </Label>
              </div>
              <Input
                id="subject"
                name="subject"
                placeholder="Enter a compelling subject line"
                required
              />
              <p className="text-xs text-gray-500">
                Be specific and attention-grabbing. Avoid spam-triggering words.
              </p>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="body" className="flex items-center gap-1.5">
                  Email Body
                  <CustomTooltip content='Write the main content of your email. This will be sent to all recipients in your campaign.'>
                    <HelpCircle size={14} className="text-gray-400" />
                  </CustomTooltip>
                </Label>
              </div>
              <Textarea
                id="body"
                name="body"
                placeholder="Write your email content here..."
                className="min-h-[150px]"
                required
              />
              <p className="text-xs text-gray-500">
                You can use plain text or simple formatting. Be clear, concise, and include a call-to-action.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Campaign
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCampaignButton;