const { useEffect } = require("react");
const { useState } = require("react")

const UseAdmin = (email) => {
    const [isAdmin, setisAdmin] = useState(false);
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        if (email) {
            fetch(`https://second-hand-ecom-serverside.vercel.app/user/admin/${email}`)
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    setisAdmin(result.IsAdmin);
                    setLoading(false);
                })
        }
    }, [email])
    return [isAdmin, isLoading]
}
export default UseAdmin;

