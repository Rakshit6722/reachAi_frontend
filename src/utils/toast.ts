import { toast } from "sonner";

type ToastType = 'success' | 'promise' | 'error' | 'info';

export const customToast = (
  type: ToastType,
  content: string,
  promise?: () => Promise<any>
) => {
  switch (type) {
    case 'success':
      toast.success(content);
      break;
    case 'error':
      toast.error(content);
      break;
    case 'info':
      toast.info(content);
      break;
    case 'promise':
      if (promise) {
        toast.promise(
          promise(),
          {
            loading: 'Loading...',
            success: () => content,
            error: (err: any) => err?.message || 'Something went wrong',
          }
        );
      }
      break;
    default:
      toast(content);
  }
}