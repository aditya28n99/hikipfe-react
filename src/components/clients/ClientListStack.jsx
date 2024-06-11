import  { useState, useCallback, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { fetchClients } from '../../apis/ClientAPIs';
import { NavLink } from 'react-router-dom';
import Loading from '../utils/Loading';
import AddNewClient from './AddNewClient';

export default function ClientListStack() {
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [isSideOverOpen, SetIsSideOverOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
  
  
    const fetchAndProcess = async () => {
      setHasMore(false);
      try {
        const result = await fetchClients(page, 20);
        setPage(prevPage => prevPage + 1);
        setClientList(prevClients => [...prevClients, ...result.data]);
        setHasMore(!!result.nextPage);
        setTotalCount(result.totalCount);
      } catch (error) {
        console.error('Failed to load more clients:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchAndProcess();
  
  }, [isLoading, page]); // Dependency on isLoading ensures this effect runs after it changes.

  const loadMoreClients = useCallback(() => {
  if (isLoading) return;
  setIsLoading(true);
}, [isLoading]); // Triggers the effect by changing isLoading.

  return (
    <>
      { isLoading && !totalCount ? (
        <>
          <span className=''>Loading Clients ...</span>
          <Loading />
        </>
      ) : (
        <>
        <h2 className='text-danger'>
          If you are not able to see clients list, you may have not logged in using the test credentials. Logout from current account using top right corner click "Tim Cook".
          Login using ID:svb@hikip.com PW:PaWv2b5Fy@n6BSi to see test data. Please do not remove this message in your commits.
          
        </h2>
        <p>--</p>
        <div className='flex justify-between items-center mb-2'>
          <span>{totalCount} Clients</span>
          <button 
            className="inline-flex justify-end rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => SetIsSideOverOpen(true)}
          >
            Add New Client
          </button>
        </div>
          
          <InfiniteScroll
            loadMore={loadMoreClients}
            hasMore={hasMore}
            loader={<div className="loader" key={0}>Loading ...</div>}
          >
            <ul role="list" className="divide-y divide-gray-200 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
              {clientList.map(client => (
                <li key={client.uuid} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        <NavLink 
                            to={`${client.uuid}`}>
                          <span className="absolute inset-0" />
                          {client.contact.legal_first_name} {client.contact.legal_last_name}
                        </NavLink>
                      </p>
                      <p className="mt-1 flex text-xs leading-5 text-gray-500">
                        {client.contact.contactemail_set.map(email => email.email).join(', ')}
                        {client.contact.contactphone_set.map(phone => phone.phone_number).join(', ')}
                      </p>
                    </div>
                  </div>
                  <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </>
      )}
      <AddNewClient isOpen={isSideOverOpen} setIsOpen={SetIsSideOverOpen} />
    </>
  );
}
