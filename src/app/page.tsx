'use client'
import { useState } from 'react';

import { useWriteContract } from 'wagmi'
import { loanContractABI, loanContractAddress } from '@/config/abi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoanForm = () => {
  const [amount, setAmount] = useState<string>('');
  const [interest, setInterest] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const { writeContract } = useWriteContract();

  const handleCreateLoan = () => {
    // Convert the input values to BigInt and Number respectively
    const amountInWei = BigInt(parseFloat(amount) * 1e18); // Convert to wei
    const interestInWei = BigInt(parseFloat(interest) * 1e18); // Convert to wei
    const durationInDays = Number(duration);

    

    writeContract({
      abi: loanContractABI,
      address: loanContractAddress,
      functionName: 'crearPrestamo',
      args: [amountInWei, interestInWei, durationInDays],
    });
  };
  return (

    <div className="p-4">
      <div>
      <w3m-button />
      </div>
      <h2 className="text-2xl mb-4">Create Loan</h2>
      <div >
        <Input
          placeholder="Loan Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          placeholder="Interest Amount"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
        <Input
          placeholder="Duration in Days"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <Button onClick={handleCreateLoan} color="primary">
          Create Loan
        </Button>
      </div>
    </div>
  );
};

export default LoanForm;
