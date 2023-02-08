import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectWidgets } from '../../../store/widgetsSlice';

function SummaryWidget({ jobs }) {

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-center justify-start px-8 pt-12">
        <Typography
          className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
          color="text.secondary"
        >
          Total Jobs
        </Typography>
      </div>
      <div className="text-center mt-8 pb-40 pt-20">
        <Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500">
          {jobs}
        </Typography>
        <Typography className="text-lg font-medium text-blue-600 dark:text-blue-500">
          Jobs
        </Typography>
      </div>
    </Paper>
  );
}

export default memo(SummaryWidget);
