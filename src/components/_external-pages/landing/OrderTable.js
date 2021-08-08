import * as React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// function createData(exchangeRate, amountBTC, pricePLN, offers) {
//   return { exchangeRate, amountBTC, pricePLN, offers };
// }

// //data for test
// const rows = [
//   createData(42305.88, 0.016, 676.9, 24),
//   createData(42305.89, 0.016, 1410.2, 37),
//   createData(40100.0, 2.62836675, 1000.0, 24),
//   createData(46000.0, 0.016, 1000.0, 67),
//   createData(42305.88, 0.016, 676.9, 24),
//   createData(42305.89, 0.016, 1410.2, 37),
//   createData(40100.0, 2.62836675, 1000.0, 24),
//   createData(46000.0, 0.016, 1000.0, 67),
// ];

export default function OrderTable({ data, type, currency }) {
  let orderData = [];

  switch (type) {
    case "BID":
      orderData = data?.buy && data.buy;
      break;
    case "ASL":
      orderData = data?.sell && data.sell;
      break;
    default:
  }

  const currencyValue = (exchangeRate, amountBTC) => {
    let ratio = (exchangeRate * amountBTC).toFixed(2);
    return ratio;
  };

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Exchange rate</TableCell>
            <TableCell align="right">Amount BTC </TableCell>
            <TableCell align="right">Price {currency}</TableCell>
            <TableCell align="right">Offers</TableCell>
          </TableRow>
        </TableHead>
        {orderData ? (
          <TableBody>
            {orderData.map((row) => (
              <TableRow
                key={row.ra}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.ra}
                </TableCell>
                <TableCell align="right">{row.ca}</TableCell>
                <TableCell align="right">
                  {currencyValue(row.ra, row.ca)}
                </TableCell>
                <TableCell align="right">{row.co}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
    </TableContainer>
  );
}
