# Task

List out the computational inefficiencies and anti-patterns found in the provided code block.

---

**Please check the provided code block in `index.old.ts` and the refactored version in `index.new.ts`**

Here’s a breakdown of computational inefficiencies and anti-patterns in the provided code block:

**1. Inefficient and incorrect `useMemo` filtering Logic**

```js
return balances.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) {
    if (balance.amount <= 0) {
      return true;
    }
  }
  return false;
});
```

- `lhsPriority` is **undefined** – likely a typo meant to be `balancePriority`.
- **Logic is inverted**: you're filtering in balances with `amount <= 0`, which is likely unintended, the filter condition should typically include balances with value, not zero or negative.

**2. `getPriority()` recalculated multiple times**

```js
.filter(...) // calls getPriority
.sort(...)   // calls getPriority again for each comparison
```

- Using `getPriority` function inside `.filter()` and again in `.sort()` causes **repeated pure computation**.
  -> Cache the result with a `Map<string, number>` before filtering and sorting

- Should move pure utilities outside the component body:
  - Avoid unnecessary re-creation on each render.
  - Improves memoization and referential stability (if you use them in other hooks like `useMemo` or `useCallback`).

**3. Unused variable: `formattedBalances` is created but not used**

```js
const formattedBalances = sortedBalances.map(...)
```

- Should use `formattedBalanced` for the main source when rendering `rows`.

**4. Type inconsistency: `balance.blockchain` not in the Interface**

```js
interface WalletBalance {
  currency: string;
  amount: number;
}
```

- `WalletBalance` type doesn't define `blockchain`, but it's referenced in `getPriority(balance.blockchain)`

**5. Using `index` as `key` in React list**

```js
<WalletRow
  className={classes.row}
  key={index} // <<<
  amount={balance.amount}
  usdValue={usdValue}
  formattedAmount={balance.formatted}
/>
```

- This is an anti-pattern in React. Use a **stable unique key**, like `balance.currency`, to avoid rendering bugs when list changes.

**6. `useMemo`'s dependencies is incorrect**

```js
useMemo(() => {...}, [balances, prices])
```

- The memoized computation does not use `prices`, so including it as a dependency is misleading, it makes `sortedBalances` recompute unnecessarily when only prices changes.

**7. Implicit type assumptions**

```js
const usdValue = prices[balance.currency] * balance.amount;
```

- No check for `prices[balance.currency]` being undefined, can cause `NaN` bugs if `prices` hasn't loaded yet.
