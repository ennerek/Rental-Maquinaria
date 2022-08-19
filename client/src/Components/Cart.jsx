import React, { useEffect } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { getMachineries } from '../Services/machineries';
import { getRentedMachineries, makePayment } from '../Services/rentalMachinery';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



let id = 0;
function createData(name, fat, price) {
  id += 1;
  return { id, name, fat, price };
}

const rows = [
  // comment
  createData('Frozen yoghurt', 159, 4.0),
  createData('Ice cream sandwich', 237, 4.3),
  createData('Eclair', 16.0, 6.0),
  createData('Cupcake', 3.7, 4.3),
  createData('Gingerbread', 16.0, 3.9),
];

export const Cart = React.memo(function ElevatedHeaderCard({rentedMachineries}) {

    const [machineries , setMachineries] = React.useState([]);
    const [total , setTotal] = React.useState([]);
    const [days , setDays] = React.useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        getRentedMachineries(token).then( data => {
            const rentedMachineries = data.rentals.map(rental => {
                return {
                    machinery: rental.machinery,
                    days: rental.days
                }
                
            })
            const total = data.rentals.reduce((acc, rental) => acc + rental.total, 0);
 
            setTotal(total);
            setMachineries(rentedMachineries);
          
            
        });

    } , [token,days])
    
    const handleRentarButton = () => {
        makePayment(machineries, total, token).then( data => {
            console.log(data)
        }
        ).catch( err => {
            console.log(err)
        }
        )
    }
  
 
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();
  return (
    <Card className={cx()}>
        <CardHeader
            title="Renta de maquinarias"
        />
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Maquinaria</b></TableCell>
              <TableCell align="right"><b>Precio ($)</b></TableCell>
              <TableCell align="right"><b>Dias</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {machineries.map(({machinery, days}) => (
              <TableRow key={machinery._id}>
                <TableCell component="th" scope="row">
                  {machinery.name}
                </TableCell>
                <TableCell align="right">{machinery.price}</TableCell>
                <TableCell align="right">{days}</TableCell>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
              </TableRow>
            ))}
            <TableRow>
                <TableCell component="th" scope="row">
                </TableCell>
                <TableCell component="th" scope="row">
                    <b>Total</b>
                </TableCell>
                <TableCell align="right">{total}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
        <Button variant='contained' color='warning' onClick={handleRentarButton}>
            Rentar
        </Button>
      </CardContent>
    </Card>
  );
});

export default Cart;