import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { getJob, newJob, resetJob, selectJob } from '../store/jobSlice';
import reducer from '../store';
import JobHeader from './JobHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import InventoryTab from './tabs/InventoryTab';
import PricingTab from './tabs/PricingTab';
import ProductImagesTab from './tabs/ProductImagesTab';
import ShippingTab from './tabs/ShippingTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup
    .string()
    .required('You must enter a title')
    .min(5, 'The title must be at least 5 characters'),
  job_category: yup
    .string()
    .required('You must enter a job category')
    .min(5, 'The job category must be at least 5 characters'),
  job_type: yup
    .string()
    .required('You must enter a job type')
    .min(5, 'The job type must be at least 5 characters'),
  department: yup
    .string()
    .required('You must enter a department')
    .min(5, 'The department name must be at least 5 characters'),
  location: yup
    .string()
    .required('You must enter a location')
    .min(4, 'The location must be at least 4 characters'),
  total_positions: yup
    .string()
    .required('You must enter total positions'),
  experience: yup
    .number()
    .required('You must enter experience'),
  offer: yup
    .string()
    .required('You must enter an offer'),
  apply_before: yup
    .string()
    .required('You must select a date'),
  description: yup
    .string()
    .required('You should give some description'),
  requirements: yup
    .string()
    .required('You should give requirements')
});

function Job(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectJob);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { jobId } = routeParams;

      if (jobId === 'new') {
        /**
         * Create New Product data
         */
        dispatch(newJob());
      } else {
        /**
         * Get Product data
         */
        dispatch(getJob(jobId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!product) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(product);
  }, [product, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetJob());
      setNoProduct(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such job!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/jobs"
          color="inherit"
        >
          Go to Jobs Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (product && routeParams.jobId !== product.id && routeParams.jobId !== 'new')
  // ) {
  //   return <FuseLoading />;
  // }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<JobHeader />}
        content={
          <>
            <div className="p-16 sm:p-24">
              <BasicInfoTab product={product} />
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('dashboardJobs', reducer)(Job);
