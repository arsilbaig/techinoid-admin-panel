import { TextField, Typography, Box } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';

function BasicInfoTab({ product }) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <div className="flex items-center space-x-40">
        <Box sx={{ width: '100%' }}>
          <Typography className="text-grey-600 font-medium text-md mt-10">
            Title<span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-6 mb-8"
                error={!!errors.title}
                required
                helperText={errors?.title?.message}
                id="title"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography className="text-grey-600 font-medium text-md mt-10">
            Job category<span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="job_category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-6 mb-8"
                error={!!errors.job_category}
                required
                helperText={errors?.job_category?.message}
                id="job_category"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>
      </div>
      <div className="flex items-center space-x-40">
        <Box sx={{ width: '100%' }}>
          <Typography className="text-grey-600 font-medium text-md mt-10">
            Job type<span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="job_type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-6 mb-8"
                error={!!errors.job_type}
                required
                helperText={errors?.job_type?.message}
                id="job_type"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography className="text-grey-600 font-medium text-md mt-10">
            Department<span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-6 mb-8"
                error={!!errors.department}
                required
                helperText={errors?.department?.message}
                id="department"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>
      </div>
      <div className="flex items-center space-x-40">
        <Box sx={{ width: '100%' }}>
          <Typography className="text-grey-600 font-medium text-md mt-10">
            Location<span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-6 mb-8"
                error={!!errors.location}
                required
                helperText={errors?.location?.message}
                id="location"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography className="text-grey-600 font-medium text-md mt-10">
            Total positions<span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="total_positions"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-6 mb-8"
                error={!!errors.total_positions}
                required
                helperText={errors?.total_positions?.message}
                id="total_positions"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>
      </div>
      <div className="flex items-center space-x-40">
        <Box sx={{ width: '100%' }}>
          <Typography className="text-grey-600 font-medium text-md mt-10">
            Experience<span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-6 mb-8"
                error={!!errors.experience}
                required
                helperText={errors?.experience?.message}
                id="experience"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Typography className="text-grey-600 font-medium text-md mt-10">
            Offer<span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="offer"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-6 mb-8"
                error={!!errors.offer}
                required
                helperText={errors?.offer?.message}
                id="offer"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Box>
      </div>

      <Typography className="text-grey-600 font-medium text-md mt-10 mb-6">
        Last Date<span style={{ color: "red" }}>*</span>
      </Typography>
      <Controller
        name="apply_before"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <DatePicker
            inputFormat="yyyy-MM-dd"
            value={value}
            onChange={onChange}
            required
            renderInput={(_props) => (
              <TextField
                className="w-full mb-8"
                {..._props}
                onBlur={onBlur}
                error={!!errors.apply_before}
                helperText={errors?.apply_before?.message}
              />
            )}
            className="w-1/3"
          />
        )}
      />

      <Typography className="text-grey-600 font-medium text-md mt-20">
        Description<span style={{ color: "red" }}>*</span>
      </Typography>
      <Controller
        className="mt-8 mb-16"
        render={({ field }) => <WYSIWYGEditor {...field} product={product?.description} />}
        name="description"
        control={control}
      />

      <Typography className="text-grey-600 font-medium text-md mt-10">
        Requirements<span style={{ color: "red" }}>*</span>
      </Typography>
      <Controller
        className="mt-8 mb-16"
        render={({ field }) => <WYSIWYGEditor {...field} product={product?.requirements} />}
        name="requirements"
        control={control}
      />
    </div>
  );
}

export default BasicInfoTab;
