import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from './ui/badge'

const mockData = [
  { id: 1, date: '12-Sep-2024', company: 'Microsoft', role: 'SDE Intern', status: 'Pending' },
  { id: 2, date: '15-Sep-2024', company: 'Google', role: 'Frontend Developer', status: 'Accepted' },
  { id: 3, date: '18-Sep-2024', company: 'Amazon', role: 'Data Scientist', status: 'Rejected' },
  { id: 4, date: '20-Sep-2024', company: 'Apple', role: 'UX Designer', status: 'Pending' },
  { id: 5, date: '22-Sep-2024', company: 'Facebook', role: 'Product Manager', status: 'Pending' },
  { id: 6, date: '25-Sep-2024', company: 'Netflix', role: 'Backend Developer', status: 'Pending' },
];

const AppliedTables = () => {
  return (
    <div className='text-start'>
      <h2 className='p-3 text-xl font-bold text-gray-600'>Applied jobs</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((item) => (
            <TableRow key={`job-${item.id}`}>
              <TableCell className="font-medium">{item.date}</TableCell>
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.role}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`${item.status === 'Pending' ? 'bg-black' :
                      item.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'
                    } text-white rounded-lg`}
                >
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedTables