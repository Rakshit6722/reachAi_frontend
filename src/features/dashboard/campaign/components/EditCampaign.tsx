import React, { useState, useEffect, type FormEvent } from 'react';
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
import { HelpCircle } from "lucide-react";
import { Label } from "@components/components/ui/label";
import { Textarea } from "@components/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCampaignDetailsService, updateCampaignService } from '@services/campaign/campaign.api';
import type { CampaignFormData } from '@t/campaign/campign';
import CustomTooltip from '@components/common/CustomTooltip';
import { customToast } from '@utils/toast';

export function EditCampaignButton({
    campaignId,
    children,
    onSuccess
}: {
    campaignId: number;
    children: React.ReactNode;
    onSuccess?: () => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['campaign', campaignId],
        queryFn: () => getCampaignDetailsService(campaignId),
        enabled: isOpen,
    });

    const campaignDetails = data?.data?.data?.campaign;

    const mutation = useMutation({
        mutationFn: (formData: CampaignFormData) =>
            updateCampaignService(campaignId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            queryClient.invalidateQueries({ queryKey: ['campaign', campaignId] });
            customToast("success", "Campaign updated successfully");
            setIsOpen(false);
            if (onSuccess) onSuccess();
        },
        onError: (err: any) => {
            customToast("error", err?.message || "Unable to update campaign");
        }
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const campaignData: CampaignFormData = {
            name: formData.get('name') as string,
            subject: formData.get('subject') as string,
            body: formData.get('body') as string,
        };

        mutation.mutate(campaignData);

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto">
                {isLoading ? (
                    <div className="py-8 text-center">Loading campaign details...</div>
                ) : error ? (
                    <div className="py-8 text-center text-red-500">
                        Error loading campaign details. Please try again.
                    </div>
                ) : (
                    <form onSubmit={(e) => handleSubmit(e)} className=''>
                        <DialogHeader>
                            <DialogTitle>Edit Campaign</DialogTitle>
                            <DialogDescription>
                                Update the details of your existing campaign.
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
                                    defaultValue={campaignDetails?.name}
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
                                    defaultValue={campaignDetails?.subject}
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
                                    defaultValue={campaignDetails?.body}
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
                                disabled={mutation.isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? "Updating..." : "Update Campaign"}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default EditCampaignButton;