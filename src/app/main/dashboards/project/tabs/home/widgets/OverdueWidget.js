import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectWidgets } from '../../../store/widgetsSlice';

function OverdueWidget() {

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-8 pt-12">
        <Typography
          className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
          color="text.secondary"
        >
          Overdue
        </Typography>
        <IconButton aria-label="more" size="large">
          <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
        </IconButton>
      </div>
      <div className="text-center mt-8">
        <Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-red-500">
          4
        </Typography>
        <Typography className="text-lg font-medium text-red-600">Tasks</Typography>
      </div>
      <Typography
        className="flex items-baseline justify-center w-full mt-20 mb-24"
        color="text.secondary"
      >
        <span className="truncate">Yesterday's overdue</span>:
        <b className="px-8">2</b>
      </Typography>
    </Paper>
  );
}

export default memo(OverdueWidget);
