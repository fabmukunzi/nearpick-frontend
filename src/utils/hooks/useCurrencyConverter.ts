import { convertCurrency } from '@utils/functions/convertCurrency';
import { useState, useEffect } from 'react';

const useCurrencyConverter = ({
  price,
  currency,
}: {
  price: number;
  currency: string;
}) => {
  const [convertedPrice, setConvertedPrice] = useState<number>(price);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversion = async () => {
      try {
        const convertedAmount = await convertCurrency(price, currency);
        setConvertedPrice(convertedAmount || 0);
      } catch (error) {
        console.error('Error converting currency:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversion();
  }, [currency, price]);

  return { convertedPrice: Math.ceil(convertedPrice), isLoading };
};

export default useCurrencyConverter;
