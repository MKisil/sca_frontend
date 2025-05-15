"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";

export default function EditSalaryDialog({
  cat,
  onSuccess,
}: {
  cat: any;
  onSuccess: () => void;
}) {
  const [salary, setSalary] = useState(cat.salary);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.patch(`http://127.0.0.1:8001/cats/${cat.id}`, { salary });
      onSuccess();
      setOpen(false);
      toast("Salary updated successfully");
    } catch (error) {
      toast("Error updating salary");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Salary</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {cat.name}'s Salary</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right">
              New Salary
            </Label>
            <Input
              id="salary"
              type="number"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
