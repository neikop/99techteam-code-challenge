interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

// Predefined priority map to avoid repeated computation
const priorityMap: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// Move pure utilities outside the component body
const getPriority = (blockchain: string): number => {
  return priorityMap[blockchain] ?? -99;
};

const WalletPage: React.FC<Props> = ({ children, ...props }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .filter((balance) => {
        const priority = getPriority(balance.blockchain);
        return priority > 0 && balance.amount > 0;
      })
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))
      .map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]);

  const rows = formattedBalances.map((balance) => {
    const price = prices[balance.currency] ?? 0;
    const usdValue = price * balance.amount;

    return (
      <WalletRow
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...props}>{rows}</div>;
};
