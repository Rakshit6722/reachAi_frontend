import React, { useState, useRef } from 'react'
import { FileSpreadsheet, Upload, X, AlertCircle, CheckCircle, FileDown, Loader2 } from 'lucide-react'
import { Button } from '@components/components/ui/button'
import CustomTooltip from '@components/common/CustomTooltip'
import useImportCsvLeads from '../../../hooks/useImportCsvLeads'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from '@components/components/ui/dialog'
import { useParams } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from '@components/components/ui/alert'
import { sampleCsvData } from '@constants/csvUpload/csvUpload.constant'
import { downloadSampleCsv } from '@utils/csv'
import { validateCsvFile } from '../../../validator/csv.validator'

function ImportCsvLeads() {
    const { campaignId } = useParams<{ campaignId: string }>();
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [previewData, setPreviewData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getFormData = () => {
        if (!file) return null;
        const formData = new FormData();
        formData.append('file', file);
        return formData;
    }

    const { uploadCsvMutation } = useImportCsvLeads(
        Number(campaignId)
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return

        const validation = validateCsvFile(selectedFile, setError)

        if(!validation){
            return
        }

        setFile(selectedFile);

        // Preview the CSV data
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const csvText = event.target?.result as string;
                const rows = csvText.split('\n');
                const headers = rows[0].split(',').map(header => header.trim().replace(/"/g, ''));

                // Check required headers
                const requiredHeaders = ['email', 'firstName', 'lastName', 'company'];
                const missingHeaders = requiredHeaders.filter(h =>
                    !headers.some(header => header.toLowerCase() === h.toLowerCase())
                );

                if (missingHeaders.length > 0) {
                    setError(`Missing required columns: ${missingHeaders.join(', ')}`);
                    return;
                }

                // Parse first few rows for preview
                const previewRows = [];
                for (let i = 1; i < Math.min(rows.length, 4); i++) {
                    if (rows[i].trim()) {
                        const cells = rows[i].split(',').map(cell => cell.trim().replace(/"/g, ''));
                        const rowData: any = {};
                        headers.forEach((header, index) => {
                            rowData[header] = cells[index] || '';
                        });
                        previewRows.push(rowData);
                    }
                }

                setPreviewData(previewRows);
            } catch (err) {
                setError('Failed to parse CSV file. Please check the format.');
            }
        }
        reader.readAsText(selectedFile);
    }

    const handleUpload = () => {
        const formData = getFormData();
        if (!formData) return;

        uploadCsvMutation.mutate(formData);
        setIsOpen(false)
        resetFileInput()
    }

    const resetFileInput = () => {
        setFile(null);
        setPreviewData([]);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
    
    return (
        <>
            <CustomTooltip content='Import leads from CSV file'>
                <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800 flex items-center gap-1.5"
                    onClick={() => setIsOpen(true)}
                >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="hidden sm:inline">Import CSV</span>
                </Button>
            </CustomTooltip>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Import Leads from CSV</DialogTitle>
                        <DialogDescription>
                            Upload a CSV file with email, firstName, lastName, and company columns
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {!file ? (
                            <div
                                className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-500 mt-1">CSV files up to 5MB</p>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-3"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        downloadSampleCsv(sampleCsvData);
                                    }}
                                >
                                    <FileDown className="h-4 w-4 mr-1" />
                                    Download Sample CSV
                                </Button>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md border border-blue-100">
                                    <div className="flex items-center">
                                        <FileSpreadsheet className="h-5 w-5 text-blue-500 mr-2" />
                                        <div>
                                            <p className="text-sm font-medium text-blue-700">{file.name}</p>
                                            <p className="text-xs text-blue-500">{(file.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 w-7 p-0 text-gray-500 hover:text-red-500"
                                        onClick={resetFileInput}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                {error ? (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                ) : previewData.length > 0 ? (
                                    <div>
                                        <p className="text-sm font-medium mb-2">Preview ({previewData.length} rows):</p>
                                        <div className="border rounded-md overflow-hidden max-h-[200px] overflow-y-auto">
                                            <table className="w-full text-xs">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-2 py-1.5 text-left font-medium text-gray-500 border-b">Email</th>
                                                        <th className="px-2 py-1.5 text-left font-medium text-gray-500 border-b">First Name</th>
                                                        <th className="px-2 py-1.5 text-left font-medium text-gray-500 border-b">Last Name</th>
                                                        <th className="px-2 py-1.5 text-left font-medium text-gray-500 border-b">Company</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {previewData.map((row, i) => (
                                                        <tr key={i} className="border-b last:border-0">
                                                            <td className="px-2 py-1.5 text-gray-700">{row.email}</td>
                                                            <td className="px-2 py-1.5 text-gray-700">{row.firstName}</td>
                                                            <td className="px-2 py-1.5 text-gray-700">{row.lastName}</td>
                                                            <td className="px-2 py-1.5 text-gray-700">{row.company}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {previewData.length === 3 ? 'Showing all rows' : 'Showing first 3 rows'}
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            disabled={uploadCsvMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpload}
                            disabled={!file || !!error || uploadCsvMutation.isPending}
                        >
                            {uploadCsvMutation.isPending ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Importing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Import Leads
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ImportCsvLeads
