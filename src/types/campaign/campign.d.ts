export interface CreateCampaignModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CampaignFormData) => Promise<void>;
}

export interface CampaignFormData {
  name: string;
  subject: string;
  body: string;
}

export interface campaign{
  id: number;
  name: string;
  status: string;
  createdAt: string;
  leads: Array<any>;
  emailSent?: Array<any>;
  body?: string;
  subject?: string;
}
