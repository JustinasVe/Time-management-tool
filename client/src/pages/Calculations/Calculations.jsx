import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContextWrapper";
import LOCAL_STORAGE_JWT_TOKEN_KEY from "../../constants";

export const Calculations = () => {
    const [calculations, setCalculations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [projectHours, setProjectHours] = useState(0);
    const [deadline, setDeadline] = useState('');
    const [commitments, setCommitments] = useState([]);
    const [maxDailyHours, setMaxDailyHours] = useState(8);
    const [result, setResult] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/calculations?userId=${user.id}`, {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
              setCalculations(data);
            }
            setIsLoading(false);
        });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`${process.env.REACT_APP_API_URL}/calculations`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
          },
          body: JSON.stringify({
              projectHours,
              deadline,
              commitments,
              maxDailyHours,
              userId: user.id
          })
      })
      .then((res) => res.json())
      .then((data) => {
          if (!data.error) {
            setCalculations(data);
            setProjectHours('');
            setDeadline('');
            setCommitments('');
            setMaxDailyHours('');
          }
      });
  }
  const handleProjectHoursChange = (event) => {
    const hours = Math.max(0, parseInt(event.target.value));
    setProjectHours(hours);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleCommitmentDateChange = (event, index) => {
    const updatedCommitments = [...commitments];
    updatedCommitments[index].date = event.target.value;
    setCommitments(updatedCommitments);
  };

  const handleCommitmentHoursChange = (event, index) => {
    const hours = Math.max(0, Math.min(parseInt(event.target.value), maxDailyHours));
    const updatedCommitments = [...commitments];
    updatedCommitments[index].hours = hours;
    setCommitments(updatedCommitments);
  };

  const addCommitment = () => {
    setCommitments([...commitments, { date: '', hours: 0 }]);
  };

  const deleteCommitment = (index) => {
    const updatedCommitments = [...commitments];
    updatedCommitments.splice(index, 1);
    setCommitments(updatedCommitments);
  };

  const handleMaxDailyHoursChange = (event) => {
    const hours = Math.max(0, parseInt(event.target.value));
    setMaxDailyHours(hours);
  };

  const calculateRemainingTime = () => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const remainingDays = Math.floor(timeDiff / (1000 * 3600 * 24));

    if (remainingDays >= 0) {
      const totalCommitmentHours = commitments.reduce(
        (total, commitment) => total + parseInt(commitment.hours),
        0
      );

      const remainingWorkHours = Math.max(0, projectHours - totalCommitmentHours);
      const availableDays = Math.ceil(remainingWorkHours / maxDailyHours);

      if (availableDays <= remainingDays) {
        const workSchedule = [];

        let remainingWorkHoursRemainingDays = remainingWorkHours;

        for (let i = 1; i < remainingDays; i++) { // Start from the second day
          const date = new Date(today.getTime() + i * 24 * 3600 * 1000);
          const commitmentOnDate = commitments.find(
            (commitment) => commitment.date === date.toISOString().slice(0, 10)
          );

          let workHours = maxDailyHours;
          if (commitmentOnDate) {
            const commitmentHours = commitmentOnDate.hours;
            workHours = Math.max(0, workHours - commitmentHours);
          }

          if (remainingWorkHoursRemainingDays > 0) {
            workHours = Math.min(workHours, remainingWorkHoursRemainingDays);
            remainingWorkHoursRemainingDays -= workHours;
          } else {
            workHours = 0;
          }

          workSchedule.push({
            date: date.toDateString(),
            hours: workHours,
          });
        }

        return {
          canFinishOnTime: true,
          workSchedule: workSchedule,
        };
      }
    }

    return {
      canFinishOnTime: false,
      workSchedule: [],
    };
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const result = calculateRemainingTime();
  //   setResult(result);
  // };

  return (
    <div>
      <h1>Time Management App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Project Hours:
          <input
            type="number"
            value={projectHours}
            onChange={handleProjectHoursChange}
          />
        </label>
        <br />
        <label>
          Deadline:
          <input
            type="date"
            value={deadline}
            onChange={handleDeadlineChange}
          />
        </label>
        <br />
        <label>
          Commitments:
          {commitments.map((commitment, index) => (
            <div key={index}>
              <label>
                Date:
                <input
                  type="date"
                  value={commitment.date}
                  onChange={(event) => handleCommitmentDateChange(event, index)}
                />
              </label>
              <label>
                Hours:
                <input
                  type="number"
                  value={commitment.hours}
                  onChange={(event) => handleCommitmentHoursChange(event, index)}
                />
              </label>
              <button type="button" onClick={() => deleteCommitment(index)}>
                Delete
              </button>
            </div>
          ))}
        </label>
        <br />
        <button type="button" onClick={addCommitment}>
          Add Commitment
        </button>
        <br />
        <label>
          Max Daily Hours:
          <input
            type="number"
            value={maxDailyHours}
            onChange={handleMaxDailyHoursChange}
          />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div>
          <h2>Result:</h2>
          {result.canFinishOnTime ? (
            <div>
              <p>You can finish the project on time.</p>
              <p>Work Schedule:</p>
              <ul>
                {result.workSchedule.map((schedule, index) => (
                  <li key={index}>
                    {schedule.date}: {schedule.hours} hours
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>You cannot finish the project on time.</p>
          )}
        </div>
      )}
    </div>
  );
};