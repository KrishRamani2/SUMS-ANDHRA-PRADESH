import AcademicStatsHeader from './Container'
import PerformanceChart from './StudentPerformance'
import MetricsDisplay from './StudentMetrics'
import EnrollmentChart from './EnrollmentChart'
import MetricsGrid from './Piedata'
import Header from './Header'

const SchoolDashboard = () => {
  return (
    <div className='bg-gray-100 p-4'>
      <Header />
      <div className='mt-10'><AcademicStatsHeader /></div>
      
      <div className=' mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>      <PerformanceChart />
      <MetricsDisplay /></div>
      <div className=' mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>      <EnrollmentChart />
      <MetricsGrid /></div>


    </div>
  )
}

export default SchoolDashboard
