import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectWidgets } from '../../../store/widgetsSlice';

function IssuesWidget({ blogs }) {

  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden">
      <div className="flex items-center justify-start px-8 pt-12">
        <Typography
          className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
          color="text.secondary"
        >
          Blogs
        </Typography>
      </div>
      <div className="text-center mt-8 pb-40 pt-20">
        <Typography className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-amber-500">
          {blogs}
        </Typography>
        <Typography className="text-lg font-medium text-amber-600">Blogs</Typography>
      </div>
    </Paper>
  );
}

export default memo(IssuesWidget);
