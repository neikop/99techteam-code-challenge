var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  if (n === 1) return 1;
  return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function (n) {
  return Array.from({ length: n }).reduce((sum, _, index) => sum + index, n);
};

console.log(sum_to_n_a(4)) // 10
console.log(sum_to_n_b(5)) // 15
console.log(sum_to_n_c(6)) // 21
