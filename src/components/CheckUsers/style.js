import { makeStyles } from '@material-ui/core/styles';
 
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: '100px auto', // Center the table and add space from edges
    maxWidth: 'calc(100vw - 40px)', // Ensure there's space from both edges
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    minWidth: 600, // Set a minimum width for the table
    width: '100%', // Set table width to 100%
    overflowX: 'auto', // Enable horizontal scrolling
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
}));

export default useStyles;
