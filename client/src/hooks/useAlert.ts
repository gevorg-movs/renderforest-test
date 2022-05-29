import Swal, { SweetAlertOptions } from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

const useAlert = () => {
  const SwalAlert = withReactContent(Swal);

  const showSuccess = async (text: string, options?: SweetAlertOptions) => {
    return SwalAlert.fire({
      text,
      title: 'Success',
      icon: 'success',
      ...options,
    });
  };

  const showError = async (text: string, options?: SweetAlertOptions) => {
    return SwalAlert.fire({
      text,
      title: 'Error',
      icon: 'error',
      ...options,
    });
  };

  const showWarning = async (text: string, options?: SweetAlertOptions) => {
    return SwalAlert.fire({
      text,
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      ...options,
    });
  };

  return { showSuccess, showError, showWarning };
};

export default useAlert;
