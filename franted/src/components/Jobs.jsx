import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Jobs = () => {
  const { allJobs = [], searchedQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState([])

useEffect(() => {
  if (!searchedQuery) {
    setFilterJobs(allJobs)
    return
  }

  const query = searchedQuery.toLowerCase()

  const filteredJobs = allJobs.filter((job) => {
    /* ---------- TEXT FILTER ---------- */
    const matchText =
      job.title?.toLowerCase().includes(query) ||
      job.description?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query)

    /* ---------- SALARY NORMALIZATION ---------- */
    let salaryInLPA = 0

    if (typeof job.salary === "number") {
      // ₹ ya LPA dono handle
      salaryInLPA = job.salary > 100 ? job.salary / 100000 : job.salary
    }

    if (typeof job.salary === "string") {
      const num = job.salary.match(/\d+(\.\d+)?/)
      salaryInLPA = num ? Number(num[0]) : 0
    }

    salaryInLPA = Math.floor(salaryInLPA)

    /* ---------- SALARY FILTER ---------- */
    let matchSalary = false

    if (query === "1-5lpa") {
      matchSalary = salaryInLPA >= 1 && salaryInLPA <= 5
    } else if (query === "7-12lpa") {
      matchSalary = salaryInLPA >= 7 && salaryInLPA <= 12
    } else if (query === "12-20lpa") {
      matchSalary = salaryInLPA >= 12 && salaryInLPA <= 20
    }

    return matchText || matchSalary
  })

  setFilterJobs(filteredJobs)
}, [allJobs, searchedQuery])

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>

          {
            filterJobs.length <= 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-4">
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        key={job?._id}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs
