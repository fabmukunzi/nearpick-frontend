export const convertCurrency = ({
  amount,
  from,
  to,
}: {
  amount: number;
  from: string;
  to: string;
}) => {
  fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
  ).then((res) => {
    // return res.json()[to] * amount;
  });
};
