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
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const AppliedTables = () => {
  const { allAppliedJobs } = useSelector(store => store.userappliedJobs)
  const navigate = useNavigate();

  const getTime = (createdAt) => {
    const createdTime = new Date(createdAt);
    const timeAgo = formatDistanceToNow(createdTime, { addSuffix: true });
    return timeAgo;
  }

  const openDescription = (jobId) => {
    navigate(`/jobs/description/${jobId}`);
  }

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
          {allAppliedJobs.map((item, index) => (
            <TableRow
              key={`job-${item.id}`}
              onClick={() => openDescription(item.job._id)}
              className="cursor-pointer hover:bg-[#d4ddf7] transition-colors"
            >
              <TableCell className="font-medium">{getTime(item.createdAt)}</TableCell>
              <TableCell>{item.job.company.name}</TableCell>
              <TableCell>{item.job.title}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`${item.status === 'pending' ? 'bg-black hover:bg-black ' :
                    item.status === 'accepted' ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'
                    } text-white rounded-lg uppercase`}
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

export default AppliedTables;
