import { useState, useCallback } from 'react';
export const useTabNotificationHook = () => {
  const [tabNotification, setTabNotification] = useState(null);
  const showNotification = () => {
    if (tabNotification) {
      clearInterval(tabNotification);
    }
    let notification = setInterval(() => {
      document.title =
        document.title === 'UQ community' ? 'New Message!' : 'UQ community';
    }, 1000);
    document.getElementById('favicon').href = '/uqNotification.ico';
    setTabNotification(notification);
  };
  const clearNotification = useCallback(() => {
    if (tabNotification) {
      clearInterval(tabNotification);
      document.title = 'UQ community';
      document.getElementById('favicon').href = '/uq.ico';
      setTabNotification(null);
    }
  }, [tabNotification]);
  return [showNotification, clearNotification];
};
