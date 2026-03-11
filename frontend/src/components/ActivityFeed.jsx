import { Box, Typography } from "@mui/material";

function ActivityFeed(){

  const activities = [
    "Rahul added new task",
    "Kavana created project",
    "Employee Arjun added",
    "Task UI Design completed"
  ];

  return(

    <Box
      sx={{
        background:"white",
        padding:3,
        borderRadius:3,
        width:300,
        boxShadow:"0 4px 12px rgba(0,0,0,0.05)"
      }}
    >

      <Typography variant="h6" mb={2}>
        Recent Activity
      </Typography>

      {activities.map((act,i)=>(
        <Typography key={i} mb={1}>
          • {act}
        </Typography>
      ))}

    </Box>

  );

}

export default ActivityFeed;