import { Alert, AlertDescription, AlertTitle } from '@components/components/ui/alert'
import React from 'react'

type AlertBarProps = {
    title: string,
    success: boolean
}

function AlertBar({title, success}: AlertBarProps) {
  return (
<Alert variant={success ? "default" : "destructive"}>
  <AlertTitle>{title}</AlertTitle>
</Alert>
  )
}

export default AlertBar
