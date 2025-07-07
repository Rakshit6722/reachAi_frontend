import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@components/components/ui/dialog';
import { Button } from '@components/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCampaignService } from '@services/campaign/campaign.api';
import { customToast } from '@utils/toast';

function DeleteCampaignModal({
    id,
    campaignName,
    children,
}: {
    id: number;
    campaignName: string;
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    // Mutation for deleting a campaign
    const mutation = useMutation({
        mutationFn: () => deleteCampaignService(id),
        onSuccess: () => {
            // Invalidate the campaigns query to refresh the list
            queryClient.invalidateQueries({queryKey:['campaigns']});
            customToast('success', `Campaign "${campaignName}" deleted successfully.`);
            setIsOpen(false);
        },
        onError: (error: any) => {
            customToast('error', error?.message || 'Failed to delete the campaign.');
        },
    });

    const handleDelete = () => {
        mutation.mutate();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Delete Campaign</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the campaign <strong>{campaignName}</strong>? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={mutation.isPending}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={mutation.isPending}>
                        {mutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteCampaignModal;