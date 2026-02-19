import { useEffect, useState } from 'react';
import { Loading } from './Loading';

function useLoadChart(delayMs: number) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timer: number;
    async function fetchHighcharts() {
      // These imports must be done on the client, since they use browser APIs
      await import('highcharts/modules/accessibility');
      //@ts-expect-error missing type def for some reason
      await import('highcharts/i18n/nb-NO');

      timer = window.setTimeout(() => {
        setLoading(false);
      }, delayMs);
    }

    fetchHighcharts();
    return () => clearTimeout(timer);
  }, [delayMs]);

  return loading;
}

export const LoadChart = ({
  delay = 2000,
  children,
}: React.PropsWithChildren<{ delay?: number }>) => {
  const loading = useLoadChart(delay);
  return loading ? <Loading /> : children;
};
