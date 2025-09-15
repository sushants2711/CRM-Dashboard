import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Leads } from './pages/leads/Leads';
import { Agents } from './pages/Agents/Agents';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Sales } from './pages/Sales/Sales';
import { Reports } from './pages/Reports/Reports';
import { CreateLead } from './pages/leads/CreateLead';
import { LeadDetails } from './pages/leads/LeadDetails';
import { CreateSales } from './pages/Sales/CreateSales';
import { ReportPipeline } from './pages/Reports/ReportPipeline';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = { <Dashboard /> } />
      <Route path='/leads' element = { <Leads /> } />
      <Route path='/lead-detail/:id' element={ <LeadDetails /> } />
      <Route path='/agents' element = { <Agents /> } />
      <Route path='/sales' element = { <Sales /> } />
      <Route path='/reports-closed' element = { <Reports /> } />
      <Route path='/reports-pipeline' element = { <ReportPipeline /> } />
      <Route path='/create-lead' element = { <CreateLead /> } />
      <Route path='/create-sale' element={ <CreateSales /> } />
    </Routes>
    </>
  )
}

export default App
