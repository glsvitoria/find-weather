import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IResultsAddress } from "@/types/types";

interface ITableResultsProps {
  results: IResultsAddress[];
}

export function TableResults({ results }: ITableResultsProps) {
  return (
    <Table className="mb-12">
      <TableCaption>Lista de todos os possíveis endereços</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[160px]">CEP</TableHead>
          <TableHead className="min-w-[240px]">Endereço</TableHead>
          <TableHead className="min-w-[200px]">Cidade</TableHead>
          <TableHead className="min-w-[120px]">País</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map(address => (
          <TableRow key={address.properties.place_id}>
            <TableCell className="font-medium">
              {address.properties.postcode
                ? address.properties.postcode
                : "Não encontrado"}
            </TableCell>
            <TableCell>{address.properties.address_line1}</TableCell>
            <TableCell>{address.properties.city}</TableCell>
            <TableCell>{address.properties.country}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
