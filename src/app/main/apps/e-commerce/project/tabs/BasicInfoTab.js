import { TextField, Typography, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';

function BasicInfoTab({ baseImage, setBaseImage, product }) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (e.target.files[0]) {
      const base64 = await convertBase64(file);
      setBaseImage(base64);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <Typography
        className="text-grey-600 font-medium text-md mt-24"
      >
        Upload project photo<span style={{ color: "red" }}>*</span>
      </Typography>
      <div className="mb-20">
        <input
          htmlFor="photo"
          className="hidden"
          type="file"
          id="photo"
          onChange={(e) => {
            uploadImage(e);
          }}
        />

        <div className="flex items-center mt-12">
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? lighten(theme.palette.background.default, 0.4)
                  : lighten(theme.palette.background.default, 0.02),
            }}
            component="label"
            htmlFor="photo"
            className="flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
          >
            <FuseSvgIcon size={32} color="action">
              heroicons-outline:upload
            </FuseSvgIcon>
          </Box>
          {baseImage &&
            <img
              className="flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden"
              src={baseImage}
            />
          }
        </div>
      </div>

      <Typography className="text-grey-600 font-medium text-md mt-24">
        Title<span style={{ color: "red" }}>*</span>
      </Typography>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.title}
            required
            helperText={errors?.title?.message}
            id="title"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Typography className="text-grey-600 font-medium text-md mt-24">
        Description<span style={{ color: "red" }}>*</span>
      </Typography>
      <Controller
        className="mt-8 mb-16"
        render={({ field }) => <WYSIWYGEditor {...field} product={product?.description} />}
        name="description"
        control={control}
      />
    </div>
  );
}

export default BasicInfoTab;
