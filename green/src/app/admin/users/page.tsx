import { UsersRound } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/status-badge";

const users = [
  { name: "Entrepreneur Demo", email: "demo@greenpattern.test", role: "entrepreneur" },
  { name: "Expert Demo", email: "expert@greenpattern.test", role: "expert" },
  { name: "Admin Demo", email: "admin@greenpattern.test", role: "admin" }
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Utilisateurs</h2>
        <p className="mt-2 text-muted-foreground">Vue simple des comptes et roles de demonstration.</p>
      </div>
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.email} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <UsersRound className="h-5 w-5 text-primary" />
              <div>
                <CardTitle className="text-base">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
            <StatusBadge label={user.role} tone="gray" />
          </Card>
        ))}
      </div>
    </div>
  );
}
