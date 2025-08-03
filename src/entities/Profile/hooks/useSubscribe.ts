import { SubcribeApiError, useSubscribeQuery, useUnsubscribeQuery } from '../api/subscribeApi';

interface UseSubscribeProps {
    subscribed: boolean;
    changeSubscribe: (boolean: boolean) => void
}

export function useSubscribe(props: UseSubscribeProps) {
  const { subscribed, changeSubscribe } = props;
  const [subscribe, { isLoading: subscribeLoading, error: subscribeError }] = useSubscribeQuery();
  const [
    unsubscribe,
    { isLoading: unsubscribeLoading, error: unsubscribeError },
  ] = useUnsubscribeQuery();

  const handleSubscribe = (id: string) => {
    if (!id) return;

    const mutation = subscribed ? unsubscribe : subscribe;
    const nextValue = !subscribed;

    mutation(id).then(() => {
      changeSubscribe(nextValue);
    });
  };

  return {
    handleSubscribe,
    loading: subscribeLoading || unsubscribeLoading,
    error: (subscribeError as SubcribeApiError)?.data?.message
    || (unsubscribeError as SubcribeApiError)?.data?.message,
  };
}
