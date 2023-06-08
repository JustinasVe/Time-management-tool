import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContextWrapper";

export const Calculations = () => {
    const [calculations, setCalculations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [projectHours, setProjectHours] = useState('');
    // const [deadline, setDeadline] = useState('');
    // const [result, setResult] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/calculations?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
            setCalculations(data);
            setIsLoading(false);
        });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    };

    return (
        <div>
            {calculations.map((calculation) =>
                <div key={calculation.id}>
                    <span>{calculation.projectHours}</span>&ensp;
                    <span>{calculation.hours}</span>
                </div>
            )}
        </div>
    );
};