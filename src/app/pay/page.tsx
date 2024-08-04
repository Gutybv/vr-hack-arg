'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface Loan {
  id: number;
  amountRequested: number;
  amountPaid: number;
  active: boolean;
}

const loans: Loan[] = [
  { id: 1, amountRequested: 0.001, amountPaid: 0.001, active: false },
  { id: 2, amountRequested: 0.003, amountPaid: 0.003, active: false },
  { id: 3, amountRequested: 0.003, amountPaid: 0.003, active: false },
];

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const handlePayClick = (loan: Loan) => {
    setSelectedLoan(loan);
    setIsDialogOpen(true);
  };

  const handlePayment = () => {
    // Lógica para procesar el pago
    console.log(`Pagar ${paymentAmount} para el préstamo ${selectedLoan?.id}`);
    setIsDialogOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Préstamos Activos</h1>
      <Table>
        <TableCaption>Una lista de tus préstamos activos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Préstamo</TableHead>
            <TableHead>Cantidad Solicitada</TableHead>
            <TableHead>Cantidad Pagada</TableHead>
            <TableHead>Activo</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id}>
              <TableCell className="font-medium">{loan.id}</TableCell>
              <TableCell>{loan.amountRequested}</TableCell>
              <TableCell>{loan.amountPaid}</TableCell>
              <TableCell>{loan.active ? "Sí" : "No"}</TableCell>
              <TableCell className="text-right">
                <Button onClick={() => handlePayClick(loan)}>Pagar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedLoan && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pagar Préstamo</DialogTitle>
              <DialogDescription>
                Ingresa la cantidad que deseas pagar para el préstamo {selectedLoan.id}.
              </DialogDescription>
            </DialogHeader>
            <Input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Cantidad a pagar"
              className="bg-gray-800 border-gray-700 mb-4"
            />
            <DialogFooter>
              <Button onClick={handlePayment}>Confirmar Pago</Button>
              <Button onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
