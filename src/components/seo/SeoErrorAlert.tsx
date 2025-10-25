import { useEffect } from "react";
import { showErrorToast } from "../../utils/toast";

interface SeoErrorAlertProps {
  error: string | null;
}

const SeoErrorAlert = ({ error }: SeoErrorAlertProps) => {
  useEffect(() => {
    if (error) {
      showErrorToast(`Analysis Failed: ${error}`);
    }
  }, [error]);

  return null; // This component now only shows toasts, no UI
};

export default SeoErrorAlert;