import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Paiement réussi !</h1>
          <p className="text-muted-foreground">
            Votre transaction a été effectuée avec succès
          </p>
        </div>
        <Link href="/">
          <Button size="lg">Retour à la boutique</Button>
        </Link>
      </div>
    </div>
  );
}
