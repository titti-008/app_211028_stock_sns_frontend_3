import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 2000 });

export const SuccessToasts = (messages: string[]) => {
  messages.map((message) =>
    toast.success(message, {
      position: 'bottom-center',
    }),
  );
};

export const ErrorToasts = (messages: string[] | undefined) => {
  if (messages !== undefined) {
    messages.map((message) =>
      toast.error(message, {
        position: 'bottom-center',
      }),
    );
  }
};
