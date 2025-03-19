import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tickets = [
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Room Created",
  },
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Admin Respond",
  },
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Room Created",
  },
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Room Created",
  },
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Admin Respond",
  },
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Room Created",
  },
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Admin Respond",
  },
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Room Created",
  },
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Admin Respond",
  },
  {
    id: "#738",
    date: "8 Sep, 2020",
    status: "Room Created",
  },
];

export function TicketsList() {
  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="bg-neutral-900">
          <TableRow className="border-none hover:bg-neutral-900">
            <TableHead className="font-medium text-neutral-400">
              Ticket ID
            </TableHead>
            <TableHead className="font-medium text-neutral-400">Date</TableHead>
            <TableHead className="font-medium text-neutral-400">
              Status
            </TableHead>
            <TableHead className="font-medium text-neutral-400">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow
              key={index}
              className="border-t border-neutral-800 hover:bg-neutral-900/50"
            >
              <TableCell className="text-white">{ticket.id}</TableCell>
              <TableCell className="text-white">{ticket.date}</TableCell>
              <TableCell className="text-white">{ticket.status}</TableCell>
              <TableCell>
                <button className="text-red-600 hover:text-red-500">
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
