export const validateCsvFile = (selectedFile: File, setError?: (args: any) => void) => {
    // Check file type
    if (selectedFile.name.endsWith('.csv')) {
        setError!('Please select a CSV file');
        return false;
    }

    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
        setError!('File size must be less than 5MB');
        return false;
    }

    return true
}