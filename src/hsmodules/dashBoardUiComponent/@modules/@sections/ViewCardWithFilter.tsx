import { Box, Card, Checkbox, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
interface ViewCardProps {
  count: number;
  title: string;
  hasFilter?: boolean;
  dataSource?: any;
  isLoading?: boolean;
}

const ViewCardWithFilter: React.FC<ViewCardProps> = ({
  title,
  count,
  hasFilter = false,
  dataSource,
  isLoading,
}) => {
  const [daily, setDaily] = useState(true);
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [quarterly, setQuarterly] = useState(false);
  const [annually, setAnnually] = useState(false);
  const [countValue, setcountValue] = useState(count);
  const [arr, setArr] = useState(0);

  const renderDataSource = () => {
    if (daily) {
      setcountValue(dataSource.totalInPresentDay);
      return;
    } else if (weekly) {
      setcountValue(dataSource.totalInPresentWeek);
      return;
    } else if (monthly) {
      setcountValue(dataSource.totalInPresentMonth);
      return;
    } else if (quarterly) {
      setcountValue(dataSource.totalInPresentQuarter);
      return;
    } else if (annually) {
      setcountValue(dataSource.totalInPresentYear);
      return;
    } else {
      setcountValue(dataSource.totalInPresentDay);
      setDaily(true);
      return;
    }
  };

  useEffect(() => {
    renderDataSource();
  }, [arr, count]);

  const RenderFilterGroup = () => {
    const handleChangeDaily = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(value);
      setWeekly(false);
      setMonthly(false);
      setQuarterly(false);
      setAnnually(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeWeekly = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(false);
      setWeekly(value);
      setMonthly(false);
      setQuarterly(false);
      setAnnually(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeMonthly = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(false);
      setWeekly(false);
      setMonthly(value);
      setQuarterly(false);
      setAnnually(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeQuarterly = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(false);
      setWeekly(false);
      setMonthly(false);
      setQuarterly(value);
      setAnnually(false);
      setArr((prevState) => prevState + 1);
    };

    const handleChangeAnnually = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.checked;
      setDaily(false);
      setWeekly(false);
      setMonthly(false);
      setQuarterly(false);
      setAnnually(value);
      setArr((prevState) => prevState + 1);
    };

    return (
      <>
        <Stack direction="column">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            }}
          >
            <label>{"Today"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={daily}
              onChange={handleChangeDaily}
              name="daily"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            }}
          >
            <label>{"This Week"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={weekly}
              onChange={handleChangeWeekly}
              name="weekly"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            }}
          >
            <label>{"This Month"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={monthly}
              onChange={handleChangeMonthly}
              name="monthly"
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            }}
          >
            <label>{"This Quarter"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={quarterly}
              onChange={handleChangeQuarterly}
              name="quarterly"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              m: 0,
              p: 0,
            }}
          >
            <label>{"This Year"}</label>
            <Checkbox
              sx={{ m: 0, p: 0, ml: 2 }}
              size="small"
              checked={annually}
              onChange={handleChangeAnnually}
              name="annually"
            />
          </Box>
        </Stack>
      </>
    );
  };

  const isFilterObject = () => {
    return { padding: 1.5, width: "75%" };
  };

  if (isLoading === true && isNaN(countValue)) {
    setTimeout(() => {
      setArr((prevState) => prevState + 1);
    }, 3000);

    return (
      <Card
        sx={{
          p: isFilterObject().padding,
          background: "#f9f9f9",
          boxShadow: "0",
          borderRadius: 4,
          width: { xs: "100%" },
          textAlign: "center",
          mr: 1,
          mb: { xs: 1 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: isFilterObject().width }}>
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", fontSize: "15px" }}
          >
            <p>Loading . . .</p>
          </Typography>
        </Box>
      </Card>
    );
  } else
    return (
      <Card
        sx={{
          p: isFilterObject().padding,
          background: "#f9f9f9",
          boxShadow: "0",
          borderRadius: 4,
          width: { xs: "100%" },
          textAlign: "center",
          mr: 1,
          mb: { xs: 1 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: isFilterObject().width }}>
          <Typography
            variant="h1"
            sx={{ fontWeight: "bold", fontSize: "15px" }}
          >
            {countValue}
          </Typography>
          <Typography>{title}</Typography>
        </Box>
        <RenderFilterGroup />
      </Card>
    );
};

export default ViewCardWithFilter;

// import { Box, Card, Checkbox, Stack, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// interface ViewCardProps {
//   count: any;
//   title: string;
//   hasFilter?: boolean;
//   dataSource?: any;
// }

// const ViewCardWithFilter: React.FC<ViewCardProps> = ({
//   title,
//   count,
//   hasFilter = false,
//   dataSource,
// }) => {
//   // const [daily, setDaily] = useState(false);
//   // const [weekly, setWeekly] = useState(false);
//   // // const [monthly, setMonthly] = useState(false);
//   // // const [quarterly, setQuarterly] = useState(false);
//   // // const [annually, setAnnually] = useState(false);
//   const [countValue, setcountValue] = useState({
//     count: count,
//   });
//   const [values, setValues] = useState({
//     daily: false,
//     weekly: false,
//   });

//   // const renderDataSource = () => {
//   //   var obj = {
//   //     isDailyChecked: daily,
//   //     isWeeklyChecked: weekly,
//   //     daily: dataSource,
//   //     count: countValue.count,
//   //   };

//   //   if (daily && weekly === false) {
//   //     console.log("IF DAILY  ONLY IS TRUE");
//   //     let objValue = {
//   //       count: dataSource.totalPatientAdmittedInPreviousDay,
//   //     };
//   //     setcountValue(objValue);
//   //     obj.count = countValue.count;
//   //     return obj;
//   //   } else if (daily === false && weekly === true) {
//   //     console.log("ELSE WEEKLY ONLY IS TRUE");

//   //     let objValue = {
//   //       count: dataSource.totalPatientAdmittedInPreviousWeek,
//   //     };
//   //     setcountValue(objValue);
//   //     obj.count = countValue.count;
//   //     return obj;
//   //   } else {
//   //     console.log("ELSE BOTH ARE FALSE");

//   //     let objValue = {
//   //       count: count,
//   //     };
//   //     setcountValue(objValue);
//   //     obj.count = count;
//   //     return obj;
//   //   }
//   // };

//   const RenderFilterGroup = () => {
//     const renderDataSource = () => {
//       var obj = {
//         isDailyChecked: values.daily,
//         isWeeklyChecked: values.weekly,
//         daily: dataSource,
//         count: countValue.count,
//       };

//       if (values.daily && values.weekly === false) {
//         console.log("IF DAILY  ONLY IS TRUE");
//         let objValue = {
//           count: dataSource.totalPatientAdmittedInPreviousDay,
//         };
//         setcountValue(objValue);
//         obj.count = countValue.count;
//         return obj;
//       } else if (values.daily === false && values.weekly === true) {
//         console.log("ELSE WEEKLY ONLY IS TRUE");

//         let objValue = {
//           count: dataSource.totalPatientAdmittedInPreviousWeek,
//         };
//         setcountValue(objValue);
//         obj.count = countValue.count;
//         return obj;
//       } else if (values.daily === false && values.weekly === false) {
//         console.log("ELSE BOTH ARE FALSE");
//         let objValue = {
//           count: count,
//         };
//         setcountValue(objValue);
//         obj.count = count;
//         return obj;
//       }
//     };

//     useEffect(() => {
//       const result = renderDataSource();
//       console.log("after onchange ===>", {
//         obj: result,
//       });
//     }, [values, countValue]);

//     // const handleChangeDaily = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //   const value = e.target.checked;
//     //   setDaily(value);
//     //   setWeekly(false);
//     // };

//     //   const handleChangeWeekly = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     const value = e.target.checked;
//     //     setWeekly(value);
//     //     setDaily(false);
//     //   };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.checked;
//       const name = e.target.name;
//       setValues((prevState) => {
//         return { ...prevState, [name]: value };
//       });
//     };

//     // const handleChangeDaily = () => {
//     //   const value = !daily;
//     //   setDaily(value);
//     //   setWeekly(false);
//     // };

//     // const handleChangeWeekly = () => {
//     //   const value = !weekly;
//     //   setWeekly(value);
//     //   setDaily(false);
//     // };

//     // const handleChangeMonthly = () => {
//     //   const value = !weekly;
//     //   setWeekly(value);
//     //   setDaily(false);
//     // };
//     // const handleChangeQuarterly = () => {
//     //   const value = !weekly;
//     //   setWeekly(value);
//     //   setDaily(false);
//     // };
//     // const handleChangeAnnually = () => {
//     //   const value = !weekly;
//     //   setWeekly(value);
//     //   setDaily(false);
//     // };
//     return (
//       <>
//         <Stack direction="column">
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               m: 0,
//               p: 0,
//             }}
//           >
//             <label>{"Daily"}</label>
//             <Checkbox
//               sx={{ m: 0, p: 0, ml: 2 }}
//               size="small"
//               checked={values.daily}
//               onChange={handleChange}
//               name="daily"
//             />
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               m: 0,
//               p: 0,
//             }}
//           >
//             <label>{"Weekly"}</label>
//             <Checkbox
//               sx={{ m: 0, p: 0, ml: 2 }}
//               size="small"
//               checked={values.weekly}
//               onChange={handleChange}
//               name="weekly"
//             />
//           </Box>
//           {/*
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               m: 0,
//               p: 0,
//             }}
//           >
//             <label>{"Monthly"}</label>
//             <Checkbox
//               sx={{ m: 0, p: 0, ml: 2 }}
//               size="small"
//               checked={isChecked.monthly}
//               onChange={handleChange}
//               name="monthly"
//             />
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               m: 0,
//               p: 0,
//             }}
//           >
//             <label>{"Quarterly"}</label>
//             <Checkbox
//               sx={{ m: 0, p: 0, ml: 2 }}
//               size="small"
//               checked={isChecked.quarterly}
//               onChange={handleChange}
//               name="quarterly"
//             />
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               m: 0,
//               p: 0,
//             }}
//           >
//             <label>{"Annually"}</label>
//             <Checkbox
//               sx={{ m: 0, p: 0, ml: 2 }}
//               size="small"
//               checked={isChecked.annually}
//               onChange={handleChange}
//               name="annually"
//             />
//           </Box> */}
//         </Stack>
//       </>
//     );
//   };

//   const isFilterObject = () => {
//     return { padding: 1.5, width: "75%" };
//   };
//   return (
//     <Card
//       sx={{
//         p: isFilterObject().padding,
//         background: "#f9f9f9",
//         boxShadow: "0",
//         borderRadius: 4,
//         width: { xs: "100%" },
//         textAlign: "center",
//         mr: 1,
//         mb: { xs: 1 },
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <Box sx={{ width: isFilterObject().width }}>
//         <Typography variant="h1" sx={{ fontWeight: "bold", fontSize: "15px" }}>
//           {countValue.count}
//         </Typography>
//         <Typography>{title}</Typography>
//       </Box>
//       <RenderFilterGroup />
//     </Card>
//   );
// };

// export default ViewCardWithFilter;
