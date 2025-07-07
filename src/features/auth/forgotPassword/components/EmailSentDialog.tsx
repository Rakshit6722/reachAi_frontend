import { Button } from '@components/components/ui/button';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../router/routes';

function EmailSentDialog({lastEmail, setEmailSent}:{lastEmail: string, setEmailSent: (data: boolean) => void}) {
    const navigate = useNavigate()
  return (
     <div className="flex flex-col items-center gap-6 py-8">
              <div className="text-center">
                <div className="text-4xl mb-2">📧</div>
                <div className="font-medium text-lg mb-1">
                  Check your email!
                </div>
                <div className="text-gray-500 text-sm">
                  {lastEmail
                    ? `We sent a password reset link to ${lastEmail}.`
                    : "We sent a password reset link to your email."}
                  <br />
                  Didn't receive it? Check your spam folder or resend below.
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setEmailSent(false);
                }}
              >
                Resend Link
              </Button>
              <Button
                className="w-full"
                onClick={() => navigate(routes.login)}
                variant="secondary"
              >
                Back to Login
              </Button>
            </div>
  )
}

export default EmailSentDialog
