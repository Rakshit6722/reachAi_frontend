import { googleLogo } from '@assets/images'
import { Button } from '@components/components/ui/button'
import { loginContent } from '@constants/auth/login.constants'
import { googleLogin } from '@utils/googleLogin'
import React from 'react'

function GoogleButton() {

    return (
        <Button
            type='button'
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={googleLogin}
        >
            <img src={googleLogo} alt="Google" className="w-4 h-4" />
            {loginContent.googleButton}
        </Button>
    )
}

export default GoogleButton
