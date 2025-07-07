import { Tabs, TabsList, TabsTrigger } from '@components/components/ui/tabs'
import React from 'react'

interface TabItem{
    text: string;
    value: string;
}


type CutomTabProps = {
    value: string,
    onValueChange: any,
    content: TabItem[]
}

function CustomTab({ value, onValueChange, content }: CutomTabProps) {
    return (
        <Tabs value={value} onValueChange={onValueChange} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-4 sm:w-auto">
                {
                    content.length > 0 ? (
                        content.map((item) => (
                            <TabsTrigger value={item.value}>{item.text}</TabsTrigger>
                        ))
                    ) : (
                        <p>No tab content foudn</p>
                    )
                }
            </TabsList>

        </Tabs>
    )

}

export default CustomTab
