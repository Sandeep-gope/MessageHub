import React, { useEffect, useState } from 'react'
import Email from './Email'
import useGetAllEmails from '../hooks/useGetAllEmails'
import { useSelector } from 'react-redux';
import store from '../redux/store';

const Emails = ()=>{

  useGetAllEmails();
  const {emails = [], searchText} = useSelector(store => store.app);
  const [filterEmail, setFilterEmail] = useState(emails);

  // useEffect(() =>{
  //   useGetAllEmails();
  // },[])

  useEffect(() =>{
    const filteredEmail = (emails || []).filter((email) =>{
      return email.subject.toLowerCase().includes(searchText.toLowerCase()) || email.to.toLowerCase().includes(searchText.toLowerCase()) || email.message.toLowerCase().includes(searchText.toLowerCase());
    });
    setFilterEmail(filteredEmail);
  },[emails, searchText])

  return (
    <div>
      {
        filterEmail && filterEmail?.map((email) => 
          <Email key={email._id} email={email} />
        )
      }
      {/* <Email />
      <Email />
      <Email />
      <Email />
      <Email />
      <Email />
      <Email />
      <Email />
      <Email />
      <Email />
      <Email />
      <Email />
      <Email /> */}
    </div>
  )
}

export default Emails
