"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/hooks/use-toast";

export default function Address() {
  const { connection } = useConnection();
  const { publicKey, connect, disconnect } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [airdropAmount, setAirdropAmount] = useState<number>(1);
  const { toast } = useToast();

  const getAirdropOnClick = async () => {
    try {
      if (!publicKey) {
        toast({
          title: "Wallet is not connected",
          description: "Please connect your wallet to receive an airdrop.",
          variant: "destructive",
        });
        return;
      }
      const [latestBlockhash, signature] = await Promise.all([
        connection.getLatestBlockhash(),
        connection.requestAirdrop(publicKey, airdropAmount * LAMPORTS_PER_SOL),
      ]);
      const sigResult = await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed"
      );
      if (sigResult) {
        toast({
          title: "Airdrop successful!",
          description: `You received ${airdropAmount} SOL.`,
          variant: "default",
        });
      }
    } catch (err) {
      toast({
        title: "Airdrop failed",
        description: "You are rate limited for the airdrop.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 10000);
      })();
    }
  }, [publicKey, connection, balance]);

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setBalance(0);
      toast({
        title: "Wallet disconnected",
        variant: "default",
      });
    } catch (err) {
      console.error("Error disconnecting wallet:", err);
      toast({
        title: "Error disconnecting wallet",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-200">
      <Card className="max-w-md w-full shadow-lg transform hover:scale-105 transition-transform duration-300">
        <CardHeader className="flex justify-between items-center bg-blue-600 p-4 rounded-t-lg">
          <CardTitle className="text-white text-lg font-bold">Solana Wallet</CardTitle>
          <WalletMultiButton
            className="rounded-lg px-4 py-2"
            style={{
              background: "linear-gradient(to right, #667eea, #764ba2)",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </CardHeader>
        <CardContent className="space-y-4 p-6 bg-white">
          {publicKey ? (
            <>
              <div className="flex flex-col items-center">
                <Label htmlFor="public-key" className="text-sm font-semibold text-gray-700">Your Public Key</Label>
                <Input
                  id="public-key"
                  value={publicKey.toString()}
                  readOnly
                  className="font-mono break-all bg-gray-50 border border-gray-300 p-2 mt-2"
                />
              </div>
              <div className="flex flex-col items-center">
                <Label htmlFor="balance" className="text-sm font-semibold text-gray-700">Your Balance</Label>
                <Input
                  id="balance"
                  value={balance.toFixed(2) + " SOL"}
                  readOnly
                  className="text-2xl font-bold bg-gray-50 border border-gray-300 p-2 mt-2"
                />
              </div>
              <div className="flex flex-col items-center">
                <Label htmlFor="airdrop-amount" className="text-sm font-semibold text-gray-700">Airdrop Amount (SOL)</Label>
                <Input
                  id="airdrop-amount"
                  value={airdropAmount}
                  onChange={(e) =>
                    setAirdropAmount(parseFloat(e.target.value) || 0)
                  }
                  type="number"
                  min="0"
                  step="0.1"
                  className="text-2xl font-bold bg-gray-50 border border-gray-300 p-2 mt-2"
                />
              </div>
              <div className="flex gap-4 justify-center mt-4">
                <Button
                  onClick={getAirdropOnClick}
                  variant="default"
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  Get Airdrop
                </Button>
                <Button
                  onClick={handleDisconnect}
                  variant="secondary"
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  Disconnect
                </Button>
              </div>
            </>
          ) : (
            <CardDescription className="text-center text-gray-500">
              Wallet is not connected
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="flex justify-center bg-gray-100 p-4 rounded-b-lg">
          <p className="text-sm text-gray-500">Powered by Solana</p>
        </CardFooter>
      </Card>
    </main>
  );
}
