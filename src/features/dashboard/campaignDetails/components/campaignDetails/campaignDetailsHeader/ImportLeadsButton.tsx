import React, { useState } from 'react'
import { UserPlus, Loader2 } from 'lucide-react'
import { Button } from '@components/components/ui/button'
import CustomTooltip from '@components/common/CustomTooltip'
import useImportLeads from '../../../hooks/useImportLeads'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from '@components/components/ui/dialog'
import { Input } from '@components/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/components/ui/form'
import { formSchema, type FormValues } from '@schemas/lead.schema'


function ImportLeadsButton({ id }: { id: number }) {
    const [isOpen, setIsOpen] = useState(false)
    const { setPayload, createLeadMutation } = useImportLeads(id)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            company: ''
        }
    })

    const onSubmit = (values: FormValues) => {
        setPayload(values)
        createLeadMutation.mutate()
        setIsOpen(false)
    }

    return (
        <>
            <CustomTooltip content='Add a single lead manually'>
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800 flex items-center gap-1.5"
                    onClick={() => setIsOpen(true)}
                >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Lead</span>
                </Button>
            </CustomTooltip>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Lead</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Acme Inc." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsOpen(false)}
                                    disabled={createLeadMutation.isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={createLeadMutation.isPending}
                                >
                                    {createLeadMutation.isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Adding...
                                        </>
                                    ) : (
                                        'Add Lead'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ImportLeadsButton
