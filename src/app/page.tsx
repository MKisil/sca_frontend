"use client";
import { useEffect, useState } from "react";
import { Cat } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddCatForm from "@/components/add-cat-form";
import EditSalaryDialog from "@/components/edit-salary-dialog";
import { toast } from "sonner";
import axios from "axios";

import { breedMapping } from "@/components/add-cat-form";

const API_URL = "http://127.0.0.1:8001/cats";

export default function Home() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCats = async () => {
    try {
      const response = await axios.get(API_URL);
      setCats(response.data);
    } catch (err) {
      setError("Failed to fetch cats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchCats();
      toast("Cat deleted successfully");
    } catch (err) {
      toast("Error deleting cat");
    }
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spy Cats Management</h1>

      <AddCatForm onSuccess={fetchCats} />

      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cats.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>
                {breedMapping[cat.breed as keyof typeof breedMapping]}
              </TableCell>

              <TableCell>{cat.years_of_experience} years</TableCell>
              <TableCell>${cat.salary}</TableCell>
              <TableCell className="flex gap-2">
                <EditSalaryDialog cat={cat} onSuccess={fetchCats} />
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(cat.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
