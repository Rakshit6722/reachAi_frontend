import { Badge } from '@components/components/ui/badge'
import { Pencil, Check, X, Loader2 } from 'lucide-react'
import { Button } from '@components/components/ui/button'
import { Input } from '@components/components/ui/input'

import useEditCampaignDetailHeader from '../../../../hooks/useEditCampaignDetailHeader'
import ImportCsvLeads from './ImportCsvLeads'
import ImportLeadsButton from './ImportLeadsButton'

type CampaignDetailsHeaderProps = {
  id: number,
  name: string,
  date: string,
  status: string,
  statusColor: any,
}

function CampaignDetailsHeader({ id, name, date, status, statusColor }: CampaignDetailsHeaderProps) {
  const {
    isEditing,
    nameValue,
    setNameValue,
    mutation,
    handleEditToggle,
    handleCancel
  } = useEditCampaignDetailHeader(id, name)

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-lg shadow-sm">
      <div className="space-y-1 w-full md:w-auto">
        <div className="flex items-center gap-2 w-full">
          {isEditing ? (
            <div className="flex items-center gap-2 w-full max-w-md">
              <Input
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                className="h-9 text-lg font-medium"
                placeholder="Enter campaign name"
                autoFocus
                disabled={mutation.isPending}
              />
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-green-600"
                  onClick={handleEditToggle}
                  disabled={mutation.isPending || !nameValue.trim()}
                >
                  {mutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-red-600"
                  onClick={handleCancel}
                  disabled={mutation.isPending}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold tracking-tight text-gray-800">
                {name || 'Unnamed Campaign'}
              </h1>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600"
                onClick={handleEditToggle}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500">Created on {date}</p>
      </div>
      <div className='flex gap-4 flex-row-reverse'>
        <Badge className={`${statusColor} capitalize px-3 py-1 shadow-sm mt-1 md:mt-0`}>
          {status || 'draft'}
        </Badge>
        <ImportCsvLeads  />
        <ImportLeadsButton id={id} />
      </div>
    </div>
  )
}

export default CampaignDetailsHeader



