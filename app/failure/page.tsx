import { XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FailurePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Paiement échoué</h1>
          <p className="text-muted-foreground">
            Une erreur est survenue lors du traitement de votre paiement
          </p>
        </div>
        <Link href="/">
          <Button variant="outline" size="lg">
            Réessayer
          </Button>
        </Link>
      </div>
    </div>
  );
}
