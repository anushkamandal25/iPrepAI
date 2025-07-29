import React, { use, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import moment from 'moment'
import { AnimatePresence, motion } from "framer-motion"
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu'
import SpinnerLoader from '../../components/Loader/SpinnerLoader'
import { toast } from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import RoleInfoHeader from './components/RoleInfoHeader'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useStae(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  //Fetch session data by session ID
  const fetchSessionDetailsById = async () => {
    try{
      const response =await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if(response.data && response.data.session){
        setSessionData(response.data.session);
      }
    }catch(error){
      console.error("Error:", error);
    }
  };

  //Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try{

    }catch(error){
      console.error("Error:", error);
    }
  };

  //Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try{

    }catch(error){
      console.error("Error:", error);
    }
  };


  // Add more questions to a session
  const uploadMoreQuestions = async () => {
    try{

    }catch(error){
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if(sessionId){
      fetchSessionDetailsById();
    }
    return () => {};
  }, []);

  return (
    <DashboardLayout>
      <RoleInfoHeader
      role={sessionData?.role || ""}
      topicsToFocus={sessionData?.topicsToFocus || ""}
      experience={sessionData?.experience || "-"}
      questions={sessionData?.questions?.length || "-"}
      description={sessionData?.description || ""}
      lastUpdated={
        sessionData?.updatedAt
        ? moment(sessionData.upDatedAt).format("do MMM YYYY")
        : ""
      }
      />
    </DashboardLayout>
  )
}

export default InterviewPrep