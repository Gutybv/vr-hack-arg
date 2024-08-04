'use client'
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  const [blockchain, setBlockchain] = useState("");
  const [contract, setContract] = useState("");
  const [tokensOwned, setTokensOwned] = useState("");
  const [desiredAmount, setDesiredAmount] = useState("");

  return (
    <div className="bg-black text-white min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Prestamos P2P</h1>
      <div className="mb-6 w-full max-w-md">
        <label className="block mb-2 font-semibold">Que te gustaria dar/ que te gustaria recibir</label>
        <Select value={blockchain} onValueChange={(value:any) => setBlockchain(value)}>
          <SelectTrigger className="w-full bg-black">
            <SelectValue placeholder="Selecciona la blockchain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="eth">Ethereum/USDC</SelectItem>
            <SelectItem value="base">USDC/Ethereum</SelectItem>
            <SelectItem value="polygon_pos">Ethereum/Aave</SelectItem>
            <SelectItem value="bsc">Aave/Ethereum</SelectItem>
            
          </SelectContent>
        </Select>
      </div>
      <div className="mb-6 w-full max-w-md">
        <label className="block mb-2 font-semibold">Cuanto buscas recibir?</label>
        <Input
          type="number"
          value={contract}
          onChange={(e) => setContract(e.target.value)}
          placeholder="$ que recibes"
          className="bg-gray-800 border-gray-700"
        />
      </div>
      <div className="mb-6 w-full max-w-md">
        <label className="block mb-2 font-semibold">Cantidad que tienes que dejar de colateral</label>
        <Input
          type="number"
          value={tokensOwned}
          onChange={(e) => setTokensOwned(e.target.value)}
          placeholder="Número de tokens"
          className="bg-gray-800 border-gray-700"
        />
      </div>
     
      <Button className="mb-8 bg-green-500 hover:bg-green-400 text-black font-bold">
        Obtener precio
      </Button>
    </div>
  );
}
