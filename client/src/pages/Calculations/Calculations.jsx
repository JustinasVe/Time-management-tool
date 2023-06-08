import { useEffect, useState } from "react";

export const Calculations = () => {
    const [calculations, setCalculations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/calculations?userId=3`)
        .then(res => res.json())
        .then(data => {
            setCalculations(data);
            setIsLoading(false);
        });
    }, []);

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