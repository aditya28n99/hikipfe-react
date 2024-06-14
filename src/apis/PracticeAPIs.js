import { BaseApi, handleApiError } from "./BaseAPI";
const appointmentEndpoint = '/practice/appointments';
const billsEndpoint = '/practice/invoices';


export const fetchPracticeAppointments = async ({params}) => {
    try {
      const response = await BaseApi.get(`${appointmentEndpoint}/${params.appointmentId? params.appointmentId : ""}`, {
        params: { start_datetime_after: params.from, start_datetime_before: params.to,
          client:params.clientId
         },
      });
      return response;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch appointments');
    }
  };

  export const addPracticeAppointments = async (appointmentData) => {
    try {
      const response = await BaseApi.post(`${appointmentEndpoint}`, appointmentData);
      return response;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to add new appointment');
    }
  }

  export const updatePracticeAppointments = async (uuid, appointmentData) => {
    try {
      const response = await BaseApi.put(`${appointmentEndpoint}/${uuid}`,appointmentData);
      return response;
    } catch (error) {
      console.error('Failed to update appointment data');
      throw handleApiError(error);
    }
  }

  export const deletePracticeAppointments = async (uuid) => {
    try {
      const response = await BaseApi.delete(`${appointmentEndpoint}/${uuid}`);
      return response;
    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to delete appointments');
    }
  };

  
  export const fetchPracticeBills = async ({params}) => {
    try {
      const response = await BaseApi.get(`${billsEndpoint}/${params.invoiceId? params.invoiceId : ""}`, {
        params: { client: params.clientId, appointment: params.appointmentId,
         },
      });
      console.log(response, "ss");
      return response;

    } catch (error) {
      handleApiError(error);
      throw new Error('Failed to fetch invoices');
    }
  };