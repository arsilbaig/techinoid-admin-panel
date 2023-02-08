import { motion } from 'framer-motion';
import SummaryWidget from './widgets/SummaryWidget';
import OverdueWidget from './widgets/OverdueWidget';
import IssuesWidget from './widgets/IssuesWidget';
import FeaturesWidget from './widgets/FeaturesWidget';
import { useEffect, useState } from 'react';
import axios from 'axios';

function HomeTab() {
  const [allData, setAllData] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard`)
      .then((res) => {
        setAllData(res.data.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <SummaryWidget jobs={allData.jobPostCount} />
      </motion.div>
      <motion.div variants={item}>
        <OverdueWidget projects={allData.portfolioCount} />
      </motion.div>
      <motion.div variants={item}>
        <IssuesWidget blogs={allData.blogCount} />
      </motion.div>
      <motion.div variants={item}>
        <FeaturesWidget applicants={allData.jobApplyCount} />
      </motion.div>
    </motion.div>
  );
}

export default HomeTab;
