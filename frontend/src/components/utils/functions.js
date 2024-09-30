import axios from "axios";
import { useEffect } from "react";
import { USER_API_END_POINT } from "./constant";

export const useCheckApplied = (JobId, setApplied) => {
    useEffect(() => {
        const checkApplicationStatus = async () => {
            try {
                const apiUrl = `${USER_API_END_POINT}/application/applied/${JobId}`;
                const res = await axios.get(apiUrl, { withCredentials: true });

                if (res.data.success) {
                    setApplied(true);
                } else {
                    setApplied(false);
                }
            } catch (error) {
                setApplied(false);
                console.log(error)
            }
        }; 

        if (JobId) {
            checkApplicationStatus();
        }
    }, [JobId, setApplied]);
}
