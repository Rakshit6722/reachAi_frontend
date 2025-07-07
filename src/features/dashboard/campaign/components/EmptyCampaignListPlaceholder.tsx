import { FileText } from 'lucide-react'
import React from 'react'

function EmptyCampaignListPlaceholder() {
  return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-lg border border-dashed border-gray-200 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
          <FileText className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No campaigns yet</h3>
        <p className="text-gray-500 max-w-md mb-8">
          Create your first email campaign to start reaching out to your audience.
        </p>
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -top-32 -left-16 animate-pulse">
              <svg width="60" height="52" viewBox="0 0 60 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27 2C32 15.5 48.5 8.5 59 14" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
                <path d="M2 50C15.5 40 20.5 22 15 7.5" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <button className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
              Create a Campaign
            </button>
          </div>
        </div>
      </div>
  )
}

export default EmptyCampaignListPlaceholder
