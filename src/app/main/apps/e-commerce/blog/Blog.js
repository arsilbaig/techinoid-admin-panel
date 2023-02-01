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
import { getBlog, newBlog, resetBlog, selectBlog } from '../store/blogSlice';
import reducer from '../store';
import BlogHeader from './BlogHeader';
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
    .min(5, 'The product name must be at least 5 characters'),
  description: yup
    .string()
    .required('You should give some description')
});

function Blog(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectBlog);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const [baseImage, setBaseImage] = useState("");
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { blogId } = routeParams;

      if (blogId === 'new') {
        /**
         * Create New Product data
         */
        dispatch(newBlog());
      } else {
        /**
         * Get Product data
         */
        dispatch(getBlog(blogId)).then((action) => {
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
    setBaseImage(product?.image)
    reset(product);
  }, [product, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetBlog());
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
          There is no such blog!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/blogs"
          color="inherit"
        >
          Go to Blogs Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (product && routeParams.blogId !== product.id && routeParams.blogId !== 'new')
  // ) {
  //   return <FuseLoading />;
  // }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<BlogHeader baseImage={baseImage} setBaseImage={setBaseImage} />}
        content={
          <>
            <div className="p-16 sm:p-24 max-w-3xl">
              <BasicInfoTab baseImage={baseImage} setBaseImage={setBaseImage} />
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('dashboardBlogs', reducer)(Blog);
