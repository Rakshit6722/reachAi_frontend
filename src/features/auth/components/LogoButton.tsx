import { fullLogo } from '@assets/images'
import React from 'react'
import CustomTooltip from '../../../components/common/CustomTooltip'

function LogoButton() {
    return (
        <CustomTooltip link='/' content='back to home'>
            <div className="p-2 rounded-sm hover:bg-gray-100 hover:scale-105 active:bg-gray-200">
                <img
                    src={fullLogo}
                    alt="ReachAI"
                    className="w-[100px] transition-transform"
                />
            </div>
        </CustomTooltip>
    )
}

export default LogoButton
