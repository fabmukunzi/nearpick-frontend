export const convertCurrency = async (amount: number, currency: string) => {
  try {
    const response = await fetch(
      'https://v6.exchangerate-api.com/v6/771426272f02745aea592da4/latest/RWF'
    );
    const data = await response.json();
    console.log(data);
    if (data?.result === 'success') {
      return data?.conversion_rates[currency] * amount;
    } else {
      console.error('Failed to fetch exchange rates:', data?.error);
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
  }
};
