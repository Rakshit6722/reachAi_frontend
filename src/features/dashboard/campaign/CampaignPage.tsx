import React, { useState } from 'react';
import { CreateCampaignButton } from './components/CreateCampaign.tsx';
import type { CampaignFormData } from '@t/campaign/campign.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCampaignService } from '@services/campaign/campaign.api.ts';
import { customToast } from '@utils/toast.ts';
import { Mail, Plus } from 'lucide-react';
import { Button } from '@components/components/ui/button';
import CampaignList from './components/CampaignList.tsx';
import { motion } from 'framer-motion';
import { containerVariants, iconVariants, itemVariants } from '@animations/campaign.animation.ts';

function CampaignPage() {
  
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: createCampaignService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
      customToast("success", "New Campaign created successfully")
    },
    onError: (err) => {
      customToast("error", err?.message || "unable to create campaign")
    }
  });

  function handleCreateCampaign(formData: CampaignFormData) {
    return new Promise<void>((resolve, reject) => {
      mutation.mutate(formData, {
        onSuccess: () => {
          resolve();
        },
        onError: (error) => {
          reject(error);
        }
      });
    });
  };



  return (
    <motion.div 
      className="max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page header */}
      <motion.div 
        className="mb-6 border-b border-gray-100 pb-5"
        variants={itemVariants}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="rounded-md bg-blue-50 p-2 shrink-0"
              variants={iconVariants}
              whileHover={{ scale: 1.05, backgroundColor: "#E1EFFE" }}
            >
              <Mail className="h-5 w-5 text-blue-600" />
            </motion.div>
            <div>
              <motion.h1 
                className="text-xl font-medium text-gray-800"
                variants={itemVariants}
              >
                Campaigns
              </motion.h1>
              <motion.p 
                className="text-sm text-gray-500 hidden sm:block"
                variants={itemVariants}
              >
                Create and manage your email campaigns
              </motion.p>
            </div>
          </div>

          {/* Responsive button - Fixed to provide only a single child */}
          <motion.div variants={itemVariants}>
            {/* Mobile version */}
            <div className="sm:hidden">
              <CreateCampaignButton onSubmit={handleCreateCampaign}>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button size="sm" className="rounded-full h-10 w-10 p-0">
                    <Plus size={18} />
                  </Button>
                </motion.div>
              </CreateCampaignButton>
            </div>
            
            {/* Desktop version */}
            <div className="hidden sm:block">
              <CreateCampaignButton onSubmit={handleCreateCampaign}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button>
                    <Plus className="mr-1 h-4 w-4" /> New Campaign
                  </Button>
                </motion.div>
              </CreateCampaignButton>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div 
        className="space-y-6"
        variants={itemVariants}
      >
        <CampaignList />
      </motion.div>
    </motion.div>
  );
}

export default CampaignPage;
