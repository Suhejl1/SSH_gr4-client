import { makeStyles } from '@material-ui/core/styles';
 
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    margin: theme.spacing(10), // Added margin on all sides
  },
  table: {
    minWidth: 50, // Adjusted minWidth to make the table smaller
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
}));

export default useStyles;
