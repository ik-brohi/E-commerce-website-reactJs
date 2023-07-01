import { useEffect } from "react"

const useTitle=title=>{
    useEffect(()=>{
        document.title=`${title}-Sell-Second-Hand-Products`;
    },[title])
}
export default useTitle;